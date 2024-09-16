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
import { fetchManga, slideTitle } from "@/utils/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import "@/app/globals.css"
export default async function MangaList({params, searchParams}:any) {
    const session = await getServerSession(authOptions);
    let mangas, allChapters,coverArts;
    // Fetch Manga and its chapters
    if(typeof searchParams === `undefined`) {
        ({mangas, allChapters, coverArts} = await fetchManga());
    } else {       
        ({mangas, allChapters, coverArts} = await fetchManga(searchParams.page,20));
    }
    if(mangas.length === 0) {throw new Error("Something went wrong!");}
    return(
        <main className="bg-[#1f1f1f] relative flex flex-col min-h-screen overflow-hidden pt-10">
            <div className="max-w-[1160px] pl-4 pr-4 lg:p-0 lg:ml-auto lg:mr-auto">
                {/* Breadcrumb */}
                <div className="mb-[25px] ml-3">
                    <Breadcrumb className="">
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-white">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-[#ddd]">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/mangalist">Manga List</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {/*Filter Manga*/}
                <div className="text-white">
                    <div className="text-[24px] font-semibold ml-3 mb-[15px]">
                        <h2 className="text-lg">Manga List</h2>
                    </div>
                    {/* Filter Content */}
                    <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                        {mangas.map((manga, index) => {
                            const tags = manga.attributes.tags.slice(0,3);
                            const chapters = allChapters[index] || 'Loading Chapters';
                            return coverArts[index].map(cover => (
                                <Card key={cover.id} cover={cover} mangaID={manga.id} tags={tags} chapters={chapters} title={slideTitle(manga,false)} />
                            ));    
                        })}                   
                    </div>                      
                </div>
                {/* Pagination */}
                <div className="text-[#999] flex mt-14 mb-20">
                    <PaginationComponent page={typeof searchParams !== `undefined` && searchParams.page}/>
                </div>
            </div>
        </main>
    );
}