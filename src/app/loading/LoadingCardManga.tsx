"use client"
import Link from "next/link";
export default function LoadingCardManga()
{
    return(
        <>
            <div className="font-bold w-full lg:w-[58%] mb-10 lg:mb-0">
                <h3 className="p-5 text-lg">Latest Updates</h3>
                <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 w-full">
                    {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-full md:w-[100%] lg:w-full rounded-[0.75rem] md:bg-[#2f2f2f] p-4 lg:ml-[7px] lg:mr-[7px] md:mb-[20px] relative animate-pulse">
                        <div className="absolute top-4 left-4 md:w-[140px] w-[80px] md:h-[200px] h-[120px] bg-gray-700"></div>
                        <div className="w-[calc(100%-95px)] md:w-[calc(100%-160px)] float-right md:h-[200px] min-h-[120px] relative">
                        <div className="text-[17px] font-semibold w-full bg-gray-700 h-6 mb-2"></div>
                        <div className="block mb-[20px] md:mt-[10px] lg:mt-0 text-[13px]">
                            <span className="text-gray-400 text-[12px] lg:text-sm font-light bg-gray-700 h-4 w-1/2 inline-block"></span>
                        </div>
                        <div className="absolute left-0 right-0 bottom-0 pr-[10px] font-medium text-[13.6px] text-[#FFD700]">
                            <div className="pt-[10px] border-b border-dashed border-gray-600 bg-gray-700 h-4 mb-2"></div>
                            <div className="pt-[10px] border-b border-dashed border-gray-600 bg-gray-700 h-4 mb-2"></div>
                            <div className="pt-[10px] border-b border-dashed border-gray-600 bg-gray-700 h-4 mb-2 hidden md:block"></div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
        
    );
}