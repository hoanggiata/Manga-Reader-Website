"use client"
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import Link from "next/link";

export default function SelectComponent({allChapter,mangaId,chapterId}){
    const router = useRouter();
    
    const [nextValue, setNextValue] = useState(null); // Initialize nextValue
    const [prevValue, setPrevValue] = useState(null); // Initialize prevValue

    useEffect(() => {
        // Calculate nextValue and prevValue after the component mounts
        const options = document.querySelectorAll('.select-chapter option');
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                setNextValue(options[i + 1]?.value); // Use next option value
                setPrevValue(options[i - 1]?.value); // Use previous option value
            }
        }
    }, []);

    function handleOnChange(event)
    {
        const selectedValue = event.target.value;
        router.push(`/detailchapter/${mangaId}/${selectedValue}`);
    }
    return (
        <>
            <Link href={`/detailchapter/${mangaId}/${prevValue}`} className="bg-[#2f2f2f] text-white text-center px-4 py-2 rounded mr-4 mb-5 min-w-24 hover:bg-[#FFD700] hover:text-[#000000]">Previous</Link>
            <select name="chapter-list" className="select-chapter bg-[#2f2f2f] text-white md:px-20 px-1 py-2 flex justify-center [text-align-last:start]  rounded mr-4 mb-5" onChange={handleOnChange}>
                {allChapter.map((chapterObject) => (
                    chapterObject.chapterArray.map((chapter) => (
                        <option value={chapter.id} key={chapter.id} selected={chapterId === chapter.id}>Chapter {chapter.chapter}</option>
                    ))
                ))}
            </select>
            <Link href={`/detailchapter/${mangaId}/${nextValue}`} className="bg-[#2f2f2f] text-white text-center px-4 py-2 rounded mb-5 min-w-24 hover:bg-[#FFD700] hover:text-[#000000]">Next</Link>
        </>
    );
}
