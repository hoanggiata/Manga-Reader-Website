"use client"
import * as React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LoginForm()
{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const router = useRouter();
    async function handleSubmit(e)
    {
        e.preventDefault();
        if(!email || !password)
        {
            setError("Please fill in all fields");
            return;
        }
        try {
            const res = await signIn("credentials",{email,password,redirect:false});
            if(res?.error)
            {
                setError("Invalid Credentials");
                return;
            }
            router.replace("/");
        } catch (error) {
            
        }
    }
    return(     
        <div className="grid place-items-center min-h-[70vh] ">
            <div className="shadow-lg p-5 rounded-lg w-[30%] border-t-4 border-[#FFD700] bg-[#2f2f2f]">
                <h1 className="text-xl font-bold my-4 text-white">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input className="border-[#FFD700] bg-[#1f1f1f] text-white" name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input className="border-[#FFD700] bg-[#1f1f1f] mb-3 text-white" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button className="bg-[#FFD700] hover:bg-[#FFEC8B] text-[#000000] font-bold cursor-pointer px-6 py-2">Login</Button>
                    {
                        error && (
                        <div className="text-sm bg-red-500 text-white w-fit py-1 px-3 rounded-md mt-2">
                        {error}
                        </div>                   
                    )}
                    
                    <Link href="/auth/sign-up" className="text-sm mt-3 text-right text-white">
                        Don't have an account? <span className="underline">
                            Register
                        </span>
                    </Link>
                </form>
            </div>
        </div>     
    );
}