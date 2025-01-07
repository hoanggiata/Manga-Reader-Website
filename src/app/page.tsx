import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {fetchManga,fetchMostViewed,slideTitle} from "@/utils/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import "@/app/globals.css"
import { Suspense } from "react";
import LoadingCardManga from "./loading/LoadingCardManga";
import LoadingCardMangaMostView from "./loading/LoadingCardMangaMostView";
import CardManga from "@/components/HomePage/CardManga";
import CardMangaMostViewed from "@/components/HomePage/CardMangaMostViewed";
export default async function Home() {
  
  
  // const session = await getServerSession(authOptions);
  // if(mangas.length === 0) {throw new Error("Something went wrong!");}
  return (
   <main className="flex flex-col bg-[#1f1f1f] min-h-screen overflow-hidden pb-10">
    {/* Content */}
    <div className="flex-1 w-full mt-10 mb-10 px-4 lg:px-0">
      {/* Carousel Banner */}
      <div className="max-w-[1400px] max-h-[400px] w-[100%] lg:pl-[20px] lg:pr-[20px] lg:max-w-[1225px] lg:ml-auto lg:mr-auto mb-10 lg:mb-[5rem] lg:mt-[5rem]">
        <Carousel opts={{
          align: "start",
          loop: true,
        }}>
          <CarouselContent>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner1.jpg" width={1100} height={450} loading="eager" alt="Manga Cover"/></CarouselItem>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner2.jpg" width={1100} height={450} loading="eager" alt="Manga Cover"/></CarouselItem>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner3.jpg" width={1100} height={450} loading="eager" alt="Manga Cover"/></CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
        
      {/* Latest Updates and Trending */}
      <div className="flex flex-col lg:flex-row max-w-[1400px] justify-around ml-auto mr-auto lg:pl-[20px] lg:pr-[20px] text-white">
        <Suspense fallback={<LoadingCardManga />}>
          <CardManga/>
        </Suspense>       
          {/* Most Viewed */}
        <Suspense fallback={<LoadingCardMangaMostView />}>
          <CardMangaMostViewed/>
        </Suspense>
      </div>
    </div>
   </main>
  );
}

