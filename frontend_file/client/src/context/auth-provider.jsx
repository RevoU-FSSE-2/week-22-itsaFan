/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

function retrieveStoredToken() {
  const storedToken = localStorage.getItem("accessToken");
  return {
    token: storedToken,
  };
}

export const AuthProvider = ({ children }) => {
  const storedToken = retrieveStoredToken();
  const initialToken = storedToken.token || "";
  const [accessToken, setAccessToken] = useState(initialToken);
  const [userPayload, setUserPayload] = useState(null);
  const isLoggedIn = !!accessToken;
  useEffect(() => {
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      setUserPayload(decoded);
    } else {
      setUserPayload(null);
    }
  }, [accessToken]);
  // console.log(isLoggedIn, userPayload, accessToken);

  return <AuthContext.Provider value={{ isLoggedIn, accessToken, setAccessToken, userPayload }}>{children}</AuthContext.Provider>;
};
