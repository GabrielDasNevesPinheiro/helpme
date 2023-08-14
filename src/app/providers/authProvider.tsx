"use client";

import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkUser } from "../utils/actions";
import SocketProvider from "./socketProvider";
import ApplicationSkeleton from "@/components/layout/ApplicationLoadingSkeleton";
import { useUserContext } from "../context/UserContext";


interface Props {
  children?: React.ReactNode;
}

type userLevels = "Chefe" | "Operador" | "Funcionário";

const levels = {
  "Chefe": 0,
  "Operador": 1,
  "Funcionário": 2
}

export default function AuthProvider({ children }: Props) { // if user has not an authorized account yet, it will redirect to registration

  const router = useRouter();
  const { status, data: session } = useSession({ required: true });
  const userContext = useUserContext();


  if (!(userContext.user.name === ""))
    checkUser(session?.user?.email as string).then((res) => { // if new user redirect to registration
      console.log(res);
      if (res === "NEW USER") router.push("/setup");
      if (res === "NOT REGISTERED") signOut();
    });


  if (status === "loading" || userContext.user.name === "") { // if we have not enough information, dont load the page
    return (
      <ApplicationSkeleton />
    )
  }



  return <>
    {children}
    {<SocketProvider company={userContext.user.company} userLevel={levels[userContext.user.level as userLevels]} />}
  </>
}