"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";

interface FileMetadata {
  url: string;
  name?: string;
  type?: string;
}

interface FileUploadProps {
  onChange: (file?: FileMetadata) => void;
  value: FileMetadata | undefined;
  endpoint: "messageFile" | "serverImage";
}

export default function FileUpload({
  onChange,
  value,
  endpoint,
}: FileUploadProps) {
  const fileType =
    value?.type || value?.name?.split(".").pop()?.toLowerCase() || "";

  const isPdf =
    fileType === "application/pdf" ||
    fileType === "pdf" ||
    value?.url?.endsWith(".pdf");

  if (value && !isPdf) {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value.url}
          alt="Upload"
          className="rounded-full object-cover"
        />
        <button
          className="bg-rose-500 rounded-full cursor-pointer text-white absolute p-1 top-0 right-0 shadow-sm"
          onClick={() => onChange(undefined)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && isPdf) {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value.name || "View PDF"}
        </a>
        <button
          onClick={() => onChange(undefined)}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (!res || res.length === 0) return;
        const { ufsUrl, name, type } = res[0];

        onChange({ url: ufsUrl, name, type });
      }}
      onUploadError={(error: Error) => {
        console.log("Error Uploading File(s): ", error);
      }}
    />
  );
}
