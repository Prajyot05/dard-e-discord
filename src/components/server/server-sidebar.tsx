import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}
const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
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

  if (!server) {
    return redirect("/");
  }

  // const textChannels = server.channels.filter(
  //   (channel) => channel.type === ChannelType.TEXT
  // );
  // const audioChannels = server.channels.filter(
  //   (channel) => channel.type === ChannelType.AUDIO
  // );
  // const videoChannels = server.channels.filter(
  //   (channel) => channel.type === ChannelType.VIDEO
  // );
  // const members = server.members.filter(
  //   (member) => member.profileId !== profile.id
  // );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#121214] bg-[#f2f3f5] border-l border-neutral-200 dark:border-neutral-800 rounded-l-[12px]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
