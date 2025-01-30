const storageKeyIdInstance = 'idInstanceGreen';
const storageKeyApiToken = 'apiTokenInstance';

const setAuthData = (idInstance: string, apiTokenInstance: string): void => {
  localStorage.setItem(storageKeyIdInstance, idInstance);
  localStorage.setItem(storageKeyApiToken, apiTokenInstance);
};

const isAuth = () =>
  [storageKeyIdInstance, storageKeyApiToken].every(
    (key) => localStorage.getItem(key) !== null
  );

const removeAuthData = (): void => {
  localStorage.removeItem(storageKeyIdInstance);
  localStorage.removeItem(storageKeyApiToken);
};

export { setAuthData, isAuth, removeAuthData };
