import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
        title,
        content,
        threadID,
        imgurl,
    } = body;

    const user = await getCurrentUser()

    if (!user) {
        return new Error("Not authenticated");
    }

    const slug = await title.split(' ').join('_').toLowerCase();

    const post = await prisma.post.create({
        data: {
            title,
            content,
            slug,
            threadId: threadID,
            authorId: user.id,
            imgurl,
        },
    });

    return NextResponse.json(post);
}