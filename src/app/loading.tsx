"use client"
import Link from "next/link";
import { LineWave } from "react-loader-spinner";
export default function Loading()
{
    return(
        <>
            <div className="w-full h-screen bg-[#1f1f1f] flex justify-center items-center">
                <Link href="#" className="px-3 py-3 w-full flex justify-center">
                    <LineWave
                    visible={true}
                    height="100"
                    width="100"
                    color="#FFD700"
                    ariaLabel="line-wave-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                    />
                </Link>    
            </div>              
        </>
        
    );
}