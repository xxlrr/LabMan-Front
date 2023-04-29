import React from "react";
import { getUserInfo } from "../../utils";

// a component added added authentication to the children component
// if roles == [], allows logged-in users access
// if roles != [], allows users who logged-in and role in roles access
function AuthRoute({ children, roles = [], reject = <h3>Unauthorized</h3> }) {
  const userInfo = getUserInfo();
  if (!userInfo) {
    return reject;
  }

  if (roles.length > 0 && !roles.includes(userInfo.role)) {
    return reject;
  }

  return children;
}

// a HOC added authentication to the component
// if roles == [], allows logged-in users access
// if roles != [], allows users who logged-in and role in roles access
const withAuth = (Component, roles = [], reject = <h3>Unauthorized</h3>) => {
  return (props) => {
    return (
      <AuthRoute coles={roles} reject={reject}>
        <Component {...props} />
      </AuthRoute>
    );
  };
};

export { AuthRoute, withAuth };
