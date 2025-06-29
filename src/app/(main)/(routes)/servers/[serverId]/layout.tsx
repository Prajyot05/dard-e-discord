import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}

const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
  const profile = await currentProfile();
  if (!profile) return <RedirectToSignIn />;

  const { serverId } = await params;

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="pt-8 hidden md:flex h-full w-[303px] z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      {/* 303px + 24px padding */}
      <main className="h-full md:pl-[327px] px-6 py-[13px]">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
