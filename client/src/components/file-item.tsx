import React from "react";
import { cn, getFileIconByType, getFileTypeColor } from "@/lib/utils";
import { File } from "@shared/schema";

interface FileItemProps {
  file: File;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const FileItem: React.FC<FileItemProps> = ({
  file,
  isActive = false,
  onClick,
  className,
}) => {
  const fileIcon = getFileIconByType(file.type);
  const fileColor = getFileTypeColor(file.type);
  
  return (
    <div
      className={cn(
        "flex items-center p-2 rounded-lg cursor-pointer",
        isActive ? "bg-dark-700" : "hover:bg-dark-700",
        className
      )}
      onClick={onClick}
    >
      <div className={cn("flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center", fileColor)}>
        <i className={fileIcon}></i>
      </div>
      <div className="ml-3 overflow-hidden">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-gray-400">
          {file.type === "youtube" 
            ? `${file.duration} · YouTube` 
            : `${file.size} MB · ${file.type.toUpperCase()}`}
        </p>
      </div>
    </div>
  );
};
