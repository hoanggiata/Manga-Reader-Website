import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Item } from "@radix-ui/react-dropdown-menu";
import {fetchManga,fetchMostViewed,slideTitle} from "@/utils/utils";
export default async function Home() {
  const {mangas,allChapters,coverArts} = await fetchManga();
  const {mangaMostView,coverArtsMostView,allChaptersMostView} = await fetchMostViewed();
  return (
   <main className="flex flex-col bg-[#1f1f1f] min-h-screen overflow-hidden">

    <Header/>
    {/* Content */}
    <div className="flex-1 w-full mt-10 mb-10 px-4 lg:px-0">
      {/* Carousel Banner */}
      <div className="max-w-[1400px] max-h-[400px] w-[100%] lg:pl-[20px] lg:pr-[20px] lg:max-w-[1225px] lg:ml-auto lg:mr-auto mb-[5rem] mt-[5rem]">
        <Carousel opts={{
          align: "start",
          loop: true,
        }}>
          <CarouselContent>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner1.jpg" width={1100} height={450} alt="Manga Cover"/></CarouselItem>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner2.jpg" width={1100} height={450} alt="Manga Cover"/></CarouselItem>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner3.jpg" width={1100} height={450} alt="Manga Cover"/></CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
        
      {/* Latest Updates and Trending */}
      <div className="flex flex-col lg:flex-row max-w-[1400px] justify-around ml-auto mr-auto pl-[30px] pr-[30px] lg:pl-[20px] lg:pr-[20px] text-white">       
          <div className="font-bold lg:text-xl text-sm w-full lg:w-[58%] mb-10 lg:mb-0">
            <h3 className="p-5">Latest Updates</h3>
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 w-full">
              {mangas.map((manga,index) => {
                return (
                <div key={manga.id} className="w-full md:w-[100%] lg:w-full rounded-[0.75rem] bg-[#2f2f2f] p-4 ml-[7px] mr-[7px] mb-[20px] relative">
                {coverArts[index].map(cover => {
                  return (
                  <Link key={manga.id} href="#" className="absolute top-4 left-4 lg:w-[140px] h-[200px]">
                    <Image className="w-full h-full" src={cover} width={0} height={0} alt="Manga Cover" unoptimized></Image>
                  </Link>
                  );
                })}            
                {/* Manga Detail */}
                <div style={{width: "calc(100% - 160px)"}} className="float-right min-h-[200px] relative">
                     <Link href={`/detailpage/${manga.id}`} className="text-[17px] font-semibold mb-[10px] hover:text-[#FFD700]">{slideTitle(manga,true)}</Link>
                     {/* Manga Category */}
                     <div className="block mb-[20px] text-[13px]">
                         <span>
                          {manga.attributes.tags.slice(0,3).map((tag) => (
                            <Link className="text-gray-400 text-sm font-light hover:text-[#FFD700]" key={tag.id} href="#">{tag.attributes.name.en}, </Link>
                          ))}
                         </span>
                     </div>
                     {/* Manga Chaper List */}
                     <div className="absolute left-0 right-0 bottom-0 pr-[10px] font-medium text-[13.6px] text-[#FFD700]">
                      { allChapters[index] ? allChapters[index].map((item) => (
                        item ? (
                        <div key={item.id} className="pt-[10px] border-b border-dashed border-gray-600">
                          <Link href="#">Chap {item.chapter}</Link>
                        </div>
                        ) : null
                      )) : <p>Loading Chapters</p>
                      }                  
                     </div>
                </div>            
            </div>
                ); 
              })}                                
            </div>
          </div>
          <div style={{width: "calc(33.33% - 20px)"}} className="w-full lg:float-right">
            <div className="w-full h-auto font-bold lg:text-xl text-sm">
              <h3 className="p-5">Most Viewed</h3>
              <div className="ml-4 text-lg">
                <ul className="p-0 m-0 list-none">
                  {mangaMostView.data.map((manga,index) => (
                    <li key={manga.id} className="relative mb-[25px]">
                    <div className={`float-right relative top-4 p-3 lg:w-[47px] bg-[#2f2f2f] ${index <3 ? `text-[#FFD700]` : `text-white` } `}><span>{index === 9 ? "10": `0${index + 1}`}</span></div>
                    {coverArtsMostView[index].map(cover => {
                      return (
                        <Link key={manga.id} className="block w-[60px] " href="#"><Image src={cover} alt="Manga Cover" width={100} height={0}/></Link>
                      )
                    })}            
                    <div className="absolute top-0 left-[4.8rem]">
                      <Link href={`/detailpage/${manga.id}`} className="block mb-2 font-[600] hover:text-[#FFD700]">{slideTitle(manga,true)}</Link>
                      <div className="text-gray-400 text-sm font-light block min-w-max text-[0.9rem] ">
                        <span className="">
                          {manga.attributes.tags.slice(0,2).map((tag) => (
                            <Link className="hover:text-[#FFD700]" key={tag.id} href="#">{tag.attributes.name.en}, </Link>
                          ))}
                        </span>
                       
                        <div className="mt-2">
                          {
                            allChaptersMostView[index] ? (
                              <span key={allChaptersMostView[index][0].id} className="text-[#FFD700]"><Link href="#">Chap {allChaptersMostView[index][0].chapter}</Link></span>
                            ) : <p>Loading Chapters</p>
                          }                         
                        </div>
                      </div>
                    </div>                 
                  </li>
                  ))}                 
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>

    <Footer/>
   </main>
  );
}

