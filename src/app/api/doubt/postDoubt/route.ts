import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const session = await getAuthSession();
        console.log("***SESSION***", session);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const doubts = await prisma.doubt.findMany({
            orderBy: {
                createdAt: 'desc', 
            },
        });

        return NextResponse.json({ doubts }, { status: 200 });
    
    } catch (error) {
        console.error("Error fetching doubts: ", error);
        return NextResponse.json(
            { error: "Failed to fetch doubts.", details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession();
        console.log("***SESSION***", session);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { chapterId, question, description, isOwner } = body;

        if (!question || !description) {
            return NextResponse.json({ error: "Question and description are required." }, { status: 400 });
        }

        const newDoubt = await prisma.doubt.create({
            data: {
                userId: session.user.id,
                chapterId: chapterId || null,
                question,
                description,
                isOwner: !!isOwner,
            },
        });

        return NextResponse.json({ message: "Doubt created successfully.", doubt: newDoubt }, { status: 201 });
    } catch (error) {
        console.error("Error creating doubt: ", error);
        return NextResponse.json(
            { error: "Failed to create doubt.", details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}
