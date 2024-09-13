import { connectMongoDB } from "@/lib/mongodb";
import UserChapter from "@/models/userchapter";
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    try {
        await connectMongoDB();
        const {email,mangaId} = await req.json();
        if(!email || !mangaId)
        {
            return NextResponse.json([]);
        }
        const allChapterRedRes = await UserChapter.find({email,mangaId}).select("chapterId");
        if(allChapterRedRes !== null)
        {
            return NextResponse.json((allChapterRedRes),{status:200});
        }
        else
        {
            return NextResponse.json([],{status:409});
        }
    } catch (error) {
        return NextResponse.json({message: "An error occured while fetching all the read chapter"});
    }
}