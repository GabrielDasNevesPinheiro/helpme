"use client";

import { useSession, signOut } from "next-auth/react";

export default function Home() {

  const { data: session, status } = useSession({ required: true });

  return (
    <main>
      <span>
        <p>Olá { session?.user?.name }, seu e-mail é { session?.user?.email }</p>
        <button onClick={() => signOut()}>Logout</button>
      </span>
    </main>
  )
}
