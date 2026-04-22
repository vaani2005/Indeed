import React, { createContext, useState, useEffect, useCallback } from "react";

// ✅ COOKIE UTILITY FUNCTIONS
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

// ✅ Create Auth Context
export const AuthContext = createContext();

// ✅ Auth Provider Component
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null); // "seeker" or "employer"
  const [isLoading, isSetLoading] = useState(true);

  // ✅ CHECK IF TOKEN EXISTS ON APP LOAD (PERSIST LOGIN VIA COOKIES)
  useEffect(() => {
    const storedToken = getCookie("authToken");
    const storedUserType = getCookie("userType");

    if (storedToken) {
      setToken(storedToken);
      setUserType(storedUserType || "seeker");
    }
    isSetLoading(false);
  }, []);

  // ✅ LOGIN USER (SEEKER)
  const loginSeeker = useCallback((authToken) => {
    const tokenToStore = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`;
    setCookie("authToken", tokenToStore, 7); // 7 days expiry
    setCookie("userType", "seeker", 7);
    setToken(tokenToStore);
    setUserType("seeker");
  }, []);

  // ✅ LOGIN USER (EMPLOYER)
  const loginEmployer = useCallback((authToken) => {
    const tokenToStore = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`;
    setCookie("authToken", tokenToStore, 7); // 7 days expiry
    setCookie("userType", "employer", 7);
    setToken(tokenToStore);
    setUserType("employer");
  }, []);

  // ✅ LOGOUT USER - CLEARS COOKIES
  const logout = useCallback(() => {
    deleteCookie("authToken");
    deleteCookie("userType");
    localStorage.removeItem("employerInfo");
    setToken(null);
    setUserType(null);
  }, []);

  // ✅ CHECK IF USER IS LOGGED IN
  const isAuthenticated = !!token;

  // ✅ GET TOKEN WITH BEARER PREFIX
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ✅ CUSTOM HOOK TO USE AUTH CONTEXT
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
