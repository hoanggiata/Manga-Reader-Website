import { connectMongoDB } from "@/lib/mongodb";
import FollowManga from "@/models/followManga";
import UserChapter from "@/models/userchapter";
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    try {
        await connectMongoDB();
        const {mangaId,email} = await req.json();
        if(!email) return NextResponse.json({message: "Email is required"},{status:400});
        const followMangaRes = await FollowManga.findOne({email,mangaId});
        if(followMangaRes !== null)
        {
            return NextResponse.json({ message: "User already followed this manga" }, { status: 409 });
        }
        else
        {
            return NextResponse.json({message: "User have not followed this manga "},{status:201});
        }
    } catch (error) {
        return NextResponse.json({message: "An error occured while querying database"},{status:500});
    }
}