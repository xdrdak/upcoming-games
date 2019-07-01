function setItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getItem(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function removeItem(key) {
  window.localStorage.removeItem(key);
}

const createLocalStorage = (key, defaultValue = null) => {
  if (!getItem(key)) {
    setItem(key, defaultValue);
  }

  return {
    setItem: value => setItem(key, value),
    getItem: () => getItem(key),
    removeItem: () => removeItem(key),
  };
};

export { setItem, removeItem, getItem, createLocalStorage };
