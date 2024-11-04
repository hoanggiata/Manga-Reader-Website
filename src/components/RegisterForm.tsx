"use client"
import * as React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function LoginForm()
{
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const router = useRouter();

    async function handleSubmit(e)
    {
        e.preventDefault();

        if(!name || !email || !password)
        {
            setError("Please fill in all fields");
            return;
        }
        try {

            const resUserExists = await fetch("/api/userExists",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email}),
            });

            const {user} = await resUserExists.json();
            if(user)
            {
                setError("User already exists!");
                return;
            }

            const response = await fetch("/api/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name,email,password}),
            });
            if(response.ok)
            {
                const form = e.target;
                form.reset();
                router.push("/auth/sign-in");
            }
            else{
                console.log("User registration failed");
            }
        } catch (error) {
            console.log("Error during user registration:",error);
        }
    }
    return(  
        <div className="grid place-items-center min-h-[70vh] px-4 sm:px-0">
            <div className="shadow-lg p-5 rounded-lg w-full sm:w-[70%] md:w-[50%] lg:w-[30%] border-t-4 border-[#FFD700] bg-[#2f2f2f]">
                <h1 className="text-xl font-bold my-4 text-white">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input className="border-none bg-[#1f1f1f] text-white" name="name" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>                 
                    <Input className="border-none bg-[#1f1f1f] text-white" name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input className="border-none bg-[#1f1f1f] mb-3 text-white" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button className="bg-[#FFD700] hover:bg-[#FFEC8B] text-[#000000] font-bold cursor-pointer px-6 py-2">Register</Button>
                    {error && (
                        <div className="text-sm bg-red-500 text-white w-fit py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <Link href="/auth/sign-in" className="text-sm mt-3 text-right text-white">
                        Already have an account? <span className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
   
        // <div className="grid place-items-center min-h-[70vh] ">
        //     <div className="shadow-lg p-5 rounded-lg w-[30%] border-t-4 border-[#FFD700] bg-[#2f2f2f]">
        //         <h1 className="text-xl font-bold my-4 text-white">Register</h1>
        //         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        //             <Input className="border-[#FFD700] bg-[#1f1f1f] text-white" name="name" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>                 
        //             <Input className="border-[#FFD700] bg-[#1f1f1f] text-white" name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        //             <Input className="border-[#FFD700] bg-[#1f1f1f] mb-3 text-white" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        //             <Button className="bg-[#FFD700] hover:bg-[#FFEC8B] text-[#000000] font-bold cursor-pointer px-6 py-2">Register</Button>
        //             { error && (
        //                 <div className="text-sm bg-red-500 text-white w-fit py-1 px-3 rounded-md mt-2">
        //                 {error}
        //                 </div>
        //             )}
                    
        //             <Link href="#" className="text-sm mt-3 text-right text-white">
        //                 Already have an account? <span className="underline">
        //                     Login
        //                 </span>
        //             </Link>
        //         </form>
        //     </div>
        // </div>     
    );
}