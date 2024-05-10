"use client"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
export default function Filter() {
    const [activeIndices,setActiveIndices] = useState([]);
    const [inputValue,setInputValue] = useState("");
    function handleOnClickGenres(event)
    {
        const key = Number(event.target.dataset.id);
        const newActiveIndices = [...activeIndices];
        if(newActiveIndices.includes(key))
        {
            const indexToRemove = newActiveIndices.indexOf(key);
            console.log(indexToRemove);
            newActiveIndices.splice(indexToRemove, 1);
        }
        else
        {
            newActiveIndices.push(key);
        }
        console.log(newActiveIndices.join(","));
        setInputValue(newActiveIndices.join(","));
        setActiveIndices(newActiveIndices);     
        console.log(document.querySelector("#genres"));
    }
    return(
    <main className="bg-[#1f1f1f] h-[200vh] relative">
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
                            <select className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
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
                            <select className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                                <option className="min-h-[1.2em]">Any</option>
                                <option className="min-h-[1.2em]">Ongoing</option>
                                <option className="min-h-[1.2em]">Completed</option>
                                <option className="min-h-[1.2em]">Hiatus</option>
                                <option className="min-h-[1.2em]">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[15px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Language</strong>
                        <div className="relative group ">
                            <select className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                                <option className="min-h-[1.5em]">Any</option>
                                <option className="min-h-[1.5em]">English</option>
                                <option className="min-h-[1.5em]">Japanese</option>
                                <option className="min-h-[1.5em]">Korea</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Second Filter Section */}
                <div className="flex">
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[8px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Sort</strong>
                        <div className="relative group ">
                            <select className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
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
                            <select className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                                <option className="min-h-[1.2em]">Any</option>
                                <option className="min-h-[1.2em]">Shounen</option>
                                <option className="min-h-[1.2em]">Shoujo</option>
                                <option className="min-h-[1.2em]">Seinen</option>
                                <option className="min-h-[1.2em]">Josei</option>                           
                            </select>
                        </div>
                    </div>
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[8px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Language</strong>
                        <div className="relative group ">
                            <select className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                                <option className="min-h-[1.5em]">English</option>
                                <option className="min-h-[1.5em]">Japanese</option>
                                <option className="min-h-[1.5em]">Korea</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[8px] border rounded-[6px] border-gray-600 items-center">
                        <strong>Publication year</strong>
                        <div className="relative group ">
                            <Input className="ml-2 bg-[#1f1f1f] outline-none border-0" type="number"></Input>
                        </div>
                    </div>
                </div>
                {/* Genres Section */}
                <div className="mt-[1rem]">
                    <div className="mb-[16px]">
                        <strong>Genres</strong>
                    </div>
                    {/* Genres buttons */}
                    <div className="flex flex-wrap">
                        <input type="hidden" name="genres" id="genres" value={inputValue} />
                        <div data-id="1" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(1) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Action</div>
                        <div data-id="2" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(2) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Adventure</div>
                        <div data-id="3" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(3) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Comedy</div>
                        <div data-id="4" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(4) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Crime</div>
                        <div data-id="5" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(5) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Drama</div>
                        <div data-id="6" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(6) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Fantasy</div>
                        <div data-id="7" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(7) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Historical</div>
                        <div data-id="8" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(8) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Horror</div>
                        <div data-id="9" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(9) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Isekai</div>
                        <div data-id="10" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(10) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Medical</div>
                        <div data-id="11" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(11) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Mystery</div>
                        <div data-id="12" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(12) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Romance</div>
                        <div data-id="13" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(13) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Sci-fi</div>
                        <div data-id="14" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(14) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Slice of Life</div>
                        <div data-id="15" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(15) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Sports</div>
                        <div data-id="16" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(16) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Superhero</div>
                        <div data-id="17" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(17) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Thriller</div>
                        <div data-id="18" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(18) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Philosophical</div>
                        <div data-id="19" className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(19) ? "text-[#FFD700]" : ""}`} onClick={handleOnClickGenres} >Psychological</div>
                    </div> 
                </div>
                <div className="mt-[1.5rem]">
                    <Button className="bg-[#FFD700] text-[#000000] hover:bg-[#FFEC8B]">Filter</Button>
                </div>
            </form>
            {/*Filter Manga*/}
            <div className="text-white">
                <div className="text-[24px] font-semibold mb-[15px]">
                    <h2>Filter Results</h2>
                </div>
                {/* Filter Content */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-2">
                    <div className="w-full md:w-[100%] lg:w-full rounded-[0.75rem] bg-[#2f2f2f] p-4">
                        <h3 className="text-white text-[18px] font-semibold mb-[15px]">Card 1</h3>
                        <p className="text-white text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id justo et lectus tincidunt porttitor. Nullam et dui sed nunc ultrices efficitur. Sed sit amet lacus ut mi malesuada eleifend.</p>
                    </div>
                    <div className="w-full md:w-[100%] lg:w-full rounded-[0.75rem] bg-[#2f2f2f] p-4">
                        <h3 className="text-white text-[18px] font-semibold mb-[15px]">Card 2</h3>
                        <p className="text-white text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id justo et lectus tincidunt porttitor. Nullam et dui sed nunc ultrices efficitur. Sed sit amet lacus ut mi malesuada eleifend.</p>
                    </div>
                </div>                      
            </div>

        </div>
        <Footer/>

        
    </main>  
    );
}