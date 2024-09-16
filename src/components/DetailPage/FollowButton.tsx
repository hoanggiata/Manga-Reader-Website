"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState,useEffect } from "react";
import { toast } from 'sonner'
export default function FollowButton({checkMangaFollowed,handleMangaFollowed,mangaId,email})
{
    const [clicked,setClicked] = useState(false);
    const [followed,setFollowed] = useState(false);    


    useEffect(() => {
       const fetchData = async () => {
           let checkFollowed = await checkMangaFollowed(mangaId,email);
           setFollowed(checkFollowed);
           if(clicked)
           {              
                if(!checkFollowed)
                {
                    const respond = await handleMangaFollowed(mangaId,email);
                    if(respond){toast.success("This manga has been added to Favorite List.")}
                    else{toast.error("Failed to following manga")};
                    setClicked(false);
                    setFollowed(true);
                }
                else
                {
                    const respond = await handleMangaFollowed(mangaId,email);
                    if(respond){toast.success("This manga has been removed from Favorite List.")}
                    else{toast.error("Failed to cancelling following manga")};
                    setClicked(false);
                    setFollowed(false);
                }
           }
       };
       fetchData();      
    },[clicked, handleMangaFollowed])
    const handleOnClick = () => {
        setClicked(true);
    }
    return (
        <Button onClick={handleOnClick} className={`py-2 px-5 ml-5 ${followed ? "bg-red-500" : "bg-[#2f2f2f]"} font-bold hover:text-opacity-75 text-white lg:hover:bg-red-500`}>
            <Image className="w-full h-full" src={"https://img.icons8.com/?size=100&id=25157&format=png&color=D9DFE9"} width={0} height={0} alt="mark"></Image>
        </Button> 
    );
}