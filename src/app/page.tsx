import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
export default function Home() {
  return (
   <main className="bg-[#1f1f1f] h-screen">

    <header className="w-full h-20 flex bg-[#2f2f2f] justify-between items-center pl-10 pr-10">
      {/* <Image src="/images/logo-website4.jpg" className="w-[100px]" alt="Logo Website" width={60} height={30} /> */}
      <Link href="/" className="text-[#FFD700] text-2xl font-bold">AE MANGA</Link>
      <div className="flex items-center">
        <Input className="bg-white relative pl-16 h-[45px]" placeholder="Search your manga here"/>
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-[153px]" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg> */}
        <Button className="w-[40px] h-[30px] text-xs text-[#000000] bg-[#FFD700] hover:bg-[#FFEC8B] absolute ml-3" variant="default">Filter</Button>

        <span className="text-[#FFD700] ml-10 font-bold text-base">Member</span>
      </div>
    </header>
    <div className="flex w-full h-[50vh]">

    </div>
    <footer className="w-full h-max text-center text-[#D3D3D3]">
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
   </main>
  );
}
