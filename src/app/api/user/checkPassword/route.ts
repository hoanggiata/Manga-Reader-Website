import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    try {
        await connectMongoDB();
        const {currentPassword,email} = await req.json();
        if(!email) return NextResponse.json({message: "Email is required"},{status:400});
        const userPassword = await User.findOne({email}).select("password");
        if(userPassword !== null)
        {

            if(userPassword.password === `undefined`)
            {
                return NextResponse.json({message: "Password is correct"},{status:200})
            }
            const isMatch = await bcrypt.compare(currentPassword,userPassword.password);
            if(isMatch) return NextResponse.json({message: "Password is correct"},{status:200});
            else return NextResponse.json({message: "Password is incorrect"},{status:400});
        }
    } catch (error) {
        return NextResponse.json({message: "An error occured while querying database: ",error},{status:500});
    }
}