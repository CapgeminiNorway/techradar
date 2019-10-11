const sessionStorageVar = 'state';

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem(sessionStorageVar);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(sessionStorageVar, serializedState);
  } catch (err) {
    throw new Error(err);
  }
};
