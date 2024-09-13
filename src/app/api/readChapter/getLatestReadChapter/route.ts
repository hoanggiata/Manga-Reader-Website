import { connectMongoDB } from "@/lib/mongodb";
import UserChapter from "@/models/userchapter";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request)
{
    try {
        await connectMongoDB();
        const {mangaId,email} = await req.json();
        if(!email || !mangaId){return NextResponse.json({message: "Email or MangaId is required"},{status:400});}
        const chapterReadRes = await UserChapter.findOne({email,mangaId}).sort({ createdAt: -1 }).select("chapterId");
        if(chapterReadRes !== null)
        {
            return NextResponse.json((chapterReadRes),{status:200});
        }
        else{
            return NextResponse.json({message: "No chapter read yet"},{status:404});         
        }
              
    } catch (error) {
        return NextResponse.json({message: "An error occured while querying the latest chapter"},{status:500});
    }
}