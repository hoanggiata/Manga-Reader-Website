import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import {fetchAllTag, fetchManga, slideTitle} from "@/utils/utils"; 
import Card from "@/components/ui/Card";
import FilterSelection  from "@/components/ui/FilterSelection";
import PaginationComponent from "@/components/PaginationComponent";
import "@/app/globals.css"
export default async function Filter({params, searchParams}:any) {
    let mangas, allChapters,coverArts,totalManga,includedTags;
    let filters: {[key:string]:any} = {
        contentRating: "",
        status: "",
        publicationDemographic:"" 
    };
    let queryParams = "";
    // Fetch Manga and its chapters
    if(typeof searchParams === `undefined`) {
        ({mangas, allChapters, coverArts,totalManga} = await fetchManga());
    }else {
        const contentRating = searchParams[`contentRating`] || searchParams[`contentRating[]`];
        includedTags = searchParams[`includedTags`] || searchParams[`includedTags[]`];
        const status = searchParams[`status`] || searchParams[`status[]`];
        const publicationDemographic = searchParams[`publicationDemographic`] || searchParams[`publicationDemographic[]`];
        filters.contentRating = [contentRating];
        filters.status = [status];
        filters.publicationDemographic = [publicationDemographic];
        const queryTagFilters = Object.keys(filters).filter(key => filters[key].toString() !== 'any' && filters[key].toString() !== '')
        .map(key => `${key}[]=${filters[key]}`)
        .join('&');

        if(typeof includedTags !== `undefined` && Array.isArray(includedTags) ){
            let queryTagIDs = includedTags.map((tagID: string) => `includedTags[]=${tagID}`).join('&');
            if(queryTagFilters){
                queryParams = queryTagIDs.concat('&',queryTagFilters);
            }
            else{
                queryParams = queryTagIDs;
            }
        }else if(typeof includedTags !== `undefined`){
            let queryTagIDs = `includedTags[]=${includedTags}`;
            if(queryTagFilters){
                queryParams = queryTagIDs.concat('&',queryTagFilters);
            }
            else
            {
                queryParams = queryTagIDs;
            }
        }
        console.log("queryParams",queryParams);      
        ({mangas, allChapters, coverArts,totalManga} = await fetchManga(typeof searchParams.page !== `undefined` ? searchParams.page : 1,20,"",queryParams !== "" ? queryParams : queryTagFilters ? queryTagFilters : ""));
    }
    const {tags} = await fetchAllTag(); 
    return(
    <main className="bg-[#1f1f1f] relative flex flex-col min-h-screen overflow-hidden pt-10">
        <div className="max-w-[1160px] pl-4 pr-4 lg:p-0 lg:ml-auto lg:mr-auto">
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
            <FilterSelection genres={tags} filters={filters} includedTags={includedTags}/>
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
                            <Card key={cover.id} cover={cover} mangaID={manga.id} tags={tags} chapters={chapters} title={slideTitle(manga,false)} />
                        ));                 
                    })}                   
                </div>                      
            </div>
            {/* Pagination */}
            <div className="text-[#999] flex mt-[1.5rem] mb-20">
                <PaginationComponent page={typeof searchParams !== `undefined` && searchParams.page} totalManga={totalManga} queryParams={queryParams}/>
            </div>
        </div> 
    </main>  
    );
}