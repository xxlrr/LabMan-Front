// encapsulate the user interface

const key = "user";

// set the current user
const setUserInfo = (userInfo) => {
  const userInfoAsJson = JSON.stringify(userInfo);
  return window.localStorage.setItem(key, userInfoAsJson);
};

// get the current user info
const getUserInfo = () => {
  const userInfoAsJson = window.localStorage.getItem(key);
  return JSON.parse(userInfoAsJson);
};

// clear the current user info
const removeUserInfo = () => {
  return window.localStorage.removeItem(key);
};

export { setUserInfo, getUserInfo, removeUserInfo };
