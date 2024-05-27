import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { fetchMangaWithID, slideDescription, slideTitle,fetchRelatedMangaWithTags } from "@/utils/utils";
import { Metadata } from "next";
import ChapterList from "@/components/ChapterList";

type Props = {
    params: {
        mangaId: string;
    };
};



export const generateMetadata = async ({params} : Props): Promise<Metadata> =>{
    const {manga} = await fetchMangaWithID(params.mangaId);
    return{
        title: `${slideTitle(manga,false)}`,
    };
};

export default async function DetailPage({params} : any) {
    const {manga,allChapters,coverArt} = await fetchMangaWithID(params.mangaId);
    const {mangaRelated,coverArts,LatestChapter} = await fetchRelatedMangaWithTags(manga.attributes.tags,params.mangaId);
    return (
        <main className="bg-[#1f1f1f] h-[170vh] relative">
            <Header/>
            {/* chi tiết card Manga */}
            <div className="container mx-auto px-4 lg:px-0 flex flex-wrap flex-col lg:flex-row w-full mb-10">
                <div className="w-full lg:w-1/2 flex items-start justify-between py-10 lg:py-0">
                    <Image className="lg:min-w-[240px] lg:min-h-[340px] rounded-lg object-cover" src={coverArt} alt="Manga Title" width={200} height={300}/>
                    <div className="flex flex-col ml-10 h-[340px]">
                        <h1 className="text-2xl font-bold text-white mt-5">{slideTitle(manga,false)}</h1>
                        <p className="text-white text-sm mt-5 text-justify lg:text-left">{slideDescription(manga.attributes.description.en)}</p>
                        <div className="text-white text-sm font-light mt-3">
                            <div className="mb-[10px] font-light flex flex-wrap gap-2 text-white">
                                {manga.attributes.tags.slice(0,7).map(tag => {
                                    return (
                                        <Link key={tag.id} href="#" className="px-3 py-2 rounded-[0.3em] text-white bg-[#2f2f2f] hover:text-[#FFD700]">{tag.attributes.name.en}</Link>
                                    );                                  
                                })}                               
                                {/* <Link href="#" className="px-3 py-2 rounded-[0.3em] bg-[#2f2f2f] text-white hover:text-[#FFD700]">Drama</Link>
                                <Link href="#" className="px-3 py-2 rounded-[0.3em] bg-[#2f2f2f] text-white hover:text-[#FFD700]">Fantasy</Link> */}
                            </div>
                        </div>
                        <Link className="w-max mt-auto" href={`#`}>
                            <Button className="py-2 px-4 bg-[#FFD700] text-[#000000] font-bold hover:text-opacity-75 hover:bg-[#FFEC8B]">
                                Read Now
                            </Button>
                        </Link>

                    </div>
                </div>   
                {/* Rating */}
                <div className="w-full lg:w-1/2 overflow-auto px-4 py-10 lg:py-4 lg:pl-[6rem] text-base">
                    <h2 className="text-2xl text-white font-bold mb-5">Rating</h2>
                    <div className="flex flex-row items-center mb-5">
                        <span className="text-white text-lg mr-2">Score:</span>
                        <span className="text-white text-lg font-bold">N/A</span>
                    </div>
                    <div className="text-white text-base font-light mt-3">
                        <span className="mr-2">What do you think about this manga?</span>
                    </div>
                    <div className="flex flex-wrap gap-2 items-left mt-5">
                        <div className="mt-2">
                            <button className="w-20 h-12 rounded-[0.3em] bg-[#F55949] text-white font-bold hover:text-opacity-75 text-center mr-2.5">
                                <span>Boring</span> 
                            </button>
                            <button className="w-20 h-12 rounded-[0.3em] bg-[#57BC99] text-white font-bold hover:text-opacity-75 text-center mr-2.5">
                                <span>Great</span>
                            </button>
                            <button className="w-20 h-12 rounded-[0.3em] bg-[#2ECC71] text-white font-bold hover:text-opacity-75 text-center mr-2.5">
                                <span>Amazing</span>
                            </button>
                        </div>
                    </div>
                </div>      
            </div>

            {/* List of chapters */}
            <div className="container mx-auto px-4 lg:px-0 flex flex-wrap flex-col lg:flex-row w-full">
                <ChapterList allChapters={allChapters}/>
                
                {/* Danh sách liên quan */}
                <div className="container mx-auto w-full lg:w-2/5 overflow-auto px-4 pt-10 lg:pt-0 pb-10 flex flex-wrap flex-col">
                    <h2 className="text-lg text-white font-bold mb-5">You May Also Like</h2>
                    <ul className="list-none p-0 m-0 border-t-1 border-[#2f2f2f] mt-0">
                        {mangaRelated.map((manga,index) => {
                            return(
                                <li key={manga.id} className="flex items-center border-b border-[#2f2f2f] py-4 mb-4">                            
                                    {coverArts[index].map((item) => (
                                    <div key={manga.id} className=" w-16 bg-gray-200 rounded-full mr-4">
                                        <Image className="w-full h-full" src={item} alt={manga.attributes.title.en} width={0} height={0} unoptimized />
                                    </div>
                                    ))}                                                                                                   
                                    <div className="flex flex-col">
                                        <Link href={`/detailpage/${manga.id}`}>
                                        <span className="text-white text-lg font-semibold block cursor-pointer hover:text-[#FFD700] mb-2 ">
                                            {slideTitle(manga,false)}
                                        </span>
                                        </Link>
                                        <div>
                                            {manga.attributes.tags.slice(0,3).map((tag,tagIndex) => (
                                                <Link key={tag.id} href="#" className="text-gray-400 text-sm hover:text-[#FFD700]">{tagIndex === 2 ? tag.attributes.name.en : tag.attributes.name.en + ", "}</Link>
                                            ))}
                                        </div>
                                        { LatestChapter[index] ? LatestChapter[index].slice(0,1).map((item) => (
                                            item ? (
                                            <div key={item.id} className="pt-[10px] text-[#FFD700] text-sm">
                                            <Link href="#">Chap {item.chapter}</Link>
                                            </div>
                                            ) : null
                                        )) : <p>Loading Chapters</p>
                                        }                                                                           
                                    </div>
                                </li>
                            );
                        })}
                                             
                    </ul>
                </div>
            </div>
            <Footer/>
        </main>
    );
}