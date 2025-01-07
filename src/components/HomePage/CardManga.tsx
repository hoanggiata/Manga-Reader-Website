import { fetchManga, slideTitle } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
export default async function CardManga() {
    const {mangas,allChapters,coverArts} = await fetchManga();
    return (
        <div className="font-bold w-full lg:w-[58%] mb-10 lg:mb-0">
            <h3 className="p-5 text-lg">Latest Updates</h3>
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 w-full">
              {mangas.map((manga,index) => {
                return (
                <div key={manga.id} className="w-full md:w-[100%] lg:w-full rounded-[0.75rem] md:bg-[#2f2f2f] p-4 lg:ml-[7px] lg:mr-[7px] md:mb-[20px] relative">
                {coverArts[index].map(cover => {
                  return (
                  <Link key={manga.id} href="#" className="absolute top-4 left-4 md:w-[140px] w-[80px] md:h-[200px]" prefetch={true}>
                    <Image className="w-full lg:h-full" src={cover} width={140} height={0} alt="Manga Cover" ></Image>
                  </Link>
                  );
                })}            
                {/* Manga Detail */}
                <div className="w-[calc(100%-95px)] md:w-[calc(100%-160px)] float-right md:h-[200px] min-h-[120px] relative">
                     <Link href={`/detailpage/${manga.id}`} className="text-[17px] font-semibold w-full hover:text-[#FFD700]"><p className="truncate">{slideTitle(manga,true)}</p></Link>
                     {/* Manga Category */}
                     <div className="block mb-[20px] md:mt-[10px] lg:mt-0 text-[13px]">
                         <span>
                          {manga.attributes.tags.slice(0,3).map((tag) => (
                            <Link className="text-gray-400 text-[12px] lg:text-sm font-light hover:text-[#FFD700]" key={tag.id} href="#">{tag.attributes.name.en}, </Link>
                          ))}
                         </span>
                     </div>
                     {/* Manga Chaper List */}
                     <div className="absolute left-0 right-0 bottom-0 pr-[10px] font-medium text-[13.6px] text-[#FFD700]">
                      { allChapters[index] ? allChapters[index].map((item,index) => (
                        item ? (
                        <div key={item.id} className={`pt-[10px] border-b ${index === 2 && "hidden md:block"} border-dashed border-gray-600`}>
                          <Link href={`/detailchapter/${manga.id}/${item.id}`} className={`hover:text-[#FFD700]`}>Chap {item.chapter}</Link>
                        </div>
                        ) : null
                      )) : <p>No English Chapter Found</p>
                      }                  
                     </div>
                </div>            
            </div>
                ); 
              })}                                
            </div>
        </div>
    );
}