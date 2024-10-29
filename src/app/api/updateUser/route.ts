import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req: Request)
{
    try {
        await connectMongoDB();
        const {name,newPassword} = await req.json();
        // if(!email) return NextResponse.json({message: "Email is required"},{status:400});

        if(boolean) //Condition : True => User has already followed the manga
        {        
            const followMangaRes = await FollowManga.findOneAndDelete({email,mangaId});
            if(followMangaRes !== null)
            {
                return NextResponse.json({ message: "Cancelled following manga" }, { status: 201 });
            }
            return NextResponse.json({message: "User have not followed this manga "},{status:409});
        }
        else // Condition : false =>  User has not followed the manga 
        {
            try {
                console.log("Type of email:",typeof email);
                await FollowManga.create({email: email,mangaId: mangaId});
                return NextResponse.json({ message: "Succeeded following manga" }, { status: 201 });
            } catch (error) {
                return NextResponse.json({message: "An error occured while adding manga to follow : ",error},{status:500});
            }            
        }
    } catch (error) {
        return NextResponse.json({message: "An error occured while querying database: ",error},{status:500});
    }
}