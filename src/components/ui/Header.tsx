import * as React from "react";
import Link from "next/link";
import { Button } from "./button";
import SearchPopUp from "../SearchPopUp";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import NavbarItem from "../NavbarItem";
import MemberPopup from "../MemberPopup";

export default async function Header()
{
  const session = await getServerSession(authOptions);
  return(  
      <header className="w-full h-20 flex bg-[#2f2f2f] lg:justify-center md:justify-between lg:items-center px-4 lg:px-10 relative">
        <div className="flex items-center">
          <NavbarItem/>
          <Link href="/" className="text-[#FFD700] text-base w-max lg:text-3xl font-bold ">AE MANGA</Link>
          <nav className="ml-[3rem] hidden lg:flex items-center">
            <Link href="/mangalist" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">UPDATES</Link>
            <Link href="/mangalist" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">MANGA LIST</Link>
            <Link href="/followed" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">FAVORITED</Link>
            <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">ABOUT US</Link>
          </nav>  
        </div>
        
        <div className="flex items-center relative ml-14 gap-5">        
          <SearchPopUp/>
          <div className="group order-3">
            <Link href={!session?.user ? "/auth/sign-in" : "#"} className="text-[#FFD700] lg:ml-10 font-bold text-base  block min-w-max mt-1 truncate ">{session?.user ? `${session?.user?.name}` : "Sign In"}</Link>
            <MemberPopup isLogin={session?.user ? true : false}/>
          </div>
          
          <div className="lg:hidden flex items-center space-x-4 ml-20">
            <button className="text-white focus:outline-none ">
              <Link href="/search">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
              </Link>
            </button>           
            {/* <button className="text-white focus:outline-none">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
              </svg>
            </button> */}
          </div>
        </div>  
        
      </header>
   );
}