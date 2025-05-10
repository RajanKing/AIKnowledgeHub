import React from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getWorkspaceColor, getProjectDotColor, formatDate } from "@/lib/utils";
import { Workspace } from "@shared/schema";
import { users } from "@/lib/data";

interface WorkspaceCardProps {
  workspace: Workspace;
  className?: string;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ 
  workspace, 
  className 
}) => {
  const bgColor = getWorkspaceColor(workspace.colorId);
  const dotColor = getProjectDotColor(workspace.projectType);
  
  // Get collaborator data
  const collaborators = workspace.collaborators?.map(id => 
    users.find(user => user.id === id)
  ).filter(Boolean) || [];

  return (
    <Link href={`/workspace/${workspace.id}`}>
      <Card 
        className={cn(
          "border border-dark-700 rounded-xl overflow-hidden hover:border-primary-500 transition-all cursor-pointer group",
          className
        )}
      >
        {/* Background image or gradient */}
        <div className={cn("h-32 relative", bgColor)}>
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            {/* Use a generic AI/document management themed image */}
            {workspace.projectType === 0 && (
              <img 
                src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
                alt="Document management background" 
                className="object-cover w-full h-full" 
              />
            )}
            {workspace.projectType === 1 && (
              <img 
                src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
                alt="Mind mapping visualization background" 
                className="object-cover w-full h-full" 
              />
            )}
            {workspace.projectType === 2 && (
              <img 
                src="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
                alt="Content summarization background" 
                className="object-cover w-full h-full" 
              />
            )}
          </div>
          <div className="absolute top-3 right-3 bg-dark-900 bg-opacity-70 rounded-md px-2 py-1 text-xs">
            <i className="ri-file-text-line mr-1"></i>
            <span>{workspace.fileCount} files</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{workspace.name}</h3>
            <span className={cn("w-2 h-2 rounded-full", dotColor)}></span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Last edited {formatDate(workspace.lastModified)}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2">
              {collaborators.slice(0, 3).map((user, index) => (
                user && (
                  <Avatar key={index} className="h-6 w-6 border border-dark-800">
                    <AvatarImage src={user.avatar || undefined} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                )
              ))}
              
              {collaborators.length > 3 && (
                <div className="h-6 w-6 rounded-full border border-dark-800 bg-dark-700 flex items-center justify-center text-xs">
                  +{collaborators.length - 3}
                </div>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-400">
              <i className="ri-eye-line mr-1"></i>
              <span>{workspace.views} views</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
