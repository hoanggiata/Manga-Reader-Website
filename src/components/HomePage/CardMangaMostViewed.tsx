import { fetchMostViewed, slideTitle } from "@/utils/utils";
import Link from "next/link";
import Image from "next/image";
export default async function CardMangaMostViewed() {
    const {mangaMostView,coverArtsMostView,allChaptersMostView} = await fetchMostViewed();
    return (
        <div className="w-full lg:w-[calc(33.33%-20px)] lg:float-right">
            <div className="w-full h-auto font-bold lg:text-xl text-sm">
              <h3 className="p-5 text-lg">Most Viewed</h3>
              <div className="ml-4 text-lg">
                <ul className="p-0 m-0 list-none">
                  {mangaMostView.data.map((manga,index) => (
                    <li key={manga.id} className="relative mb-[25px]">
                    <div className={`float-right relative top-4 p-3 min-w-[47px] text-center bg-[#2f2f2f] ${index <3 ? `text-[#FFD700]` : `text-white` } `}><span>{index === 9 ? "10": `0${index + 1}`}</span></div>
                    {coverArtsMostView[index].map(cover => {
                      return (
                        <Link key={manga.id} className="block w-[60px] " href="#" prefetch={true}><Image src={cover} alt="Manga Cover" width={100} height={0}/></Link>
                      )
                    })}            
                    <div className="absolute top-0 left-[4.8rem] w-[calc(100%-150px)]">
                      <Link href={`/detailpage/${manga.id}`} className="block mb-2 text-[15px] font-[600] hover:text-[#FFD700]" prefetch={true}><p className="truncate">{slideTitle(manga,true)}</p></Link>
                      <div className="text-gray-400 text-sm font-light block min-w-max text-[0.9rem] ">
                        <span className="">
                          {manga.attributes.tags.slice(0,2).map((tag) => (
                            <Link className="hover:text-[#FFD700]" key={tag.id} href="#">{tag.attributes.name.en}, </Link>
                          ))}
                        </span>
                       
                        <div className="mt-2">
                          {
                            allChaptersMostView[index] ? (
                              <span key={allChaptersMostView[index][0].id} className="text-[#FFD700]"><Link href={`/detailchapter/${manga.id}/${allChaptersMostView[index][0].id}`}>Chap {allChaptersMostView[index][0].chapter}</Link></span>
                            ) : <p>No English Chapters Found</p>
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
    );
}