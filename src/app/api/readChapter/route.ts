import { connectMongoDB } from "@/lib/mongodb";
import UserChapter from "@/models/userchapter";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request)
{
    try {
        await connectMongoDB();
        const {mangaId,chapterId,email} = await req.json();
        const userChapterRes = await UserChapter.findOne({email,chapterId});
        if(userChapterRes || !email)
        {
            return NextResponse.json({ message: "Chapter already exists for this user" }, { status: 409 });
        }
        else{
            await UserChapter.create({mangaId,chapterId,email});
            return NextResponse.json({message: "Chapter added to user email: ",email},{status:201});            
        }
              
    } catch (error) {
        return NextResponse.json({message: "An error occured while adding the chapter"},{status:500});
    }
}