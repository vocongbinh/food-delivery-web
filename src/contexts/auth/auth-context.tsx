"use client"
import { 
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie } from "cookies-next";
interface ContextValue {
  token: string;
  setToken: (value: string) => void;
}

export const AuthContext = createContext<ContextValue>({
  token: "",
  setToken: () => { }
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const value = getCookie("token") || "";
    setToken(value)
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
