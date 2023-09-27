import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<void | NextResponse<any>> {
    const body = await request.json();
    const {
        title,
        description,
    } = body;

    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ error: "Not authenticated" });
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