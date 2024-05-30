import * as React from "react";
import Link from "next/link";
export default function Footer()
{
    return(
    <footer className="w-full h-max text-center text-[#D3D3D3] relative bottom-0 left-0 right-0 overflow-hidden">
      <Link href="/" className="text-[#FFD700] text-2xl font-bold mb-3">AE MANGA</Link>
      <ul className=" flex justify-center items-center mb-3">
        <li className="my-[10px] mx-[20px] w-max">Terms of service</li>
        <li className="my-[10px] mx-[20px] w-max">DMCA</li>
        <li className="my-[10px] mx-[20px] w-max">Contact</li>
        <li className="my-[10px] mx-[20px] w-max">About us</li>
      </ul>
      <div className="opacity-60 mb-3">
        AE Manga does not store any files on our server, we only linked to the media which is hosted on 3rd party services
      </div>
      <p className="opacity-60 mb-3">&copy; aemanga.com</p>
    </footer>
    );
}