import { connectMongoDB } from "@/lib/mongodb";
import FollowManga from "@/models/followManga";
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    try {
        await connectMongoDB();
        const email = await req.json();
        if(!email) return NextResponse.json({message: "Email is required"},{status:400});
        const respond = await FollowManga.find({email});
        const mangaIDs = respond.map((manga) => manga.mangaId);
        if(mangaIDs !== null)
        {
            return NextResponse.json(mangaIDs,{status:200});
            // return NextResponse.json({ message: "User already followed this manga" }, { status: 409 });
        }
        else
        {
            return NextResponse.json({message: "You have not followed any manga "},{status:409});
        }
    } catch (error) {
        return NextResponse.json({message: "An error occured while querying database"},{status:500});
    }
}