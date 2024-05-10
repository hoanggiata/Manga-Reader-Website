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


export default function Home() {
  return (
   <main className="bg-[#1f1f1f] h-[200vh] relative">

    <Header/>
    {/* Content */}
    <div className="w-full h-[100vh] mt-10 mb-10">
      {/* Carousel Banner */}
      <div className="max-w-[1400px] max-h-[400px] w-[100%] lg:pl-[20px] lg:pr-[20px] lg:max-w-[1225px] lg:ml-auto lg:mr-auto mb-[5rem] mt-[5rem]">
        <Carousel className="">
          <CarouselContent>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner1.jpg" width={1100} height={450} objectFit="contain" alt="Manga Cover"/></CarouselItem>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner2.jpg" width={1100} height={450} objectFit="contain" alt="Manga Cover"/></CarouselItem>
            <CarouselItem><Image className="lg:w-[1200px] lg:h-[400px]" src="/images/banner3.jpg" width={1100} height={450} objectFit="contain" alt="Manga Cover"/></CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
        
      {/* Latest Updates and Trending */}
      <div className="flex max-w-[1400px] h-[100vh] justify-around ml-auto mr-auto pl-[30px] pr-[30px] lg:pl-[20px] lg:pr-[20px] text-white">       
          <div className="font-bold lg:text-xl text-sm">
            <h3 className="p-5">Latest Updates</h3>
            <div style={{gridTemplateColumns: "repeat(2,400px)",gridAutoRows:"270px"}} className="grid gap-[10px] md:grid-cols-1">

              <div className="relative p-4 lg:m-3  lg:bg-[#2f2f2f] border-0 rounded-lg ">
                <Link href="#" className="w-[140px] absolute mt-2">
                  <Image className="w-full h-full" src="/images/DemoCover.png" width={500} height={0} objectFit="contain" alt="Manga Cover"/>
                </Link>
                <div className="w-[50%] relative lg:text-sm float-right min-h-[200px] mt-2 ">
                  <h3 className="mb-[10px] text-xl">This is Manga Title</h3>
                  <div className="mb-[10px] font-light">
                    <Link href="#">Action,</Link>
                    <Link href="#">Drama,</Link>
                    <Link href="#">Fantasy</Link>
                  </div>
                  <div className="block absolute bottom-0 left-0 right-0 text-[#FFD700]">
                    <div className="pt-[10px] pb-[10px] ">
                      <Link href="#">Chap 86</Link>
                    </div>              
                    <div className="pt-[10px] pb-[10px]">
                      <Link href="#">Chap 86</Link>
                    </div>
                    <div className="pt-[10px]">
                      <Link href="#">Chap 86</Link>
                    </div>
                  </div>
                </div>
              </div>
              

              <div className="relative p-4 lg:m-3  lg:bg-[#2f2f2f] border-0 rounded-lg ">
                <Link href="#" className="w-[140px] absolute mt-2">
                  <Image className="w-full h-full" src="/images/DemoCover.png" width={500} height={0} objectFit="contain" alt="Manga Cover"/>
                </Link>
                <div className="w-[50%] relative lg:text-sm float-right min-h-[200px] mt-2 ">
                  <h3 className="mb-[10px] text-xl">This is Manga Title</h3>
                  <div className="mb-[10px] font-light">
                    <Link href="#">Action,</Link>
                    <Link href="#">Drama,</Link>
                    <Link href="#">Fantasy</Link>
                  </div>
                  <div className="block absolute bottom-0 left-0 right-0 text-[#FFD700]">
                    <div className="pt-[10px] pb-[10px] ">
                      <Link href="#">Chap 86</Link>
                    </div>              
                    <div className="pt-[10px] pb-[10px]">
                      <Link href="#">Chap 86</Link>
                    </div>
                    <div className="pt-[10px]">
                      <Link href="#">Chap 86</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative p-4 lg:m-3  lg:bg-[#2f2f2f] border-0 rounded-lg ">
                <Link href="#" className="w-[140px] absolute mt-2">
                  <Image className="w-full h-full" src="/images/DemoCover.png" width={500} height={0} objectFit="contain" alt="Manga Cover"/>
                </Link>
                <div className="w-[50%] relative lg:text-sm float-right min-h-[200px] mt-2 ">
                  <h3 className="mb-[10px] text-xl">This is Manga Title</h3>
                  <div className="mb-[10px] font-light">
                    <Link href="#">Action,</Link>
                    <Link href="#">Drama,</Link>
                    <Link href="#">Fantasy</Link>
                  </div>
                  <div className="block absolute bottom-0 left-0 right-0 text-[#FFD700]">
                    <div className="pt-[10px] pb-[10px] ">
                      <Link href="#">Chap 86</Link>
                    </div>              
                    <div className="pt-[10px] pb-[10px]">
                      <Link href="#">Chap 86</Link>
                    </div>
                    <div className="pt-[10px]">
                      <Link href="#">Chap 86</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative p-4 lg:m-3  lg:bg-[#2f2f2f] border-0 rounded-lg ">
                <Link href="#" className="w-[140px] absolute mt-2">
                  <Image className="w-full h-full" src="/images/DemoCover.png" width={500} height={0} objectFit="contain" alt="Manga Cover"/>
                </Link>
                <div className="w-[50%] relative lg:text-sm float-right min-h-[200px] mt-2 ">
                  <h3 className="mb-[10px] text-xl">This is Manga Title</h3>
                  <div className="mb-[10px] font-light">
                    <Link href="#">Action,</Link>
                    <Link href="#">Drama,</Link>
                    <Link href="#">Fantasy</Link>
                  </div>
                  <div className="block absolute bottom-0 left-0 right-0 text-[#FFD700]">
                    <div className="pt-[10px] pb-[10px] ">
                      <Link href="#">Chap 86</Link>
                    </div>              
                    <div className="pt-[10px] pb-[10px]">
                      <Link href="#">Chap 86</Link>
                    </div>
                    <div className="pt-[10px]">
                      <Link href="#">Chap 86</Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div style={{width: "calc(33.33% - 20px)"}} className="float-right">
            <div className="w-full h-[50vh] font-bold lg:text-xl text-sm">
              <h3 className="p-5">Most Viewed</h3>
              <div className="lg:text-lg font-light ml-4 mb-[20px]">
                <ul className="flex justify-between bg-[#2f2f2f] text-center">
                  <li className="basis-[7.75rem] p-3 bg-[#FFD700] text-[#000000] hover:text-opacity-50"><Link href="#">Today</Link></li>
                  <li className="basis-[7.75rem] p-3 hover:text-[#FFD700]"><Link href="#">Week</Link></li>
                  <li className="basis-[7.75rem] p-3 hover:text-[#FFD700]"><Link href="#">Month</Link></li>
                </ul>
              </div>
              <div className="ml-4 text-lg">
                <ul className="p-0 m-0 list-none">                 
                  <li className="relative mb-[25px]">
                    <div className="float-right p-3 lg:w-[47px] bg-[#2f2f2f] text-[#FFD700]"><span>01</span></div>
                    <Link className="block w-[60px] " href="#"><Image src="/images/DemoCover.png" alt="Manga Cover" width={100} height={0} objectFit="contain"/></Link>
                    <div className="absolute top-0 left-[4.8rem]">
                      <h3 className="max-w-max font-[600] mb-[5px]">Manga Title</h3>
                      <div className="text-base font-light block min-w-max text-[0.9rem]">
                        <span className="">
                          <Link href="#">Action, </Link>
                          <Link href="#">Demons</Link>
                        </span>
                       
                        <div className="">
                          <span className="text-[#FFD700]"><Link href="#">Chap 258</Link></span>
                        </div>
                      </div>
                    </div>
                    <span className="absolute right-0 bottom-0 text-[0.83rem] leading-[20px] h-[20px] pl-[6px] pr-[6px] text-[#aaa] font-light border rounded-[4px] border-[#2f2f2f]">4000 views</span>
                  </li>
                  <li className="relative mb-[30px]">
                    <div className="float-right lg:w-[47px] p-3 bg-[#2f2f2f] text-[#FFD700]"><span>02</span></div>
                    <Link className="block w-[60px] " href="#"><Image src="/images/DemoCover.png" alt="Manga Cover" width={100} height={0} objectFit="contain"/></Link>
                    <div className="absolute top-0 left-[4.8rem]">
                      <h3 className="max-w-max font-[600] mb-[5px]">Manga Title</h3>
                      <div className="text-base font-light block min-w-max text-[0.9rem]">
                        <span className="">
                          <Link href="#">Action, </Link>
                          <Link href="#">Demons</Link>
                        </span>
                       
                        <div className="">
                          <span className="text-[#FFD700]"><Link href="#">Chap 258</Link></span>
                        </div>
                      </div>
                    </div>
                    <span className="absolute right-0 bottom-0 text-[0.83rem] leading-[20px] h-[20px] pl-[6px] pr-[6px] text-[#aaa] font-light border rounded-[4px] border-[#2f2f2f]">4000 views</span>
                  </li>
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

