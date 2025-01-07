import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import ChapterListCard from "./ChapterListCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
export default async function Card({cover="",tags,chapters=[],title,mangaID})
{
    const session = await getServerSession(authOptions);
    const nextAuthUrl = process.env.NEXTAUTH_URL;
    return (
    <div key={mangaID} className="w-full md:w-[100%] lg:w-full rounded-[0.75rem] md:bg-[#2f2f2f] p-4 lg:ml-[7px] lg:mr-[7px] lg:mb-[20px] relative">       
        <Link key={mangaID} href="#" className="absolute top-4 left-4 lg:w-[140px] md:w-[140px] w-[80px] h-[120px] md:h-[200px]">
            <Image className="w-full h-full" loading="eager" src={cover} width={140} height={0} alt={`${title}`} ></Image>
        </Link>     
        {/* Manga Detail */}
        <div className="float-right md:h-[200px] min-h-[120px] w-[calc(100%-95px)] md:w-[calc(100%-160px)] relative">
            <Link href={`/detailpage/${mangaID}`} className="text-[17px] font-semibold mb-[10px] hover:text-[#FFD700]"><p className="truncate">{title}</p></Link>
            {/* Manga Category */}
            <div className="block mb-[20px] md:mt-[10px] lg:mt-0 text-[13px]">
                <span>
                {tags.map((tag,tagIndex) =>(               
                    <Link key={tag.id} href="#" className="text-gray-400 text-[12px] lg:text-sm font-light hover:text-[#FFD700]">{tagIndex === 2 ? tag.attributes.name.en : tag.attributes.name.en + ", "} </Link>              
                ))}
                </span>    
            </div>
            {/* Manga Chaper List */}
            <ChapterListCard mangaID={mangaID} chapters={chapters} email={session?.user?.email} nextAuthUrl={nextAuthUrl} />
            {/* <div className="absolute left-0 right-0 bottom-0 pr-[10px] font-medium text-[13.6px]">
                {chapters.length > 0 ? chapters.map((item,index) => (
                    <div key={item.id} className={`pt-[10px] ${index === 2 && "hidden md:block"} border-b border-dashed border-gray-600 ${(chapterReadId.length > 0 && (chapterReadId.includes(item.id) ? "text-gray-400 " : "text-[#FFD700]"))}`}>
                        <Link href={`/detailchapter/${mangaID}/${item.id}`}>Chapter {item.chapter}</Link>
                    </div>
                )) : "No chapters"}              
            </div> */}
        </div>            
    </div>
    );
    
}
