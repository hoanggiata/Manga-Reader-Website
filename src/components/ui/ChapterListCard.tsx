"use client"
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect,useState } from "react";
import { fetchAllReadChapter } from "@/utils/utils";
export default function ChapterListCard({mangaID,chapters=[],email="", nextAuthUrl=""} : any)
{
    const [readChapter,setReadChapter] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllReadChapter(email,mangaID,nextAuthUrl);
                if(data.length > 0)
                {
                    console.log(data);
                    setReadChapter(data);              
                }
            } catch (error) {
                console.error("Error fetching readed chapters:", error);
            }
        };
        fetchData();
    },[mangaID,email]);
    return (
        <div className="absolute left-0 right-0 bottom-0 pr-[10px] font-medium text-[13.6px]">
                {chapters.length > 0 ? chapters.map((item,index) => (
                    <div key={item.id} className={`pt-[10px] ${index === 2 && "hidden md:block"} border-b border-dashed border-gray-600 ${(readChapter.length > 0 ? (readChapter.some(read => read.chapterId === item.id) ? "text-gray-400 " : "text-[#FFD700]") : "text-[#FFD700]")}`}>
                        <Link href={`/detailchapter/${mangaID}/${item.id}`}>Chapter {item.chapter}</Link>
                    </div>
                )) : "No chapters"}              
        </div>
    );
}