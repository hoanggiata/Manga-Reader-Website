
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
export default async function Filter({params, searchParams}:any) {
    let mangas, allChapters,coverArts;
    // Fetch Manga and its chapters
    if(typeof searchParams === `undefined`) {
        ({mangas, allChapters, coverArts} = await fetchManga());
    } else {       
        ({mangas, allChapters, coverArts} = await fetchManga(searchParams.page));
    }
    const {tags} = await fetchAllTag(); 
    return(
    <main className="bg-[#1f1f1f] h-[250vh] relative">
        <Header/>
        <div className="w-[1160px] ml-auto mr-auto">
            {/* Breadcrumb */}
            <div className="mb-[25px]">
                <Breadcrumb className="">
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-white">
                        <BreadcrumbLink className="hover:text-[#FFD700]" href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="text-[#ddd]">
                        <BreadcrumbLink className="hover:text-[#FFD700]" href="/filter">Manga Filter</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* Filter */}
            <form className="text-white mb-[3rem]">
                {/* First Filter Section */}
                <div className="flex">
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[15px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Content Rating</strong>
                        <div className="relative group ">
                            <select name="contentRating" className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                                <option className="min-h-[1.2em]">Any</option>
                                <option className="min-h-[1.2em]">Safe</option>
                                <option className="min-h-[1.2em]">Suggestive</option>
                                <option className="min-h-[1.2em]">Erotica</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[15px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Status</strong>
                        <div className="relative group ">
                            <select name="status" className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                                <option className="min-h-[1.2em]">Any</option>
                                <option className="min-h-[1.2em]">Ongoing</option>
                                <option className="min-h-[1.2em]">Completed</option>
                                <option className="min-h-[1.2em]">Hiatus</option>
                                <option className="min-h-[1.2em]">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Second Filter Section */}
                <div className="flex">
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[8px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Sort</strong>
                        <div className="relative group ">
                            <select name="sort" className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                                <option className="min-h-[1.2em]">None</option>
                                <option className="min-h-[1.2em]">Best Match</option>
                                <option className="min-h-[1.2em]">Latest Upload</option>
                                <option className="min-h-[1.2em]">Oldest Upload</option>
                                <option className="min-h-[1.2em]">Highest Rating</option>
                                <option className="min-h-[1.2em]">Lowest Rating</option>
                                <option className="min-h-[1.2em]">Recently Added</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[8px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Magazine Demographic</strong>
                        <div className="relative group ">
                            <select name="demographic" className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                                <option className="min-h-[1.2em]">Any</option>
                                <option className="min-h-[1.2em]">Shounen</option>
                                <option className="min-h-[1.2em]">Shoujo</option>
                                <option className="min-h-[1.2em]">Seinen</option>
                                <option className="min-h-[1.2em]">Josei</option>                           
                            </select>
                        </div>
                    </div>
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[8px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Publication year</strong>
                        <div className="relative group ">
                            <Input name="year" className="ml-2 bg-[#1f1f1f] outline-none border-0" type="number"></Input>
                        </div>
                    </div>
                </div>
                {/* Genres Section */}
                <div className="mt-[1rem]">
                    <div className="mb-[16px]">
                        <strong>Genres</strong>
                    </div>
                    {/* Genres buttons */}
                    <GenreSelection genres={tags}/>
                    
                    
                </div>
                {/* Filter Button */}
                <div className="mt-[1.5rem]">
                    <Button type="sumbit" className="bg-[#FFD700] text-[#000000] hover:bg-[#FFEC8B]">Filter</Button>
                </div>
            </form>
            {/*Filter Manga*/}
            <div className="text-white">
                <div className="text-[24px] font-semibold mb-[15px]">
                    <h2>Filter Results</h2>
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