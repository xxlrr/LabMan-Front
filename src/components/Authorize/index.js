import React from "react";
import { Outlet } from "react-router-dom";
import { getUserInfo } from "../../utils";

// a component added added authentication to the child component
// if roles == [], allows logged-in users access
// if roles != [], allows users who logged-in and role in roles access
function AuthChildren({ children, roles = [], reject = <h3>Unauthorized</h3> }) {
  const userInfo = getUserInfo();
  if (!userInfo) {
    return reject;
  }

  if (roles.length > 0 && !roles.includes(userInfo.role)) {
    return reject;
  }

  return children;
}

// a component added added authentication to the child route components
// if roles == [], allows logged-in users access
// if roles != [], allows users who logged-in and role in roles access
function AuthRoute({ roles = [], reject = <h3>Unauthorized</h3> }) {
  const userInfo = getUserInfo();
  if (!userInfo) {
    return reject;
  }

  if (roles.length > 0 && !roles.includes(userInfo.role)) {
    return reject;
  }

  return <Outlet />;
}

// a HOC added authentication to the component
// if roles == [], allows logged-in users access
// if roles != [], allows users who logged-in and role in roles access
const withAuth = (Component, roles = [], reject = <h3>Unauthorized</h3>) => {
  return (props) => {
    return (
      <AuthChildren coles={roles} reject={reject}>
        <Component {...props} />
      </AuthChildren>
    );
  };
};

export { AuthChildren, AuthRoute, withAuth };
