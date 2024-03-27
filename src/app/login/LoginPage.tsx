"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";


export default function LoginPage() {

    return (
        <div className="flex lg:flex-row flex-col h-screen w-full bg-[url('/servers.jpg')] repeat-0 bg-center">
            <div className="lg:w-2/3 h-1/4 lg:h-auto flex flex-col lg:pl-36 pl-12 lg:pt-36 pt-4 gap-y-4  backdrop-blur-md bg-black/50">
                <h1 className="text-7xl">Helpme</h1>
                <h1 className=" sm:text-2xl lg:text-3xl text-lg">O Suporte técnico da sua empresa em outro nível.</h1>
            </div>
            <div className="lg:w-1/3 lg:h-auto h-3/4 flex flex-col gap-y-2 items-center justify-center lg:justify-between lg:pt-40 pt-2 bg-[#0e0d0d]">
                <div className="flex w-full flex-col items-center">
                    <div className="pb-16">
                        <h1 className="text-4xl font-bold">Bem vindo(a)👋</h1>
                        <h2 className="text-2xl">acesse sua conta</h2>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="w-full">
                            <div className="flex flex-col gap-y-4 justify-center items-center hover:cursor-pointer">
                                <Button className="lg:w-60 w-96 flex gap-4" onClick={() => { signIn("github") }}>
                                    <img src="/github.svg" className="w-8" alt="" />
                                    Github
                                </Button>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col gap-y-4 justify-center items-center">
                                <Button className="lg:w-60 w-96 flex gap-4" onClick={() => { signIn("google") }}>
                                    <img src="/google.svg" className="w-8" alt="" />
                                    Google
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}