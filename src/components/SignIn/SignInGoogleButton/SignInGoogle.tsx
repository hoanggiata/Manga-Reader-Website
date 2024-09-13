"use client"
import * as React from "react";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
export default function SignInGoogle() {

    return (
        <Button className="bg-[#FFD700] hover:bg-[#FFEC8B] text-[#000000] font-bold cursor-pointer px-6 py-2" onClick={() => signIn("google")}><img src="/images/google.png" alt="Google image" className="w-5 h-5 inline-block mr-2"/> Sign In With Google</Button>
    );
}