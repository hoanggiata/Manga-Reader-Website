"use client"
import Link from "next/link";
export default function LoadingCardMangaMostView()
{
    return(
            <div className="w-full lg:w-[calc(33.33%-20px)] lg:float-right">
                <div className="w-full h-auto font-bold lg:text-xl text-sm">
                    <h3 className="p-5 text-lg">Most Viewed</h3>
                    <div className="ml-4 text-lg">
                    <ul className="p-0 m-0 list-none">
                        {[...Array(10)].map((_, index) => (
                        <li key={index} className="relative mb-[25px] animate-pulse">
                            <div className={`float-right relative top-4 p-3 min-w-[47px] text-center bg-[#2f2f2f] ${index < 3 ? `text-[#FFD700]` : `text-white`}`}>
                            <span>{index === 9 ? "10" : `0${index + 1}`}</span>
                            </div>
                            <div className="block w-[60px] bg-gray-700 h-[90px]"></div>
                            <div className="absolute top-0 left-[4.8rem] w-[calc(100%-150px)]">
                            <div className="block mb-2 text-[15px] font-[600] bg-gray-700 h-6"></div>
                            <div className="text-gray-400 text-sm font-light block min-w-max text-[0.9rem]">
                                <span className="bg-gray-700 h-4 w-1/2 inline-block"></span>
                                <div className="mt-2">
                                <span className="bg-gray-700 h-4 w-1/4 inline-block"></span>
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