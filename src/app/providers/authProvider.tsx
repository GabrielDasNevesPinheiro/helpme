"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkUser } from "../utils/actions";

interface Props {
    children?: React.ReactNode;
}

export default function AuthProvider({ children }: Props) { // if user has not an authorized account yet, it will redirect to registration

    const router = useRouter();
    const { data: session, status } = useSession({ required: true });

    if(status === "loading"){
        return (
          <main>Loading..</main>
        )
    }

    checkUser(session.user?.email as string).then((res) => { // if new user redirect to registration
        if(res?.message === "NEW USER") router.push("/setup");
        if(res?.message === "NOT REGISTERED") signOut();
      });

    return <>{children}</>
}