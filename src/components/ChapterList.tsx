"use client"
import * as React from "react";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import { useState,useRef,useEffect } from "react";
import { fetchAllReadChapter } from "@/utils/utils";
export default function ChapterList({allChapters,mangaId,session,nextAuthUrl} : any)
{
    const [readChapter,setReadChapter] = useState([]);
    const [search,setSearch] = useState(""); 
    console.log(allChapters) ;
    const ulRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllReadChapter(session?.user?.email,mangaId,nextAuthUrl);
                if(typeof data !== "undefined")
                {
                    setReadChapter(data);              
                }
            } catch (error) {
                console.error("Error fetching readed chapters:", error);
            }
        };
        fetchData();
    },[mangaId,session?.user?.email]);
    function handleSearch(e : any)
    {
        const filter = e.target.value;
        setSearch(filter);
        const li = ulRef.current.getElementsByTagName("li");
        let firstHighlight = null;
        
        if (!filter) {
            for (let i = 0; i < li.length; i++) {
                li[i]?.classList.remove("highlight");
                const numContent = li[i].querySelector(".list-content");
                numContent?.classList.remove("highlight-text");
            }
            return;
        }
        
        for (let i = 0; i < li.length; i++) {
            const numContent = li[i].querySelector(".list-content");
            const str = numContent?.innerHTML || numContent?.textContent;
            const match = str.match(/\d+/);
            const chapterValue = match ? match[0] : null;
            if(chapterValue?.toString() === filter)
            {
                li[i]?.classList.add("highlight");
                numContent?.classList.add("highlight-text");
                if(!firstHighlight) firstHighlight = li[i];
            }
            else
            {
                li[i]?.classList.remove("highlight");
                numContent?.classList.remove("highlight-text");
            }
        }
        if (firstHighlight) {
            ulRef.current.scrollTop = firstHighlight.offsetTop - ulRef.current.offsetTop;
        }
    }

    return(
        <div className="lg:w-1/2">
            <div className="flex justify-between items-center w-full mb-5">
                <h2 className="text-lg text-white font-bold mr-10 ">List Chapter</h2>
                <Input type="number" className="w-full lg:w-1/3 ml-10 text-white" onChange={handleSearch} value={search} placeholder="Number of Chapter"/>
            </div>
            <div className="container mr-5 ml-0 w-full pl-0 pr-0 pt-0 flex flex-wrap bg-[#2f2f2f] rounded">                  
                <div className=" w-full h-full">
                    <ul ref={ulRef} className="overflow-y-auto h-[57vh] list-chapter list-none p-0 m-0 border-t-1 border-[#2f2f2f] flex flex-col">
                    {allChapters && allChapters.map((volume) => (
                        volume.chapterArray.map((item) => (
                            <li key={item.id} className="flex items-center border-b border-[#2f2f2f] py-4">
                            <div className="pl-4 flex">
                                <div className="w-5 h-5 bg-[#FFD700] rounded-full mr-4"></div>
                                <Link href={`/detailchapter/${mangaId}/${item.id}`}>
                                    <span className={`list-content ${readChapter.length > 0 && readChapter.some(read => read.chapterId === item.id) ? "text-gray-500 hover:text-opacity-75" : "text-white" } hover:text-opacity-75 text-sm font-medium block cursor-pointer`}>
                                        <span className="">Chapter {item.chapter}</span>
                                    </span>
                                </Link>
                            </div>
                            </li>
                        ))
                        ))}                                                        
                    </ul>
                </div>
            </div>
        </div>
    );
}
