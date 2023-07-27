"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkUser, getUserInfo } from "../utils/actions";
import SocketProvider from "./socketProvider";

interface Props {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) { // if user has not an authorized account yet, it will redirect to registration

  const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  const [company, setCompany] = useState<string>();

  useEffect(() => {
    if(!company)
      getUserInfo(`${session?.user?.email}`).then((res) => {
        setCompany(res.company);
      });
  })

  if (status === "loading" || !company) { // if we have not enough information, dont load the page
    return (
      <main>Loading..</main>
    )
  }

  checkUser(session.user?.email as string).then((res) => { // if new user redirect to registration
    if (res === "NEW USER") router.push("/setup");
    if (res === "NOT REGISTERED") signOut();
  });

  return <>
    <SocketProvider company={company as string}/>
    {children}
    </>
}