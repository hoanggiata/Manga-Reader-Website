import * as React from "react";
import Link from "next/link";

import SearchPopUp from "../SearchPopUp";
export default function Header()
{

   return(
    <header className="w-full h-20 flex bg-[#2f2f2f] justify-between items-center pl-10 pr-10 mb-[25px]">
      {/* <Image src="/images/logo-website4.jpg" className="w-[100px]" alt="Logo Website" width={60} height={30} /> */}
      <div className="flex">
        <Link href="/" className="text-[#FFD700] text-3xl font-bold ">AE MANGA</Link>
        <div className="ml-[3rem] flex items-center">
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">UPDATES</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">MANGA LIST</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">FAVORITED</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">ABOUT US</Link>
        </div>  
      </div>
      
      <div className="flex items-center relative">
        
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-[153px]" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg> */}
        
        <SearchPopUp/>
        <span className="text-[#FFD700] ml-10 font-bold text-base">Member</span>
      </div>
    </header>
   );
}