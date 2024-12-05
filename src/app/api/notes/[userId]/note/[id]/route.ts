import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

const getUserId = (pathname: string): string | null => {
  const userIdMatch = pathname.match(/^\/api\/notes\/([a-f\d]{24})\/note\/[a-f\d]{24}$/);

  return userIdMatch ? userIdMatch[1] : null;
}

const getNoteId = (pathname: string): string | null => {
  const noteIdMatch = pathname.match(/^\/api\/notes\/[a-f\d]{24}\/note\/([a-f\d]{24})$/);

  return noteIdMatch ? noteIdMatch[1] : null;
}

export async function GET(req:NextRequest) {
  try {
    const userId = getUserId(req.nextUrl.pathname);
    const noteId = getNoteId(req.nextUrl.pathname);
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId missing" }), { status: 404 });
    }
    if (!noteId) {
      return new Response(JSON.stringify({ error: "noteId missing" }), { status: 404 });
    }
    const data = await prisma.excalidrawNote.findFirst({
      where: {
        id: noteId,
      },
    });
    
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return new Response(JSON.stringify({ error: "Failed to get data" }), { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = getUserId(req.nextUrl.pathname);
    const noteId = getNoteId(req.nextUrl.pathname);
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId missing" }), { status: 404 });
    }
    if (!noteId) {
      return new Response(JSON.stringify({ error: "noteId missing" }), { status: 404 });
    }
    // TODO check if this note belongs to user
    const body = await req.json();
    await prisma.excalidrawNote.update({
      where: {
        id: noteId,
      },
      data: {
        ...body
      },
    });
    return new Response(JSON.stringify({ data: "Success" }), { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return new Response(JSON.stringify({ error: "Failed to update data" }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getUserId(req.nextUrl.pathname);
    const noteId = getNoteId(req.nextUrl.pathname);

    if (!userId || !noteId) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }

    // TODO: Check if the note belongs to the user

    await prisma.excalidrawNote.delete({
      where: {
        id: noteId,
      },
    });

    return new Response(JSON.stringify({ message: "Note deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return new Response(JSON.stringify({ error: "Failed to delete note" }), { status: 500 });
  }
}
