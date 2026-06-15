export function isDemoSitePath(pathname: string) {
  return /^\/portfolio\/[^/]+\/site\/?$/.test(pathname);
}
