import { Suspense } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Breadcrumb, 
         BreadcrumbItem,
         BreadcrumbLink,
         BreadcrumbList,
         BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Metadata } from "next";
import {fetchChapterImages, fetchMangaWithID, slideTitle} from "@/utils/utils";
import ImageChapter from "@/components/ImageChapter";
import Loading from "./loading";
import SelectComponent from "@/components/SelectComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import UserChapter from "@/models/userchapter";
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

export default async function DetailChapter({params} : any) {
    const session = await getServerSession(authOptions);
    const {manga,allChapters} = await fetchMangaWithID(params.mangaId);
    try {     
        let link2 = new URL(`${process.env.NEXTAUTH_URL}/api/readChapter`);
        const respond = await fetch(link2,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({mangaId:params.mangaId,chapterId:params.chapterId,email:session?.user?.email}),
        });
        if(respond.ok)
        {
            console.log("Chapter read successfully");
        }
        else{
            console.log("Chapter read failed");
        }
    } catch (error) {
        console.log("Error during add chapter:",error);
    }
    return (
        <main className="bg-[#1f1f1f] flex-grow relative">
            <Header/>
            <div className="container mx-auto px-4 pt-16 rounded bg-[#242526]">
                <div className="mb-[25px]">
                    <Breadcrumb className="">
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
                    <div className="container mx-auto px-4 pt-16">
                        <div className="flex items-center justify-center">
                            <h1 className="text-2xl font-bold text-white">
                                {slideTitle(manga,false)}
                            </h1>
                            <p className= "text-white ml-4">cập nhật vào lúc 12:00</p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center">
                        <div className="flex flex-wrap justify-center">
                            <button className="bg-[#FFD700] text-black px-4 py-2 rounded">Server VIP</button>
                        </div>
                    </div>
                    {/* <div className="mt-4 flex flex-wrap justify-center">
                        <div className="flex items-center">
                            <button className="bg-[#F0AD4E] text-black px-4 py-2 rounded mr-2">Báo Lỗi Chương</button>
                        </div>
                    </div> */}
                    <div className="mt-4 flex flex-wrap justify-center">
                        <div className="flex items-center">                          
                            <SelectComponent allChapter={allChapters} mangaId={params.mangaId} chapterId={params.chapterId}/>                         
                        </div>
                    </div>
                </div>
            </div>
            {/* nội dung truyện */}
            <div className="container px-4 py-8 rounded mt-4 flex justify-center">
                <div className="w-full px-5">
                    <Suspense fallback={<Loading/>}>
                        <ImageChapter chapterID={params.chapterId}/> 
                    </Suspense>                                 
                </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center mb-36">
                <div className="flex items-center">
                    <SelectComponent allChapter={allChapters} mangaId={params.mangaId} chapterId={params.chapterId}/>
                </div>
            </div>
            <Footer/>
        </main>
    );
}