import React from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import { useUiContext } from "@/contexts/ui-context";
import { aiModels } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type SidebarLinkProps = {
  href: string;
  icon?: string;
  children: React.ReactNode;
  dotColor?: string;
  badge?: string;
  badgeColor?: string;
  currentPath: string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  children,
  dotColor,
  badge,
  badgeColor,
  currentPath,
}) => {
  const isActive = currentPath === href;

  return (
    <Link href={href}>
      <div
        className={cn(
          "group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer",
          isActive ? "bg-dark-700" : "hover:bg-dark-700"
        )}
      >
        {icon && <i className={cn(icon, "mr-3 text-lg")} />}
        {dotColor && (
          <span className={cn("flex-shrink-0 w-2 h-2 rounded-full mr-3", dotColor)} />
        )}
        <span>{children}</span>
        {badge && (
          <span
            className={cn(
              "ml-auto text-xs px-1.5 py-0.5 bg-opacity-10 rounded-full",
              badgeColor || "text-green-500 bg-green-500"
            )}
          >
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
};

interface DesktopSidebarProps {
  className?: string;
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const DesktopSidebar = ({ className, collapsed, toggleSidebar }: DesktopSidebarProps) => {
  const [location] = useLocation();

  if (collapsed) {
    return (
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-14 border-r border-dark-700 bg-sidebar">
          <div className="flex items-center justify-center h-14 border-b border-dark-700">
            <Button
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="text-sidebar-foreground"
            >
              <i className="ri-menu-unfold-line text-xl" />
            </Button>
          </div>
          {/* Collapsed icons for quick access */}
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link href="/">
              <div className="p-2 rounded-md hover:bg-dark-700 cursor-pointer">
                <i className="ri-home-line text-xl text-sidebar-foreground" />
              </div>
            </Link>
            <Link href="/upload-document">
              <div className="p-2 rounded-md hover:bg-dark-700 cursor-pointer">
                <i className="ri-upload-cloud-line text-xl text-sidebar-foreground" />
              </div>
            </Link>
            <Link href="/youtube-analysis">
              <div className="p-2 rounded-md hover:bg-dark-700 cursor-pointer">
                <i className="ri-youtube-line text-xl text-sidebar-foreground" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("hidden md:flex md:flex-shrink-0", className)}>
      <div className="flex flex-col w-64 border-r border-dark-700 bg-sidebar">
        <div className="px-4 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center">
              <i className="ri-brain-line text-xl text-white"></i>
            </div>
            <h1 className="ml-2 text-xl font-semibold text-sidebar-foreground">KnowledgeAI</h1>
          </div>
          <Button
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="text-sidebar-foreground"
          >
            <i className="ri-menu-fold-line"></i>
          </Button>
        </div>
        
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <nav className="flex-1 px-4 space-y-4">
            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Workspaces
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink href="/" icon="ri-home-line" currentPath={location}>
                  Dashboard
                </SidebarLink>
                <SidebarLink href="/favorites" icon="ri-star-line" currentPath={location}>
                  Favorites
                </SidebarLink>
                <SidebarLink href="/recent" icon="ri-time-line" currentPath={location}>
                  Recent
                </SidebarLink>
              </div>
            </div>
            
            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Projects
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink 
                  href="/workspace/1" 
                  dotColor="bg-secondary-400" 
                  currentPath={location}
                >
                  Research Paper
                </SidebarLink>
                <SidebarLink 
                  href="/workspace/2" 
                  dotColor="bg-yellow-400" 
                  currentPath={location}
                >
                  ML Course Notes
                </SidebarLink>
                <SidebarLink 
                  href="/workspace/3" 
                  dotColor="bg-blue-400" 
                  currentPath={location}
                >
                  Product Requirements
                </SidebarLink>
              </div>
            </div>
            
            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                AI Tools
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink href="/upload-document" icon="ri-upload-cloud-line" currentPath={location}>
                  Document Upload
                </SidebarLink>
                <SidebarLink href="/youtube-analysis" icon="ri-youtube-line" currentPath={location}>
                  YouTube Analysis
                </SidebarLink>
                <SidebarLink href="/conversation" icon="ri-chat-3-line" currentPath={location}>
                  AI Conversation
                </SidebarLink>
                <SidebarLink href="/knowledge-graph" icon="ri-mind-map" currentPath={location}>
                  Knowledge Graph
                </SidebarLink>
              </div>
            </div>

            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                AI Models
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink href="/models" icon="ri-cpu-line" currentPath={location}>
                  All Models
                </SidebarLink>
                {aiModels.slice(0, 3).map(model => (
                  <SidebarLink 
                    key={model.id}
                    href={`/models/${model.id}`} 
                    icon={model.icon}
                    badge={model.isActive ? "Active" : undefined}
                    badgeColor={`text-${model.color}-500 bg-${model.color}-500`}
                    currentPath={location}
                  >
                    {model.name}
                  </SidebarLink>
                ))}
              </div>
            </div>
            
            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Data & Settings
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink href="/databases" icon="ri-database-2-line" currentPath={location}>
                  Vector Databases
                </SidebarLink>
                <SidebarLink href="/profile" icon="ri-user-line" currentPath={location}>
                  My Profile
                </SidebarLink>
                <SidebarLink href="/billing" icon="ri-bank-card-line" currentPath={location}>
                  Billing & Usage
                </SidebarLink>
                <SidebarLink href="/settings" icon="ri-settings-3-line" currentPath={location}>
                  Settings
                </SidebarLink>
              </div>
            </div>
          </nav>
          
          <div className="p-4">
            <Button 
              className="w-full flex items-center justify-center"
              variant="default"
            >
              <i className="ri-add-line mr-2"></i> New Workspace
            </Button>
          </div>
        </div>
        
        <div className="border-t border-dark-700 p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah Chen" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-sidebar-foreground">Sarah Chen</p>
              <p className="text-xs text-gray-400">Premium Plan</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto text-gray-400"
            >
              <i className="ri-settings-3-line"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileSidebar = ({ open, onOpenChange }: MobileSidebarProps) => {
  const [location] = useLocation();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 w-[300px] bg-sidebar border-r border-dark-700">
        <div className="px-4 py-5 flex items-center">
          <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center">
            <i className="ri-brain-line text-xl text-white"></i>
          </div>
          <h1 className="ml-2 text-xl font-semibold text-sidebar-foreground">KnowledgeAI</h1>
        </div>
        
        <Separator className="bg-dark-700" />
        
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <nav className="flex-1 px-4 py-4 space-y-4">
            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Workspaces
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink href="/" icon="ri-home-line" currentPath={location}>
                  Dashboard
                </SidebarLink>
                <SidebarLink href="/favorites" icon="ri-star-line" currentPath={location}>
                  Favorites
                </SidebarLink>
                <SidebarLink href="/recent" icon="ri-time-line" currentPath={location}>
                  Recent
                </SidebarLink>
              </div>
            </div>
            
            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Projects
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink 
                  href="/workspace/1" 
                  dotColor="bg-secondary-400" 
                  currentPath={location}
                >
                  Research Paper
                </SidebarLink>
                <SidebarLink 
                  href="/workspace/2" 
                  dotColor="bg-yellow-400" 
                  currentPath={location}
                >
                  ML Course Notes
                </SidebarLink>
                <SidebarLink 
                  href="/workspace/3" 
                  dotColor="bg-blue-400" 
                  currentPath={location}
                >
                  Product Requirements
                </SidebarLink>
              </div>
            </div>
            
            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                AI Tools
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink href="/upload-document" icon="ri-upload-cloud-line" currentPath={location}>
                  Document Upload
                </SidebarLink>
                <SidebarLink href="/youtube-analysis" icon="ri-youtube-line" currentPath={location}>
                  YouTube Analysis
                </SidebarLink>
                <SidebarLink href="/conversation" icon="ri-chat-3-line" currentPath={location}>
                  AI Conversation
                </SidebarLink>
                <SidebarLink href="/knowledge-graph" icon="ri-mind-map" currentPath={location}>
                  Knowledge Graph
                </SidebarLink>
              </div>
            </div>

            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                AI Models
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink href="/models" icon="ri-cpu-line" currentPath={location}>
                  All Models
                </SidebarLink>
                {aiModels.slice(0, 3).map(model => (
                  <SidebarLink 
                    key={model.id}
                    href={`/models/${model.id}`} 
                    icon={model.icon}
                    badge={model.isActive ? "Active" : undefined}
                    badgeColor={`text-${model.color}-500 bg-${model.color}-500`}
                    currentPath={location}
                  >
                    {model.name}
                  </SidebarLink>
                ))}
              </div>
            </div>
            
            <div>
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Data & Settings
              </p>
              <div className="mt-2 space-y-1">
                <SidebarLink href="/databases" icon="ri-database-2-line" currentPath={location}>
                  Vector Databases
                </SidebarLink>
                <SidebarLink href="/profile" icon="ri-user-line" currentPath={location}>
                  My Profile
                </SidebarLink>
                <SidebarLink href="/billing" icon="ri-bank-card-line" currentPath={location}>
                  Billing & Usage
                </SidebarLink>
                <SidebarLink href="/settings" icon="ri-settings-3-line" currentPath={location}>
                  Settings
                </SidebarLink>
              </div>
            </div>
          </nav>
          
          <div className="p-4">
            <Button 
              className="w-full flex items-center justify-center"
              variant="default"
            >
              <i className="ri-add-line mr-2"></i> New Workspace
            </Button>
          </div>
        </div>
        
        <Separator className="bg-dark-700" />
        
        <div className="p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah Chen" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-sidebar-foreground">Sarah Chen</p>
              <p className="text-xs text-gray-400">Premium Plan</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto text-gray-400"
            >
              <i className="ri-settings-3-line"></i>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
