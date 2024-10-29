import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    try {
        await connectMongoDB();

        const {email,newPassword} = await req.json();
        if(!newPassword) return NextResponse.json({message: "New password is required"},{status:400});

        if(!email) return NextResponse.json({message: "Email is required"},{status:400});

        const hashPassword = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({email},{password:hashPassword});

        return NextResponse.json({message: "Password changed"},{status:200});
    } catch (error) {
        
        return NextResponse.json({message: "An error occured while querying database: ",error},{status:500});
    }
}