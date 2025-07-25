import { cn } from "@/lib/utils";

interface BrowseChannelsIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const BrowseChannelsIcon: React.FC<BrowseChannelsIconProps> = ({
  className,
  size = 16,
  ...props
}) => {
  return (
    <svg
      className={cn("inline", className)}
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M18.5 23c.88 0 1.7-.25 2.4-.69l1.4 1.4a1 1 0 0 0 1.4-1.42l-1.39-1.4A4.5 4.5 0 1 0 18.5 23Zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        clipRule="evenodd"
        fill="currentColor"
        className=""
      ></path>
      <path
        d="M3 3a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2H3ZM2 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM3 11a1 1 0 1 0 0 2h11a1 1 0 1 0 0-2H3ZM2 16a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM3 19a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H3Z"
        fill="currentColor"
        className=""
      ></path>
    </svg>
  );
};

export default BrowseChannelsIcon;
