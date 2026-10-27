import 'server-only';

import {createGoogleSheetsRepositories} from './google-sheets-repositories';

let repositories: ReturnType<typeof createGoogleSheetsRepositories> | null = null;

export function getCrmRepositories() {
  repositories ||= createGoogleSheetsRepositories();
  return repositories;
}

