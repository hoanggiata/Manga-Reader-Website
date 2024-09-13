import { NextResponse } from "next/server";
import { fetchLatestChapterManga, fetchCoverMangas } from "@/utils/utils";
export async function POST(req: Request)
{
    const {value} = await req.json();
    try {     
        const respond = await fetch(`https://api.mangadex.org/manga?title=${value}&availableTranslatedLanguage[]=en&limit=4`);
        if(!respond.ok)
        {
            return NextResponse.json({mangas:[],allChapters:[],coverArts:[]});
        }
        const result = await respond.json();
        const mangas = result.data;
        const promises = mangas.map(manga => fetchLatestChapterManga(manga.id));
        const allChapters = await Promise.all(promises);
        const promisesTwo = mangas.map(manga => fetchCoverMangas(manga.id));
        const coverArts = await Promise.all(promisesTwo);
        return NextResponse.json({mangas,allChapters,coverArts});
    } catch (error) {
        console.error("Failed to fetch search manga: ",error);
    }
}