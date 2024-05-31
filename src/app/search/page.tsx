"use client";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import {fetchAllTag, fetchManga, slideTitle} from "@/utils/utils"; 
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import GenreSelection  from "@/components/ui/GenreSelection";
import PaginationComponent from "@/components/PaginationComponent";
import SearchPopUp from "@/components/SearchPopUp";
import * as React from "react";
// const handlePost = async(request) =>
// {
//     "use server"
//     const res = await fetch(`https://localhost:3000/api/filter`,{
//         method: 'POST',
//         body: request
//     })
//     const data = await res.json();
// }

export default function Search({params, searchParams}:any) {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)
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
      }, [value]);

    async function fetchData() {
        try {
            if(value === "") return;
            const { mangas, allChapters, coverArts } = await searchManga(value);
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
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };
    return(
    <main className="flex flex-col bg-[#1f1f1f] min-h-screen overflow-hidden">
        <Header/>
        <div className="w-full max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-6 sm:mb-8">
                <Breadcrumb className="">
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-white">
                        <BreadcrumbLink className="hover:text-[#FFD700]" href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="text-[#ddd]">
                        <BreadcrumbLink className="hover:text-[#FFD700]" href="/search">Search</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="relative">
                <SearchPopUp />
            </div>
        </div>
        {isSearchOpen && (
            <div className="hidden absolute top-full left-0 w-full bg-[#2f2f2f] z-50 py-4 transition-all duration-300 ease-in-out">
                <div className="flex items-center px-4">
                    <SearchPopUp/>
                </div>
            </div>
        )}
        <div className="absolute left-0 top-11 right-0 overflow-hidden z-10 border rounded-lg bg-[#2f2f2f] border-transparent w-[100%] hidden search-pop-up">                 
                {mangas.map((manga, index) => (
                    <Link key={manga.id} href={`/detailpage/${manga.id}`} className=" px-3 py-3 w-full flex">
                        {coverArts[index].map(cover => {
                        return (
                            <div key={manga.id} className=" w-16">
                                    <Image src={cover} className="w-full" alt="Logo Website" width={0} height={0} unoptimized/>
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
            <Link href="#" className=" px-4 py-4 bg-[#FFD700] text-[#000000] w-full flex justify-center"><span>View all results</span></Link>              
        </div>                
        <Footer/>      
    </main>  
    );
}