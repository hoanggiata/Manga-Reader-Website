import { Suspense } from "react";
import { Breadcrumb, 
         BreadcrumbItem,
         BreadcrumbLink,
         BreadcrumbList,
         BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import {fetchChapterImages, fetchMangaWithID, slideTitle} from "@/utils/utils";
import ImageChapter from "@/components/ImageChapter";
import Loading from "./loading";
import SelectComponent from "@/components/SelectComponent";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import ScrollToTopButton from "@/components/DetailChapter/ScrollToTopButton/ScrollToTopButton";
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
async function checkChapterRead(chapterId: any,mangaId: any,email: any) {
    try {     
        let link2 = new URL(`${process.env.NEXTAUTH_URL}/api/readChapter`);
        const respond = await fetch(link2,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({mangaId,chapterId,email}),
        });
        if(respond.ok)
        {   
            const respondData = await respond.json();
            console.log(respondData.message);
        }
        else{
            const respondData = await respond.json();
            console.log(respondData.message);
        }
    } catch (error) {
        console.log("Error during add chapter:",error);
    }
}

export default async function DetailChapter({params} : any) {
    const session = await getServerSession(authOptions);
    await checkChapterRead(params.chapterId,params.mangaId,session?.user?.email);
    const {manga,allChapters} = await fetchMangaWithID(params.mangaId);
    if(!manga || !allChapters) {throw new Error("Something went wrong!");}
    return (
        <main className="bg-[#1f1f1f] h-min-screen flex flex-col overflow-hidden pt-10">
            <div className="container mx-auto px-4 pt-16 bg-[#242526]">
                <div className="mb-6">
                    <Breadcrumb className="flex flex-wrap">
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-white">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-[#ddd]">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href={`/detailpage/${params.mangaId}`}>{slideTitle(manga,false)}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-[#ddd]">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/filter">Chapter 75</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="mt-4">
                        <div className="flex flex-wrap items-center">
                            <h1 className="text-2xl font-bold text-white">
                                {slideTitle(manga,false)}
                            </h1>
                            <p className= "text-white ml-2">cập nhật vào lúc 12:00</p>
                        </div>
                    </div>
                    <div className="mt-4 mb-6 flex flex-wrap justify-center">
                        <div className="flex flex-wrap justify-center">
                            <button className="bg-[#FFD700] text-black px-4 py-2 rounded">Server VIP</button>
                        </div>
                    </div>
                    
                    {/* <div className="mt-4 flex flex-wrap justify-center">
                        <div className="flex items-center">
                            <button className="bg-[#F0AD4E] text-black px-4 py-2 rounded mr-2">Báo Lỗi Chương</button>
                        </div>
                    </div> */}
                    <div className="mt-4 flex flex-wrap justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <div className="flex items-center">                          
                            <SelectComponent allChapter={allChapters} mangaId={params.mangaId} chapterId={params.chapterId}/>                         
                        </div>
                    </div>
                </div>              
            </div>
            {/* nội dung truyện */}
            <div className="container mx-auto lg:px-4 px-0 py-8 rounded mt-4 flex justify-center relative">
                <div className="w-full lg:w-3/4 xl:w-2/3 lg:px-2">
                    <Suspense fallback={<Loading/>}>
                        <ImageChapter chapterID={params.chapterId}/> 
                    </Suspense>                                 
                </div>            
            </div>

            <div className="mt-4 flex flex-wrap justify-center mb-36 space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex items-center">
                    <SelectComponent allChapter={allChapters} mangaId={params.mangaId} chapterId={params.chapterId}/>
                </div>
            </div>
            <ScrollToTopButton></ScrollToTopButton>
        </main>
    );
}