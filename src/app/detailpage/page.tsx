import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function DetailPage() {
    return (
        <main className="bg-[#1f1f1f] h-[150vh] relative">
            <Header/>
            {/* chi tiết card Manga */}
            <div className="container mx-auto px-4 lg:px-0 flex flex-wrap flex-col lg:flex-row w-full h-[70vh]">
                <div className="w-full lg:w-1/2 flex items-start justify-between py-10 lg:py-0">
                    <Image className="w-[40%] min-w-[300px] rounded-lg object-cover" src="/images/DemoCover.png" alt="Manga Title" width={200} height={300} objectFit="cover"/>
                    <div className="flex flex-col items-start ml-10">
                        <h1 className="text-3xl font-bold text-white mt-5">This is Manga Title</h1>
                        <p className="text-white text-lg mt-5 text-justify lg:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id justo et lectus tincidunt porttitor. Nullam et dui sed nunc ultrices efficitur. Sed sit amet lacus ut mi malesuada eleifend.</p>
                        <div className="text-white text-base font-light mt-3">
                            <div className="mb-[10px] font-light flex flex-wrap gap-2">
                                <Link href="#" className="px-3 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800">Action </Link>
                                <Link href="#" className="px-3 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800">Drama </Link>
                                <Link href="#" className="px-3 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800">Fantasy </Link>
                            </div>
                        </div>
                        <Link href={`#`}>
                            <Button className="mt-5 py-2 px-4 bg-[#FFD700] text-black font-bold hover:text-opacity-75">
                                Read Now
                            </Button>
                        </Link>

                    </div>
                </div>   
            {/* Rating */}
            <div className="w-full lg:w-1/2 overflow-auto px-4 py-10 lg:py-4">
                <h2 className="text-2xl text-white font-bold mb-5">Rating</h2>
                <div className="flex flex-row items-center mb-5">
                    <span className="text-white text-lg mr-2">Score:</span>
                    <span className="text-white text-lg font-bold">N/A</span>
                </div>
                {/* <div className="flex flex-row mb-5">
                    <div className="w-8 h-8 bg-[#FFD700] rounded-full mr-4"></div>
                    <div className="w-8 h-8 bg-[#FFD700] rounded-full mr-4"></div>
                    <div className="w-8 h-8 bg-[#FFD700] rounded-full mr-4"></div>
                    <div className="w-8 h-8 bg-[#FFD700] rounded-full mr-4"></div>
                    <div className="w-8 h-8 bg-[#FFD700] rounded-full mr-4"></div>
                </div> */}
                <div className="text-white text-base font-light mt-3">
                    <span className="mr-2">What do you think about this manga?</span>
                </div>
                <div className="flex flex-row justify-between mt-5">
                    <button className="w-full py-2 px-4 bg-[#F55949] text-white font-bold hover:text-opacity-75">
                    {/* onClick={() => handleOptionClick("Boring")}> */}
                        <span className="mr-2"></span> Boring
                    </button>
                    <button className="w-full py-2 px-4 bg-[#57BC99] text-white font-bold hover:text-opacity-75">
                    {/*  onClick={() => handleOptionClick("Great")}> */}
                    <span className="mr-2"></span>Great
                    </button>
                    <button className="w-full py-2 px-4 bg-[#2ECC71] text-white font-bold hover:text-opacity-75">
                    {/* onClick={() => handleOptionClick("Amazing")}> */}
                    <span className="mr-2"></span>Amazing
                    </button>
                </div>
            </div>      
            </div>

            {/* List of chapters */}
            <div className="container mx-auto w-full lg:w-1/2 overflow-auto px-4 pt-10 lg:pt-0 pb-10 flex flex-wrap">
                <h2 className="text-2xl text-white font-bold mb-5">List of Chapters</h2>
                <Input className="w-full lg:w-1/2 ml-10" placeholder="Search..." />
                <ul className="list-none p-0 m-0 border-t-1 border-[#2f2f2f] mt-0">
                    <li className="flex items-center border-b border-[#2f2f2f] py-4">
                        <div className="w-8 h-8 bg-[#FFD700] rounded-full mr-4"></div>
                        <Link href="#">
                            <span className="text-white hover:text-opacity-75 text-lg font-medium block cursor-pointer">
                                Chapter 1: Chapter Title
                            </span>
                        </Link>
                    </li>
                    <li className="flex items-center border-b border-[#2f2f2f] py-4">
                        <div className="w-8 h-8 bg-[#FFD700] rounded-full mr-4"></div>
                        <Link href="#">
                            <span className="text-white hover:text-opacity-75 text-lg font-medium block cursor-pointer">
                                Chapter 2: Chapter Title
                            </span>
                        </Link>
                    </li>
                    <li className="flex items-center border-b border-[#2f2f2f] py-4">
                        <div className="w-8 h-8 bg-[#FFD700] rounded-full mr-4"></div>
                        <Link href="#">
                            <span className="text-white hover:text-opacity-75 text-lg font-medium block cursor-pointer">
                                Chapter 3: Chapter Title
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Fitter */}
            <div>
                
            </div>
            {/* Comment */}
            <div>

            </div>
            <Footer/>
        </main>
    );
}