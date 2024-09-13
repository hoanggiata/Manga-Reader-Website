"use client"
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SearchMangaInput() {
   
    const [value,setValue] = useState("");
    const router = useRouter();
    function handleOnChange(e)
    {
        setValue(e.target.value);
    }
    function handleKeyDown(e)
    {
        if(e.key === "Enter")
        {
            const encodedValue = encodeURIComponent(value.trim().replace(/\s+/g, '-')); // Encode for URL safety
            router.push(`/search?title=${encodedValue}`);
        }
    }
    return (
        <div className="lg:w-[50%] ml-auto mr-auto mb-10 relative">
            <Input className="block bg-white text-black relative h-[45px] text-center" placeholder="Search your manga here" onKeyDown={handleKeyDown} onChange={handleOnChange} value={value}></Input>
            <Button className="w-[70px] h-[30px] p-0 text-xs text-[#000000] bg-[#FFD700] overflow-hidden hover:bg-[#FFEC8B] absolute ml-3 right-3 top-2" variant="default"><Link href={`/search?title=${value.trim().replace(/\s+/g, '-')}`} className="px-2 py-2" prefetch={true}>Search</Link></Button>
        </div>
    );
}