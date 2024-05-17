import * as React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Card({cover,tags,chapters,title,mangaID})
{
    return (
    <div key={mangaID} className="w-full md:w-[100%] lg:w-full rounded-[0.75rem] bg-[#2f2f2f] p-4 ml-[7px] mr-[7px] mb-[20px] relative">       
        <Link key={mangaID} href="#" className="absolute h-[200px] top-4 left-4 lg:w-[140px]">
            <Image className="w-full h-full" src={cover} width={0} height={0} alt="Manga Cover" unoptimized></Image>
        </Link>     
        {/* Manga Detail */}
        <div style={{width: "calc(100% - 160px)"}} className="float-right min-h-[200px] relative">
            <h3 className="text-[20px] font-semibold mb-[10px]">{title}</h3>
            {/* Manga Category */}
            <div className="block mb-[20px] text-[13px]">
            <span>
            {tags.map((tag) =>(               
                <Link key={tag.id} href="#">{tag.attributes.name.en}, </Link>              
            ))}
            </span>    
            </div>
            {/* Manga Chaper List */}
            <div className="absolute left-0 right-0 bottom-0 pr-[10px] font-medium text-[13.6px] text-[#FFD700]">
                {chapters.map((item) => (
                    <div key={item.id} className="pt-[10px] border-b border-dashed border-gray-600">
                        <Link href="#">Chapter {item.chapter}</Link>
                    </div>
                ))}
                
            </div>
        </div>            
    </div>
    );
    
}