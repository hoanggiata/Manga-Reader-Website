'use client'
import { useRouter } from 'next/navigation'
export default function Error({error}: {error: Error}) {
    const router = useRouter();
    const handleGoBack = () =>{
        router.replace("/");
    }
    return(
        <main className="w-full min-h-screen bg-[#1f1f1f] flex justify-center items-center flex-col">
            <h2 className="text-center text-white text-lg">{error.message}</h2>
            <button
                className="mt-4 rounded-md bg-[#FFD700] px-4 py-2 text-sm transition-colors hover:bg-[#F0AD4E] text-[#1f1f1f]"
                onClick={handleGoBack}>
                Go Back To Home Page
            </button>
        </main>
    );
}