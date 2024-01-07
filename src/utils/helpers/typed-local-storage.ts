type TKey = "token" | "loggedInUser" | "localConfig";

export const typedLocalStorage = {
  setItem: (key: TKey, value: string) => localStorage.setItem(key, value),
  getItem: (key: TKey) => localStorage.getItem(key),
  removeItem: (key: TKey) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
  key: (index: number) => localStorage.key(index),
};
