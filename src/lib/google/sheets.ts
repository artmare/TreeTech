import 'server-only';

import {getGoogleAccessToken, getGoogleConfiguration} from './auth';

const sheetsScope = 'https://www.googleapis.com/auth/spreadsheets';

export async function readValues(range: string): Promise<string[][]> {
  const {spreadsheetId} = getGoogleConfiguration();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`;
  const response = await googleFetch(url);
  const result = (await response.json()) as {values?: unknown[][]};
  return (result.values || []).map((row) => row.map((cell) => String(cell ?? '')));
}

export async function appendValues(range: string, values: string[][]) {
  const {spreadsheetId} = getGoogleConfiguration();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  await googleFetch(url, {method: 'POST', body: JSON.stringify({values})});
}

export async function updateValues(range: string, values: string[][]) {
  const {spreadsheetId} = getGoogleConfiguration();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;
  await googleFetch(url, {method: 'PUT', body: JSON.stringify({values})});
}

async function googleFetch(url: string, init: RequestInit = {}) {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const token = await getGoogleAccessToken([sheetsScope]);
      const response = await fetch(url, {
        ...init,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...init.headers
        },
        cache: 'no-store'
      });

      if (response.ok) {
        return response;
      }

      const retryable = response.status === 429 || response.status >= 500;
      const details = await response.text().catch(() => '');
      lastError = new Error(`Google Sheets request failed (${response.status}): ${details.slice(0, 300)}`);

      if (!retryable) {
        throw lastError;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Google Sheets request failed.');
    }

    if (attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
    }
  }

  throw lastError || new Error('Google Sheets request failed.');
}

