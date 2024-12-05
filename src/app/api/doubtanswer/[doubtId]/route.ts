import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';


export async function GET(req: NextRequest, { params }: { params: { doubtId: string } }) {
    try {
        const { doubtId } = params;
        if (!doubtId) {
            return NextResponse.json({ error: "Doubt ID is required." }, { status: 400 });
        }

        const answers = await prisma.answer.findMany({
            where: {
                doubtId: doubtId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: { select: { id: true, name: true } },
            },
        });

        return NextResponse.json({ answers }, { status: 200 });
    } catch (error) {
        console.error("Error fetching answers: ", error);
        return NextResponse.json(
            { error: "Failed to fetch answers.", details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}
