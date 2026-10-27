import 'server-only';

import {createSign} from 'node:crypto';

type CachedToken = {accessToken: string; expiresAt: number};

let cachedToken: CachedToken | null = null;

export class GoogleConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GoogleConfigurationError';
  }
}

export function getGoogleConfiguration() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const spreadsheetId = process.env.GOOGLE_CRM_SPREADSHEET_ID;
  const driveRootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || '';

  if (!email || !privateKey || !spreadsheetId) {
    throw new GoogleConfigurationError('Google CRM credentials are not configured.');
  }

  return {email, privateKey, spreadsheetId, driveRootFolderId};
}

export function getGoogleConnectionStatus() {
  return {
    serviceAccount: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY),
    spreadsheet: Boolean(process.env.GOOGLE_CRM_SPREADSHEET_ID),
    drive: Boolean(process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID)
  };
}

export async function getGoogleAccessToken(scopes: string[]) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.accessToken;
  }

  const {email, privateKey} = getGoogleConfiguration();
  const now = Math.floor(Date.now() / 1000);
  const header = encodeJson({alg: 'RS256', typ: 'JWT'});
  const payload = encodeJson({
    iss: email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  });
  const unsigned = `${header}.${payload}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(privateKey).toString('base64url');
  const assertion = `${unsigned}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    }),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Google authentication failed (${response.status}).`);
  }

  const result = (await response.json()) as {access_token?: string; expires_in?: number};

  if (!result.access_token) {
    throw new Error('Google authentication returned no access token.');
  }

  cachedToken = {
    accessToken: result.access_token,
    expiresAt: Date.now() + (result.expires_in || 3600) * 1000
  };

  return result.access_token;
}

function encodeJson(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

