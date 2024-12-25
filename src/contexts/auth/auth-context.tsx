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
  userInfo: UserInfo | undefined;
}

export const AuthContext = createContext<ContextValue>({
  token: "",
  setToken: () => {},
  isLogin: () => false,
  userInfo: undefined,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  const { data: userInfo } = useUserProfile(token);
  useEffect(() => {
    const value = getCookie("token") || "";
    setToken(value);
  }, [token]);
  const isLogin = () => {
    if (userInfo) return true;
    return false;
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLogin,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
