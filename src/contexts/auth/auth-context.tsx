"use client";
import { useUserProfile } from "@/react-query/auth";
import { UserInfo } from "@/types";
import { getCookie } from "cookies-next";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface ContextValue {
  token: string;
  setToken: (value: string) => void;
  isLogin: () => boolean;
}

export const AuthContext = createContext<ContextValue>({
  token: "",
  setToken: () => {},
  isLogin: () => false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  const { data: userProfile } = useUserProfile(token);
  useEffect(() => {
    const value = getCookie("token") || "";
    setToken(value);
  }, [token]);
  const isLogin = () => {
    if (userProfile) return true;
    return false;
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
