import PaginationComponent from "@/components/PaginationComponent";
import SearchMangaInput from "@/components/SearchMangaInput";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import "@/app/globals.css"
import Card from "@/components/ui/Card";

import { fetchManga, slideTitle } from "@/utils/utils";


export default async function Search({params, searchParams}:any)
{
    let mangas, allChapters,coverArts,totalManga;
    // Fetch Manga and its chapters
    if(typeof searchParams === `undefined`) {
        ({mangas, allChapters, coverArts,totalManga} = await fetchManga());
    } else {       
        ({mangas, allChapters, coverArts,totalManga} = await fetchManga(searchParams.page,20,searchParams.title));
    }
    return (
        <main className="bg-[#1f1f1f] relative flex flex-col min-h-screen overflow-hidden pt-10">
            <div className="lg:w-[1160px] max-w-[1160px] pl-4 pr-4 lg:p-0 lg:ml-auto lg:mr-auto">
                {/* Breadcrumb */}
                <div className="mb-[25px] ml-3">
                    <Breadcrumb className="">
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-white">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-[#ddd]">
                            <BreadcrumbLink className="hover:text-[#FFD700]" href="/search">Search List</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {/*Filter Manga*/}
                <div className="text-white">
                    <SearchMangaInput />
                    <div className="text-[24px] font-semibold ml-3 mb-[15px]">
                        <h2>Search Manga: {searchParams.title}</h2>
                    </div>
                    {/* Filter Content */}
                    <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                        {mangas.length > 0 ? mangas.map((manga, index) => {
                            const tags = manga.attributes.tags.slice(0,3);
                            const chapters = allChapters[index] || 'Loading Chapters';

                            return coverArts[index].map(cover => (
                                <Card key={cover.id} cover={cover} mangaID={manga.id} tags={tags} chapters={chapters} title={slideTitle(manga,false)} />
                            ));                 
                        }) : (<div className="text-[#FFD700] text-lg mt-3 ml-3">No Manga Found</div>)
                        }                   
                    </div>                      
                </div>
                {/* Pagination */}
                <div className="text-[#999] flex mt-[1.5rem] mb-20">
                    {mangas.length > 0 && <PaginationComponent page={typeof searchParams !== `undefined` && searchParams.page} totalManga={totalManga} title={ typeof searchParams !== `undefined` && searchParams.title}/>}                 
                </div>
            </div>
        </main>
    );
}