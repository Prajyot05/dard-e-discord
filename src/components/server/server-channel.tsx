"use client";

import { Channel, ChannelType, MemberRole, Server } from "@/generated/prisma";
import { ModalType, useModal } from "@/hooks/user-modal-store";
import { cn } from "@/lib/utils";
import { Edit, Hash, Lock, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../ActionToolTip";
import VoiceChannelIcon from "../icons/voice-channel-icon";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: (
    <Hash className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
  [ChannelType.AUDIO]: (
    <VoiceChannelIcon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
  [ChannelType.VIDEO]: (
    <Video className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const icon = iconMap[channel.type];

  const onClick = () =>
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation(); // So that the parent's onClick does not get activated when clicking on it's child components

    onOpen(action, { channel, server });
  };

  return (
    <button
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
      onClick={onClick}
    >
      {icon}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => onAction(e, "editChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, "deleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};

export default ServerChannel;
