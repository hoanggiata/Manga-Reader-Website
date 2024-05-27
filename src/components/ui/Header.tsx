"use client";
import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
export default function Header()
{
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return(
    <header className="w-full h-20 flex bg-[#2f2f2f] justify-between items-center px-4 lg:px-10 mb-[25px] relative">
      {/* <Image src="/images/logo-website4.jpg" className="w-[100px]" alt="Logo Website" width={60} height={30} /> */}
      <div className="flex items-center">
        <button onClick={toggleMenu} className="lg:hidden text-white focus:outline-none">
          <svg className="w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
          </svg>
        </button>
        <Link href="/" className="text-[#FFD700] text-3xl font-bold ">AE MANGA</Link>
        <nav className="ml-[3rem] hidden lg:flex items-center">
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">UPDATES</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">MANGA LIST</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">FAVORITED</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">ABOUT US</Link>
        </nav>  
      </div>
      
      <div className="flex items-center">
        <Input className="bg-white relative pl-16 h-[45px] hidden lg:block" placeholder="Search your manga here"/>
        <Button className="w-[40px] h-[30px] text-xs text-[#000000] bg-[#FFD700] hover:bg-[#FFEC8B] absolute ml-3" variant="default"><Link href="/filter">Filter</Link></Button>
        <span className="text-[#FFD700] ml-10 font-bold text-base hidden lg:flex items-center">Member</span>

        <div className="lg:hidden flex items-center space-x-4 ml-3">
          <Button className="w-[40px] h-[30px] text-xs text-[#000000] bg-[#FFD700] hover:bg-[#FFEC8B]" variant="default">
            <Link href="/filter">Filter</Link>
          </Button>
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          </button>
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>  

      {isMenuOpen && (       
        <nav className="lg:hidden absolute top-full left-0 w-full bg-[#2f2f2f] z-50 py-4 overflow-hidden transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>UPDATES</Link>
            <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>MANGA LIST</Link>
            <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>FAVORITED</Link>
            <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>ABOUT US</Link>
            <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>CONTACT</Link>
          </div>
        </nav>
      )}
    </header>
   );
}