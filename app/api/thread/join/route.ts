import getCurrentUser from "@/components/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import type { Thread } from "@prisma/client";

export async function POST(request: Request): Promise<NextResponse | NextResponse<Thread>> {
    const body = await request.json();
    const {
        threadId,
    } = body;

    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ error: "Not authenticated" });
    }

    const update = await prisma.user.update({
        where: {
            id: user?.id,
        },
        data: {
            joinedThreads: {
                connect: {
                    id: threadId,
                }
            }
        }
    })

    return NextResponse.json(update);
}