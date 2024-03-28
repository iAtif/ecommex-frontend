import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth(parseData);
    }
  }, []);

  useEffect(() => {
    // Update default headers whenever auth changes
    axios.defaults.headers.common["Authorization"] = auth.token;
  }, [auth.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
