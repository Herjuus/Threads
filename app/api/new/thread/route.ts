import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        title,
        description,
        user,
    } = body;

    const thread = await prisma.thread.create({
        data: {
            title,
            description,
            members: {
                connect: [{ username: user.username }]
            }
        }
    });

    return NextResponse.json(thread);
}