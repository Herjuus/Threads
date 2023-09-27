import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export default async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        title,
        description,
    } = body;

    const user = await getCurrentUser()

    if (!user) {
        return new Error("Not authenticated")
    }

    const thread = await prisma.thread.create({
        data: {
            title,
            description,
            members: {
                connect: [{ username: user?.username }]
            }
        }
    });

    return NextResponse.json(thread);
}