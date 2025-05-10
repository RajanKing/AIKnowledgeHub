import React, { useState } from "react";
import { DesktopSidebar, MobileSidebar } from "@/components/ui/sidebar";
import { Topbar } from "@/components/topbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-dark-900 text-white">
      {/* Desktop Sidebar */}
      <DesktopSidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />
      
      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar setMobileOpen={setMobileOpen} />
        
        {/* Page Content */}
        <div className="flex-1 flex overflow-hidden">
          <div 
            id="main-content"
            className="flex-1 overflow-y-auto scrollbar-hide"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
