import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("outfitUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (userData) => {
    localStorage.setItem("outfitUser", JSON.stringify(userData));
    setUser(userData);
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("outfitUser"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("outfitUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};