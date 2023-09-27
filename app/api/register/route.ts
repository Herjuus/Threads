import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
    try {
        const body = await request.json();
        const {
            email,
            username,
            password
        } = body;
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const data = await prisma.user.create({
            data: {
                email,
                username,
                hashedPassword,
                description: "Welcome to my profile."
            }
        })
        return NextResponse.json({data});
    } catch {
        return NextResponse.json("Request failed.")
    }
    
}