"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ScrollToTopButton()
{
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
        if (window.scrollY > 20) { // Adjust threshold as needed
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return(
        (isVisible) ? (
           <Button className={`lg:bg-[#2F2F2F] bg-transparent hover:bg-[#FFD700] text-[#000000] bottom-0 right-0 mb-5 mr-5 font-bold cursor-pointer px-2 py-2 fixed `}
            onClick={() => window.scrollTo({top: 0,behavior: "smooth"})}><img src="/images/arrow-up.png" alt="Scroll Arrow"/></Button>
        ) : (<></>)
    );
}