import React from "react";
import { cn } from "@/lib/utils";

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  className,
  size = 16,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className={cn("inline", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="transparent" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-17a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
};

export default PlusIcon;
