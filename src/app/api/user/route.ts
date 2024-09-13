import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
export async function POST(res: Request) {
    const {name,email} = await res.json();
    await connectMongoDB();
    await User.create({name,email,type:"google"});
    return NextResponse.json({message: "User created"},{status:201});
}