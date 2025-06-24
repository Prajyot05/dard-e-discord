"use client";

import React from "react";
import { ActionTooltip } from "../ActionToolTip";
import { useModal } from "@/hooks/user-modal-store";
import PlusIcon from "../icons/plus-icon";

export function CreateServer() {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-4 h-[40px] w-[40px] rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 hover:bg-indigo-400">
            <PlusIcon className="text-white" size={20} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
