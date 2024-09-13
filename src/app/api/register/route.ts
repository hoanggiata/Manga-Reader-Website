import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
export async function POST(req: Request)
{
    try {
        const {name,email,password} = await req.json();
        const hashPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({name,email,password:hashPassword,type:"credentials"});

        return NextResponse.json({message: "User created"},{status:201}); 
    } catch (error) {
        return NextResponse.json({message: "An error occured while creating the user"},{status:500});
    }
}