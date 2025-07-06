import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ serverId: string }>;
  }
) {
  try {
    const profile = await currentProfile();
    const params = await context.params;

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.serverId)
      return new NextResponse("Missing Server ID", { status: 400 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: { not: profile.id }, // Admin cannot leave the server
        members: { some: { profileId: profile.id } },
      },
      data: { members: { deleteMany: { profileId: profile.id } } },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID_DELETE]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
