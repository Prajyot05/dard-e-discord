import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{ inviteCode: string }>;
}

export default async function InviteCodePage({ params }: InviteCodePageProps) {
  const profile = await currentProfile();
  if (!profile) return <RedirectToSignIn />;
  if (!(await params).inviteCode) redirect("/");
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: (await params).inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const server = await db.server.update({
    where: {
      inviteCode: (await params).inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return redirect("/");
}
