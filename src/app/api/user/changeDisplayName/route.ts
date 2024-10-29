import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    try {
        await connectMongoDB();
        const {email,displayName} = await req.json();
        if(!email) return NextResponse.json({message: "Email is required"},{status:400});

        const userDisplayName = await User.findOne({email}).select("name");
        if(userDisplayName !== null)
        {
            await User.findOneAndUpdate({email},{name:displayName});
            return NextResponse.json({message: "Display name changed"},{status:200});
        }
        return NextResponse.json({message: "User not found"},{status:404});
    } catch (error) {
        return NextResponse.json({message: "An error occured while querying database: ",error},{status:500});
    }
}