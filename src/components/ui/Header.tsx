"use client";
import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
        <Link href="/" className="text-[#FFD700] text-3xl font-bold ">AE MANGA</Link>
        {/* <div className="ml-[3rem] flex items-center">
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">UPDATES</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">MANGA LIST</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">FAVORITED</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">ABOUT US</Link>
        </div>   */}
        <nav className="ml-[3rem] hidden lg:flex items-center">
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">UPDATES</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">MANGA LIST</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">FAVORITED</Link>
          <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]">ABOUT US</Link>
        </nav>  
      </div>
      
      <div className="flex items-center">
        <Input className="bg-white relative pl-16 h-[45px] hidden lg:block" placeholder="Search your manga here"/>
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-[153px]" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg> */}
        <Button className="w-[40px] h-[30px] text-xs text-[#000000] bg-[#FFD700] hover:bg-[#FFEC8B] absolute ml-3" variant="default"><Link href="/filter">Filter</Link></Button>
        <span className="text-[#FFD700] ml-10 font-bold text-base hidden lg:block">Member</span>

        <div className="lg:hidden flex items-center space-x-4">
          <Button className="w-[40px] h-[30px] text-xs text-[#000000] bg-[#FFD700] hover:bg-[#FFEC8B] absolute ml-3" variant="default"><Link href="/filter">Filter</Link></Button>
          <button className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11a4 4 0 100 8 4 4 0 000-8zm-1 1a3 3 0 110 6 3 3 0 010-6zm6-3h1a4 4 0 110 8h-1V8zm0 2v6a2 2 0 100-4h-1a2 2 0 100 4h1z" />
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