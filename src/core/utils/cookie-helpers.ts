export function processCookieValue(cookie: string): string {
  if (!cookie) {
    return '';
  }
  const keyAndValue = cookie.split('=');
  return keyAndValue[1].trim();
}
