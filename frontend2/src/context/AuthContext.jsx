import React, { createContext, useState, useEffect, useCallback } from "react";

// ✅ COOKIE UTILS
const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

// ✅ CONTEXT
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getCookie("authToken");
    const storedUserType = getCookie("userType");

    if (storedToken) {
      setToken(storedToken);
      setUserType(storedUserType);
    }

    setIsLoading(false); // ✅ correct setter
  }, []);

  // ✅ LOGIN SEEKER
  const loginSeeker = useCallback((authToken) => {
    const tokenToStore = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`;

    setCookie("authToken", tokenToStore, 7);
    setCookie("userType", "seeker", 7);

    setToken(tokenToStore);
    setUserType("seeker");
  }, []);

  // ✅ LOGIN EMPLOYER
  const loginEmployer = useCallback((authToken) => {
    const tokenToStore = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`;

    setCookie("authToken", tokenToStore, 7);
    setCookie("userType", "employer", 7);

    setToken(tokenToStore);
    setUserType("employer");
  }, []);

  // ✅ LOGOUT
  const logout = useCallback(() => {
    deleteCookie("authToken");
    deleteCookie("userType");
    localStorage.removeItem("employerInfo");

    setToken(null);
    setUserType(null);
  }, []);

  // ✅ AUTH STATE
  const isAuthenticated = !!token;

  // ✅ GET TOKEN
  const getAuthToken = useCallback(() => {
    if (!token) return null;
    return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }, [token]);

  const value = {
    token,
    userType,
    isAuthenticated,
    isLoading,
    loginSeeker,
    loginEmployer,
    logout,
    getAuthToken,
  };

  // ✅ PREVENT APP FROM BREAKING ON REFRESH
  if (isLoading) return <p>Loading...</p>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ✅ HOOK
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
