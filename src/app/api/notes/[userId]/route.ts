import { prisma } from "@/lib/db";
import { type NextRequest } from 'next/server'

const getUserId = (pathname: string): string | null => {
  const userIdMatch = pathname.match(/^\/api\/notes\/([a-f\d]{24})$/);
  
  return userIdMatch ? userIdMatch[1] : null;
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req.nextUrl.pathname);
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId missing" }), { status: 404 });
    }
    // TODO check user exists

    const body = await req.json();
    const elements = body.elements || [];
    const appState = body.appState || { viewBackgroundColor: "#ffffff" };
    const newData = await prisma.excalidrawNote.create({
      data: {
        elements,
        appState,
        userId,
        name: "Untitled"
      }
    })
    return new Response(JSON.stringify({ id: newData.id }), { status: 201 })
  } catch (error) {
    console.error("Error creating data:", error);
    return new Response(JSON.stringify({ error: "Failed to create data" }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req.nextUrl.pathname);
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId missing" }), { status: 404 });
    }
    const data = await prisma.excalidrawNote.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }

}