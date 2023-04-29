// encapsulate the user interface

const key = "user";

const setUserInfo = (userInfo) => {
  const userInfoAsJson = JSON.stringify(userInfo);
  return window.localStorage.setItem(key, userInfoAsJson);
};

const getUserInfo = () => {
  const userInfoAsJson = window.localStorage.getItem(key);
  return JSON.parse(userInfoAsJson);
};

const removeUserInfo = () => {
  return window.localStorage.removeItem(key);
};

export { setUserInfo, getUserInfo, removeUserInfo };
