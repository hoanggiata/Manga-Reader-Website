"use client"
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Suspense } from "react";
import { useState,useEffect } from "react";
import { searchManga, slideTitle } from "@/utils/utils";
import Loading from "@/app/loading";
export default function SearchPopUp()
{
    const [value,setValue] = useState("");
    const [mangas, setMangas] = useState([]);
    const [allChapters, setAllChapters] = useState([]);
    const [coverArts, setCoverArts] = useState([]);

    useEffect(() => {
        // Set a timeout to trigger the action after 5 seconds of inactivity
        const timeoutId = setTimeout(() => {
          fetchData(); // Call data-fetching function
        }, 2000);
    
        // Cleanup: Clear the timeout if the user types again
        return () => {
          clearTimeout(timeoutId);
        };
      });

    async function fetchData() {
        if(value === "") return;
        try {        
            const result = await fetch(`/api/searchPopUpManga`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({value})
            });
            const { mangas, allChapters, coverArts } = await result.json();
            // const { mangas, allChapters, coverArts } = await searchManga(value);
            setMangas(mangas);
            setAllChapters(allChapters);
            setCoverArts(coverArts);
            // Now you can use the fetched data (mangas, allChapters, coverArts) in your component state or render them in your UI.
            } catch (error) {
            console.error('Error fetching manga data:', error);
            // Handle the error (e.g., show an error message to the user)
            }
    }
    function handleOnChange(event)
    {
        const inputValue = event.target.value;
        setValue(inputValue);
        let popUp = document.querySelector(".search-pop-up");
        if(inputValue === "")
        {
            popUp?.classList.add("hidden");
            setValue("");
            setMangas([]);
            setAllChapters([]);
            setCoverArts([]);
        }
        else
        {        
            popUp?.classList.remove("hidden");
        }
        
    }
    
    return (
        <>  
            <Input className="hidden lg:block bg-white relative pl-16 pr-16 h-[45px]" placeholder="Search your manga here" onChange={handleOnChange} value={value}/>
            <Button className="w-[40px] h-[30px] p-0 text-xs text-[#000000] bg-[#FFD700] overflow-hidden hover:bg-[#FFEC8B] absolute ml-3" variant="default"><Link href="/filter" className="px-2 py-2" prefetch={true}>Filter</Link></Button>
            
            <div className="absolute left-0 top-11 right-0 overflow-hidden z-10 border rounded-lg bg-[#2f2f2f] border-transparent w-[77%] hidden search-pop-up">                 
                    {(typeof mangas !== "undefined" || mangas.length > 0) && mangas.map((manga, index) => (
                        <Link key={manga.id} href={`/detailpage/${manga.id}`} className=" px-3 py-3 w-full flex">
                            {coverArts[index].map(cover => {
                            return (
                                <div key={manga.id} className=" w-16">
                                    <Image src={cover} className="w-full" alt="Logo Website" width={52} height={0}/>
                                </div>
                            );
                            })}                             
                            <div className="text-white pl-3 pt-1 w-full">
                                <h3 className=" text-base w-full mb-4">{slideTitle(manga,true)}</h3>

                                { allChapters[index] ? allChapters[index].slice(0,1).map((item) => (
                                    item ? (
                                    <div key={item.id} className=" text-xs">
                                        <span>Chapter {item.chapter}</span>
                                    </div>
                                    ) : null
                                )) : <p className="text-xs">No English Chapter Found</p>
                                }    

                                
                            </div>
                        </Link>
                    ))}                                 
                <Link href={`/search?title=${value}`} className=" px-4 py-4 bg-[#FFD700] text-[#000000] w-full flex justify-center"><span>View all results</span></Link>              
            </div>
          
        </>
    );
}
