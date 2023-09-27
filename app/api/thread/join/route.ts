import getCurrentUser from "@/components/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        threadId,
    } = body;

    const user = await getCurrentUser()

    if (!user) {
        return new Error("Not authenticated")
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

    return NextResponse.json({update});
}