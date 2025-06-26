import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api, { setAuth, clearAuth } from "../helpers/api";
import postData from "../helpers/post";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  account: {},
  login: async () => {},
  register: async (username, roles, password) => {
    console.log("oh no");

    await postData("/register", {
      username,
      roles,
      password,
    });
  },
});

export const AuthProvider = ({ children }) => {
  console.log("hello");

  const navigate = useNavigate();

  const [account, setAccount] = useState(() => {
    const maybeJwt = localStorage.getItem("jwt");

    if (maybeJwt) {
      const decodedJwt = jwtDecode(maybeJwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwt");
        return null;
      }
      return decodedJwt;
    }
    return null;
  });

  useEffect(() => {
    const checkJwtExpiration = () => {
      const maybeJwt = localStorage.getItem("jwt");
      if (maybeJwt) {
        const decodedJwt = jwtDecode(maybeJwt);
        if (decodedJwt.exp * 1000 < Date.now()) {
          localStorage.removeItem("jwt");
          setAccount(null);
        }
      }
    };
    checkJwtExpiration();
  }, []);

  const login = async (username, password) => {
    console.log("a");

    const response = await api.post(
      "http://localhost:8080/api/token",
      {},
      {
        auth: { username: username, password: password },
      }
    );

    const jwt = response.data;
    console.log("yo");

    localStorage.setItem("jwt", jwt);
    console.log(jwt);

    setAccount(jwtDecode(jwt));
    setAuth(jwt);
    navigate("/");
  };

  const register = async (username, roles, password) => {
    try {
        
    
    await postData("/register", {
        username,
        roles,
        password,
      });
      navigate("/login");}
      catch (error) {
        
      }
  };

  const logout = () => {
    setAccount(null);
    clearAuth();
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ account, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
