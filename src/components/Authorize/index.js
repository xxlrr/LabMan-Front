import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils";

// a component added  added authentication to the children component
function AuthRoute({ children }) {
  const isToken = getToken();
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

// a HOC added authentication to the component
const withAuth = (Component) => {
  return (props) => {
    return (
      <AuthRoute>
        <Component {...props} />
      </AuthRoute>
    );
  };
};

export { AuthRoute, withAuth };
