import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';



export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession();
        console.log("***SESSION***", session);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse the request body
        const body = await req.json();
        const { doubtId, content } = body;

        // Validate the required fields
        if (!doubtId || !content) {
            return NextResponse.json(
                { error: "Both doubtId and content are required." },
                { status: 400 }
            );
        }

        // Create the new answer
        const newAnswer = await prisma.answer.create({
            data: {
                doubtId,
                userId: session.user.id,
                content,
            },
        });

        return NextResponse.json(
            { message: "Answer posted successfully.", answer: newAnswer },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error posting answer: ", error);
        return NextResponse.json(
            { error: "Failed to post answer.", details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}


