"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMsgCount from "@/app/actions/getUnreadMsgCount";

const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [msgCount, setMsgCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMsgCount().then(({ count }) => setMsgCount(count));
    }
  }, [getUnreadMsgCount, session]);

  return (
    <GlobalContext.Provider value={{ msgCount, setMsgCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
