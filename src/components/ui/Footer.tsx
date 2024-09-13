import * as React from "react";
import Link from "next/link";
export default function Footer()
{
    return(
    <footer className="w-full h-max text-center text-[#D3D3D3] relative bottom-0 left-0 right-0 overflow-hidden bg-[#1f1f1f]">
      <Link href="/" className="text-[#FFD700] text-2xl font-bold">AE MANGA</Link>
      <div className="opacity-60 mt-3 mb-3 text-sm">
        AE Manga does not store any files on our server, we only linked to the media which is hosted on 3rd party services
      </div>
      <p className="opacity-60 mb-3 text-sm">&copy; aemanga.com</p>
    </footer>
    );
}