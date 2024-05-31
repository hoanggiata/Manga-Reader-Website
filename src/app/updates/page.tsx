
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
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import GenreSelection  from "@/components/ui/GenreSelection";
import PaginationComponent from "@/components/PaginationComponent";
// const handlePost = async(request) =>
// {
//     "use server"
//     const res = await fetch(`https://localhost:3000/api/filter`,{
//         method: 'POST',
//         body: request
//     })
//     const data = await res.json();
// }
export default async function Updates({params, searchParams}:any) {
    let mangas, allChapters,coverArts;
    // Fetch Manga and its chapters
    if(typeof searchParams === `undefined`) {
        ({mangas, allChapters, coverArts} = await fetchManga());
    } else {       
        ({mangas, allChapters, coverArts} = await fetchManga(searchParams.page));
    }
    const {tags} = await fetchAllTag(); 
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
                        <BreadcrumbLink className="hover:text-[#FFD700]" href="/updates">Updates</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/*Filter Manga*/}
            <div className="text-white">
                <div className="text-[24px] font-semibold mb-[15px]">
                    <h2>Updated Manga</h2>
                </div>
                {/* Filter Content */}
                <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                    {mangas.map((manga, index) => {
                        const tags = manga.attributes.tags.slice(0,3);
                        const chapters = allChapters[index] || 'Loading Chapters';

                        return coverArts[index].map(cover => (
                            <Card key={cover.id} cover={cover} mangaID={manga.id} tags={tags} chapters={chapters} title={slideTitle(manga)} />
                        ));                 
                    })}                   
                </div>                      
            </div>
            {/* Pagination */}
            <div className="text-[#999] flex mt-[1.5rem]">
                <PaginationComponent page={typeof searchParams !== `undefined` && searchParams.page}/>
            </div>
        </div>
        <Footer/>      
    </main>  
    );
}