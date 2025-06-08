/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react"
import { useAuth } from "@clerk/clerk-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";


const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']
  }

}


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();


  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
          if (userId) initSocket(userId);
        }


      } catch (error: any) {
        updateApiToken(null);
        console.log("Error in auth provider", error);

      } finally {
        setLoading(false);
      }
    };
    initAuth()
    return () => disconnectSocket();
  }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoaderIcon className="size-8 text-emerald-500 animate-spin" />
      </div>)
  }

  return (
    <>
      {children}
    </>
  )
}

export default AuthProvider

