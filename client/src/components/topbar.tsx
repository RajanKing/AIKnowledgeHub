import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  setMobileOpen: (open: boolean) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ setMobileOpen }) => {
  
  return (
    <div className="border-b border-dark-700 bg-dark-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setMobileOpen(true)}
            >
              <i className="ri-menu-line text-xl"></i>
            </Button>
            
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <Input
                className="pl-10 pr-3 py-2 border border-dark-600 bg-dark-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search for documents, videos, or notes..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="p-1.5 relative"
            >
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="p-1.5"
            >
              <i className="ri-help-line text-xl"></i>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="p-1.5"
            >
              <i className="ri-user-add-line text-xl"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
