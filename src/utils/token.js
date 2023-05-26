// encapsulate the token interface

const key = "token";

// set to save the token
const setToken = (token) => {
  return window.localStorage.setItem(key, token);
};

// get the current token
const getToken = () => {
  return window.localStorage.getItem(key);
};

// remove the current token
const removeToken = () => {
  return window.localStorage.removeItem(key);
};

export { setToken, getToken, removeToken };
