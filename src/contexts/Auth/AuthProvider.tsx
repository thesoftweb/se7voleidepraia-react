import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) {
          setUser(data.user);
        }
      }
    };
    // validateToken();
  }, []);

  const signin = async (cpf: string, password: string) => {
    try {
      const data = await api.signin(cpf, password);

      if (data.login) {
        setUser(data.name);
        setToken(data.secret);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const signout = async () => {
    setUser(null);
    setToken("");
    await api.logout();
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
