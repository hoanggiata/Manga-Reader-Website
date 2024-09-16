import Card from "@/components/ui/Card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import PaginationComponent from "@/components/PaginationComponent";
import { fetchFollowedMangasWithID, fetchManga, slideTitle } from "@/utils/utils";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import "@/app/globals.css"
const fetchFollowedMangaID = async (email : String | null | undefined) => {
    try {
        let link = new URL(`${process.env.NEXTAUTH_URL}/api/getMangaFollowedId`);
        const respond = await fetch(link,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email),
        })
        if(respond.status === 409)
        {
            const respondData = await respond.json();
            return respondData.message;            
        }
        else if(respond.status === 200)
        {
            const respondData = await respond.json();
            return respondData;
        }
        else {
            throw new Error("Error checking manga following status");
        }
    } catch (error) {
        console.log("Error during check follow manga:",error);
    }
}
export default async function MangaList({params}:any) {
    const session = await getServerSession(authOptions);
    let mangas, allChapters,coverArts;
    let email = session?.user?.email;
    let id = await fetchFollowedMangaID(email);
    if(typeof id !== "undefined")
    {
        ({mangas, allChapters, coverArts} = await fetchFollowedMangasWithID(id));
    } 
    return(
        <main className="bg-[#1f1f1f] relative flex flex-col min-h-screen overflow-hidden pt-10">
            <div className="max-w-[1160px] lg:w-[1160px] pl-4 pr-4 lg:p-0 lg:ml-auto lg:mr-auto">
                {/* Breadcrumb */}
                <div className="mb-[25px] ml-3">
                    <Breadcrumb className="">
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-white">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-[#ddd]">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/mangalist">Followed List</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {/*Filter Manga*/}
                <div className="text-white">
                    <div className="text-[24px] font-semibold ml-3 mb-[15px]">
                        <h2 className="text-lg">Followed List</h2>
                    </div>
                    {/* Filter Content */}
                    {typeof mangas !== "undefined" &&
                    <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                        {mangas.map((manga, index) => {
                            const tags = manga.data.attributes.tags.slice(0,3);
                            
                            const chaptersManga = allChapters[index] || 'Loading Chapters';
                            return coverArts[index].map(cover => (
                                <Card key={cover.id} cover={cover} mangaID={manga.data.id} tags={tags} chapters={chaptersManga} title={slideTitle(manga.data,false)} />
                            ));    
                        })}                   
                    </div>
                    }                      
                </div>
                {/* Pagination
                <div className="text-[#999] flex mt-14 mb-20">
                    <PaginationComponent page={typeof searchParams !== `undefined` && searchParams.page}/>
                </div> */}
            </div>
        </main>
    );
}