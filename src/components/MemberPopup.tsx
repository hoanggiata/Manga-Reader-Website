"use client"
import * as React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function MemberPopup({isLogin})
{
 
    return (
        <>           
            <div className={`member-popup absolute right-0 top-9 min-w-[40%] left-80 px-5 py-3 bg-[#2f2f2f] overflow-hidden z-10 border rounded-lg border-[#FFD700]  hidden ${isLogin ? "group-hover:block group-focus:block" : ""}`}>           
                <div className="text-center mb-4 px-3 border-b border-[#FFD700]">
                    <Link href="/profile" className="text-white hover:text-[#FFD700]">Profile</Link>
                </div>
                <div className="text-center px-3 border-b border-[#FFD700]">
                    <span className="text-white cursor-pointer hover:text-[#FFD700]" onClick={() => signOut()}>Sign Out</span>
                </div>
            </div>      
        </>       
    );
}