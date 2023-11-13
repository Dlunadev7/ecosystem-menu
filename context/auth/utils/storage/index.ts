export function Token() {
  const TOKEN = '__NASLKCAKWEHA__';

  const save = (token: string) => localStorage.setItem(TOKEN, token);

  const get = (): string | null => {
    const retrieved_token = localStorage.getItem(TOKEN);
    if (retrieved_token === 'null' || !retrieved_token) {
      return null;
    }
    return retrieved_token;
  };

  const remove = () => localStorage.removeItem(TOKEN);

  return { save, get, remove };
}
