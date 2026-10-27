import 'server-only';

import {getGoogleAccessToken, getGoogleConfiguration} from './auth';

const driveScope = 'https://www.googleapis.com/auth/drive.file';

export async function createLeadDriveFolder(label: string) {
  const {driveRootFolderId} = getGoogleConfiguration();
  if (!driveRootFolderId) throw new Error('Google Drive root folder is not configured.');
  const token = await getGoogleAccessToken([driveScope]);
  const safeName = label.replace(/[\\/:*?"<>|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120) || 'TreeTech Lead';
  const response = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink', {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({name: safeName, mimeType: 'application/vnd.google-apps.folder', parents: [driveRootFolderId]}),
    cache: 'no-store'
  });
  if (!response.ok) throw new Error(`Google Drive folder creation failed (${response.status}).`);
  return (await response.json()) as {id: string; name: string; webViewLink?: string};
}

export function getDriveFolderUrl(folderId: string) {
  return `https://drive.google.com/drive/folders/${encodeURIComponent(folderId)}`;
}

