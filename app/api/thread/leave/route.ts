import getCurrentUser from "@/components/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
    const body = await request.json();
    const {
        threadId,
    } = body;

    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json("Not authenticated.")
    }

    const update = await prisma.user.update({
        where: {
            id: user?.id,
        },
        data: {
            joinedThreads: {
                disconnect: {
                    id: threadId,
                }
            }
        }
    })
    return NextResponse.json(update);
}