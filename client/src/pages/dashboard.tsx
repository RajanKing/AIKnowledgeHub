import React from "react";
import { useLocation } from "wouter";
import { ActionCard } from "@/components/action-card";
import { WorkspaceCard } from "@/components/workspace-card";
import { TemplateCard } from "@/components/template-card";
import { templates, workspaces } from "@/lib/data";

const Dashboard: React.FC = () => {
  const [, navigate] = useLocation();
  
  const handleUploadAction = () => {
    navigate("/upload-document");
  };
  
  const handleYoutubeAction = () => {
    navigate("/youtube-analysis");
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6" id="dashboard-view">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Welcome back, Sarah</h1>
        <p className="text-gray-400 mt-1">Pick up where you left off or start a new workspace</p>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard
            title="Upload File"
            description="PDF, DOCX, Markdown, or EPUB"
            icon="ri-upload-cloud-line"
            iconColor="primary"
            onClick={handleUploadAction}
          />
          
          <ActionCard
            title="Analyze YouTube"
            description="Extract insights from videos"
            icon="ri-youtube-line"
            iconColor="red"
            onClick={handleYoutubeAction}
          />
          
          <ActionCard
            title="Chat with Documents"
            description="Ask questions about your files"
            icon="ri-chat-3-line"
            iconColor="secondary"
          />
        </div>
      </div>
      
      {/* Recent Workspaces */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Recent Workspaces</h2>
          <button className="text-sm text-primary-400 hover:text-primary-300">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>
      </div>
      
      {/* Popular Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Popular Templates</h2>
          <button className="text-sm text-primary-400 hover:text-primary-300">Browse Library</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
