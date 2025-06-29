import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ memberId: string }> }
) {
  try {
    const params = await context.params;
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Missing Server ID", { status: 400 });

    if (!params.memberId)
      return new NextResponse("Missing Member ID", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id, // Cannot modify your own role
              },
            },
            data: { role },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[MEMBER_ID_DELETE]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ memberId: string }> }
) {
  try {
    const { searchParams } = new URL(req.url);
    const params = await context.params;

    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Missing Server ID", { status: 400 });

    if (!params.memberId)
      return new NextResponse("Missing Member ID", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id, // No one can kick themselves out
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[MEMBER_ID_DELETE]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
