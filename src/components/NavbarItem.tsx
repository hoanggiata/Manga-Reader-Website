"use client"
import * as React from "react";
import Link from "next/link";

export default function NavbarItem(){
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <button onClick={toggleMenu} className="lg:hidden text-white focus:outline-none">
            <svg className="w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
            </button>

            <div></div>
            {isMenuOpen && (       
            <nav className="lg:hidden absolute top-full left-0 w-full bg-[#2f2f2f] z-50 py-4 overflow-hidden transition-all duration-300 ease-in-out">
                <div className="flex flex-col items-center space-y-4">
                <Link href="/mangalist" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>UPDATES</Link>
                <Link href="/mangalist" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>MANGA LIST</Link>
                <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>FAVORITED</Link>
                <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>ABOUT US</Link>
                <Link href="/" className="text-[#FFD700] text-base font-medium lg:mr-7 mr-5 hover:text-[#CCB000]" onClick={toggleMenu}>CONTACT</Link>
                </div>
            </nav>
            )}
        </>
    );
}