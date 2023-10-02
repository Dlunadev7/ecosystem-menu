export function decodeJWT(token: string) {
  if (!token) return {};
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join(''),
  );
  const parsed = JSON.parse(jsonPayload);
  const { exp } = parsed;
  const expired = Date.now() >= exp * 1000
  return expired ? null : parsed;
}
