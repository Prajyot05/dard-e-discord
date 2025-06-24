"use client";

import { MemberRole } from "@/generated/prisma";
import { ServerWithMembersWithProfiles } from "@/types/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Trash, Users, X } from "lucide-react";
import { useState } from "react";
import InviteIcon from "../icons/invite-icon";
import PlusIcon from "../icons/plus-icon";
import LeaveServerIcon from "../icons/leave-server-icon";
import ServerSettingsIcon from "../icons/server-settings-icon";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-accent-foreground text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition group">
          {server.name}
          {isOpen ? (
            <X className="h-4 w-4 ml-auto text-accent-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-auto text-accent-foreground" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-semibold text-black dark:text-neutral-400 dark:bg-[#28282d] space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            // onClick={() => onOpen("invite", { server })}
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer group"
          >
            Invite People
            <InviteIcon className="h-4 w-4 ml-auto text-indigo-600 dark:text-indigo-400 dark:group-hover:text-indigo-300" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            // onClick={() => onOpen("editServer", { server })}
            className="px-3 py-2 text-sm cursor-pointer group"
          >
            Server Settings
            <ServerSettingsIcon className="h-4 w-4 ml-auto group-hover:text-accent-foreground" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            // onClick={() => onOpen("members", { server })}
            className="px-3 py-2 text-sm cursor-pointer group"
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto group-hover:text-accent-foreground" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            // onClick={() => onOpen("createChannel")}
            className="px-3 py-2 text-sm cursor-pointer group"
          >
            Create Channel
            <PlusIcon className="h-4 w-4 ml-auto group-hover:text-accent-foreground" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            variant="destructive"
            // onClick={() => onOpen("deleteServer", { server })}
            className="px-3 py-2 text-sm cursor-pointer text-rose-500"
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto text-rose-500" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            // onClick={() => onOpen("leaveServer", { server })}
            className="px-3 py-2 text-sm cursor-pointer text-rose-500"
          >
            Leave Server
            <LeaveServerIcon className="h-4 w-4 ml-auto text-rose-500" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
