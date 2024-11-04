"use client"
import * as React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInGoogle from "./SignInGoogleButton/SignInGoogle";
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
            const emailClean = email.replace(/\s/g, '');
            const passwordClean = password.replace(/\s/g, '');
            const res = await signIn("credentials",{email:emailClean,password:passwordClean,redirect:false});
            if(res?.error)
            {
                console.log(res);
                setError("Invalid Credentials");
                return;
            }
            router.push("/");     
            setTimeout(() => {
                window.location.reload();
            }, 100);    
        } catch (error) {
            console.log("Error: ",error);
        }
    }
    return(     
        <div className="grid place-items-center min-h-[70vh] px-4 sm:px-0">
            <div className="shadow-lg p-5 rounded-lg w-full sm:w-[70%] md:w-[50%] lg:w-[30%] border-t-4 border-[#FFD700] bg-[#2f2f2f]">
                <h1 className="text-xl font-bold my-4 text-white">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input className="border-none bg-[#1f1f1f] text-white" name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input className="border-none bg-[#1f1f1f] mb-3 text-white" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button className="bg-[#FFD700] hover:bg-[#FFEC8B] text-[#000000] font-bold cursor-pointer px-6 py-2">Login</Button>
                    {error && (
                        <div className="text-sm bg-red-500 text-white w-fit py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                </form>
                <div className="flex flex-col gap-3">
                    <SignInGoogle />
                    <Link href="/auth/sign-up" className="text-sm mt-3 text-right text-white">
                        <span>Don't have an account? </span><span className="underline">Register</span>
                    </Link>
                </div>
            </div>
        </div>

        // <div className="grid place-items-center min-h-[70vh] ">
        //     <div className="shadow-lg p-5 rounded-lg w-[30%] border-t-4 border-[#FFD700] bg-[#2f2f2f]">
        //         <h1 className="text-xl font-bold my-4 text-white">Login</h1>
        //         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        //             <Input className="border-[#FFD700] bg-[#1f1f1f] text-white" name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        //             <Input className="border-[#FFD700] bg-[#1f1f1f] mb-3 text-white" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        //             <Button className="bg-[#FFD700] hover:bg-[#FFEC8B] text-[#000000] font-bold cursor-pointer px-6 py-2">Login</Button>
        //             {
        //                 error && (
        //                 <div className="text-sm bg-red-500 text-white w-fit py-1 px-3 rounded-md mt-2">
        //                 {error}
        //                 </div>                   
        //             )}
        //             <div className="relative flex py-5 items-center">
        //                 <div className="flex-grow border-t border-gray-400"></div>
        //                 <span className="flex-shrink mx-4 text-gray-400">Or</span>
        //                 <div className="flex-grow border-t border-gray-400"></div>
        //             </div>                 
        //         </form>
        //         <div className="flex flex-col gap-3">
        //             <SignInGoogle></SignInGoogle>                  
        //             <Link href="/auth/sign-up" className="text-sm mt-3 text-right text-white">
        //                 <span>Dont have an account? </span><span className="underline">
        //                     Register
        //                 </span>
        //             </Link>
        //         </div>
                
        //     </div>
        // </div>     
    );
}