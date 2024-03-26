"use client";

import { signOut, useSession } from "next-auth/react";
import { useUserContext } from "../context/UserContext";
import { checkUser } from "../actions/userActions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


interface Props {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) { // if user has not an authorized account yet, it will redirect to registration

  const { data: session } = useSession({ required: true });
  const router = useRouter()
  const userContext = useUserContext();

  useEffect(() => {

    const authCheck = async () => {
      //if username not set and not session loaded, return
      if (!(userContext.user.name !== "" && session?.user?.email)) return () => { };

      const authStatus = await checkUser(session.user.email);

      if (authStatus === "NEW USER") router.push("/setup");
      if (authStatus === "NOT REGISTERED") signOut();

      console.log("AUTH CHECKED");
    }

    authCheck();

  }, [session?.user?.email, userContext.user.name]);


  return <>
    {children}
  </>
}