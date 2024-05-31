import { connectMongoDB } from "@/lib/mongodb";
import UserChapter from "@/models/userchapter";
import { NextResponse } from "next/server";

export async function POST(req)
{
    try {
        await connectMongoDB();
        const {email,mangaId} = await req.json();
        const allChapterRedRes = await UserChapter.find({email,mangaId}).select("chapterId");
        return NextResponse.json((allChapterRedRes),{status:200});
    } catch (error) {
        return NextResponse.json({message: "An error occured while fetching all the read chapter"},{status:500});
    }
}