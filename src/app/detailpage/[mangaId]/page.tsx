import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { fetchMangaWithID, slideDescription, slideTitle,fetchRelatedMangaWithTags, fetchAllReadChapter } from "@/utils/utils";
import { Metadata } from "next";
import ChapterList from "@/components/ChapterList";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import FollowButton from "@/components/DetailPage/FollowButton";
import "@/app/globals.css"
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
const checkMangaFollowed = async (mangaId: any,email: any) => {
    "use server";
    try {
        let link = new URL(`${process.env.NEXTAUTH_URL}/api/checkMangaFollowed`);
        const respond = await fetch(link,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({mangaId,email}),
        });
        if (respond.status === 409) {
            return true; //User has already followed the manga
        } else if (respond.ok) {
            return false; //  User has not followed the manga 
        } else {
            throw new Error("Error checking manga following status");
        }// User have not followed manga
    } catch (error) {
        console.log("Error during check follow manga:",error);
    }
}
const handleMangaFollowed = async (mangaId: any,email: String) => {
    "use server";
    const status = await checkMangaFollowed(mangaId,email);
    console.log(status);
    if(status === true)
        {
            try {
                let link = new URL(`${process.env.NEXTAUTH_URL}/api/handleMangaFollowed`);
                const respond = await fetch(link,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({mangaId,email,boolean:true}),
            });
                if(respond.ok)
                {
                    const respondData = await respond.json();
                    console.log(respondData.message);
                    return true;
                }
                else
                {
                    const respondData = await respond.json();
                    console.log(respondData.message);
                    return false
                }
            } catch (error) {
                console.log("Error:",error);
            }            
        }
        else if(status === false)
        {
            try {
                let link = new URL(`${process.env.NEXTAUTH_URL}/api/handleMangaFollowed`);
                const respond = await fetch(link,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({mangaId,email,boolean:false}),
            });
                if(respond.ok)
                {
                    const respondData = await respond.json();
                    console.log(respondData.message);
                    return true;
                }
                else
                {
                    const respondData = await respond.json();
                    console.log(respondData.message);
                    return false;
                }
            } catch (error) {
                console.log("Error: ",error);
            }            
        }
}
const getChapterRead = async (mangaId: String,email: any) => {
    try {    
        let link = new URL(`${process.env.NEXTAUTH_URL}/api/readChapter/getLatestReadChapter`);
        const chapter = await fetch(link,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({mangaId,email}),
        });
        if(chapter.ok)
        {
            const chapterData = await chapter.json();
            return chapterData.chapterId;
        }
        else
        {
            const respondData = await chapter.json();
            console.log(respondData.message);
            return null;
        }
    } catch (error) {
        console.error("Error:",error);
    }
}
export default async function DetailPage({params} : any) {   
    // const allReadChapter = await fetchAllReadChapter(session?.user?.email,params.mangaId);
    const {manga,allChapters,coverArt} = await fetchMangaWithID(params.mangaId);
    const nextAuthUrl = process.env.NEXTAUTH_URL;
    const session = await getServerSession(authOptions);
    // const isFollowed = await checkMangaFollowed(params.mangaId,session?.user?.email);
    if(!manga) {throw new Error("Something went wrong!");}
    const {mangaRelated,coverArts,LatestChapter}= await fetchRelatedMangaWithTags(manga.attributes.tags,params.mangaId);  
    const latestChapterReadId = await getChapterRead(params.mangaId,session?.user?.email);
    console.log("Chapter Id:",latestChapterReadId);
    return (
        <main className="bg-[#1f1f1f] relative flex flex-col min-h-screen overflow-hidden">
            <div className="max-w-[1160px] pl-4 pr-4 lg:p-0 lg:ml-auto lg:mr-auto">
        {/* chi tiết card Manga */}
                <div className="container mx-auto px-4 lg:px-0 flex flex-wrap flex-col lg:flex-row w-full mb-10 mt-10">
                    <div className="w-full lg:w-1/2 lg:flex py-5 lg:py-0">
                        <div className="lg:min-w-[240px] lg:max-h-[340px] w-36 ml-auto mr-auto border-4 rounded-lg">
                            <Image className="w-full lg:max-h-[340px] h-full rounded" loading="eager" src={coverArt} alt="Manga Title" width={200} height={300}/>
                        </div>
                        <div className="flex flex-col text-center lg:text-left lg:ml-10">
                            <h1 className="text-xl font-bold text-white mt-5">{slideTitle(manga,false)}</h1>
                            <div className="mt-5 flex justify-center lg:justify-normal">
                                <Link className="w-max" href={`${latestChapterReadId !== null ? `/detailchapter/${params.mangaId}/${latestChapterReadId}` : `/detailchapter/${params.mangaId}/${allChapters[0].chapterArray[0].id}` }`}>
                                    <Button className="py-2 px-4 bg-[#FFD700] text-[#000000] font-bold hover:text-opacity-75 hover:bg-[#FFEC8B]">
                                        {latestChapterReadId !== null ? `Continue Reading` : `Read Now`}
                                    </Button>
                                </Link>   
                                 <FollowButton checkMangaFollowed={checkMangaFollowed} handleMangaFollowed={handleMangaFollowed} mangaId={params.mangaId} email={session?.user?.email}/>    
                            </div>
                            <div className="w-full mt-7 mb-7 lg:mb-0 hover:cursor-pointer">
                                <details className="text-white">
                                    <summary>View Description</summary>
                                    <p className="text-white text-sm mt-5 text-justify lg:text-left">{slideDescription(manga.attributes.description.en)}</p>
                                </details>
                            </div>            
                            <div className="text-white text-sm font-light mt-3">
                                <div className="mb-[10px] font-light flex flex-wrap gap-2 text-white">
                                    {manga && manga.attributes.tags.slice(0,7).map((tag: any) => {
                                        return (
                                            <Link key={tag.id} href="#" className="px-3 py-2 rounded-[0.3em] text-white bg-[#2f2f2f] hover:text-[#FFD700]">{tag.attributes.name.en}</Link>
                                        );                                  
                                    })}                               
                                    {/* <Link href="#" className="px-3 py-2 rounded-[0.3em] bg-[#2f2f2f] text-white hover:text-[#FFD700]">Drama</Link>
                                    <Link href="#" className="px-3 py-2 rounded-[0.3em] bg-[#2f2f2f] text-white hover:text-[#FFD700]">Fantasy</Link> */}
                                </div>
                            </div>               
                        </div>
                    </div>   
                    {/* Rating */}
                    <div className="w-full lg:w-1/2 lg:block overflow-auto px-4 py-5 lg:py-4 lg:pl-[6rem] text-base bg-[#2f2f2f] lg:bg-transparent rounded-lg">
                        <h2 className="text-xl text-white font-bold mb-5">Rating</h2>
                        <div className="flex flex-row items-center mb-5">
                            <span className="text-white text-base mr-2">Score:</span>
                            <span className="text-white text-base font-bold">N/A</span>
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
                <div className="container mx-auto px-4 lg:px-0 flex flex-wrap flex-col lg:mt-0 lg:flex-row w-full mb-16">
                    <ChapterList allChapters={allChapters} mangaId={params.mangaId} session={session} nextAuthUrl={nextAuthUrl}/>
                    
                    {/* Danh sách liên quan */}
                    <div className="container mx-auto w-full lg:w-2/5 overflow-auto px-4 pt-10 lg:pt-0 pb-10 flex flex-wrap flex-col">
                        <h2 className="text-lg text-white font-bold mb-5">You May Also Like</h2>
                        <ul className="list-none p-0 m-0 border-t-1 border-[#2f2f2f] mt-0">
                            {mangaRelated && mangaRelated.map((manga,index) => {
                                return(
                                    <li key={manga.id} className="flex items-center border-b border-[#2f2f2f] py-4 mb-4">                            
                                        {coverArts[index].map(item => (
                                        <div key={manga.id} className="min-w-16 h-20 mr-6 block">
                                            <Image className="w-full h-full" src={item} alt={manga.attributes.title.en} width={74} height={0}/>
                                        </div>
                                        ))}                                                                                                   
                                        <div className="flex flex-col">
                                            <Link href={`/detailpage/${manga.id}`} prefetch={true}>
                                            <span className="text-white text-lg font-semibold block cursor-pointer hover:text-[#FFD700] mb-2 ">
                                                {slideTitle(manga,false)}
                                            </span>
                                            </Link>
                                            <div>
                                                {manga.attributes.tags.slice(0,3).map((tag,tagIndex) => (
                                                    <Link key={tag.id} href="#" className="text-gray-400 text-sm hover:text-[#FFD700]">{tagIndex === 2 ? tag.attributes.name.en : tag.attributes.name.en + ", "}</Link>
                                                ))}
                                            </div>
                                            { LatestChapter[index] ? LatestChapter[index].slice(0,1).map(item => (
                                                item ? (
                                                <div key={item.id} className="pt-[10px] text-[#FFD700] text-sm">
                                                <Link href={`/detailchapter/${manga.id}/${item.id}`}>Chap {item.chapter}</Link>
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
            </div>
        </main>      
    );
}
