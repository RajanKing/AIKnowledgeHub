import React, { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentViewer } from "@/components/document-viewer";
import { AiOutputPanel } from "@/components/ai-output-panel";
import { files, documentSummary } from "@/lib/data";

const Workspace: React.FC = () => {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/workspace/:id");
  const workspaceId = params?.id ? parseInt(params.id) : 1;
  
  const workspaceFiles = files[workspaceId] || [];
  const [activeFile, setActiveFile] = useState(workspaceFiles.find(f => f.isActive) || workspaceFiles[0]);
  const [showAiPanel, setShowAiPanel] = useState(true);
  
  const handleBackClick = () => {
    navigate("/");
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={handleBackClick}
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </Button>
        <h1 className="text-xl font-semibold">AI Ethics Research</h1>
        <Badge variant="outline" className="ml-2 bg-secondary-500 bg-opacity-10 text-secondary-400 border-0">
          Active
        </Badge>
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="p-1.5">
            <i className="ri-share-line text-lg"></i>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-1.5"
            onClick={() => setShowAiPanel(!showAiPanel)}
          >
            {showAiPanel ? (
              <i className="ri-layout-right-line text-lg"></i>
            ) : (
              <i className="ri-layout-right-2-line text-lg"></i>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="p-1.5">
            <i className="ri-more-2-fill text-lg"></i>
          </Button>
        </div>
      </div>
      
      {/* Workspace Tabs */}
      <Tabs defaultValue="documents" className="mb-6">
        <TabsList className="border-b border-dark-700 bg-transparent w-full justify-start h-auto">
          <TabsTrigger 
            value="documents" 
            className="px-1 py-4 data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-400 data-[state=active]:shadow-none rounded-none"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="mindmaps"
            className="px-1 py-4 data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-400 data-[state=active]:shadow-none rounded-none"
          >
            Mind Maps
          </TabsTrigger>
          <TabsTrigger 
            value="qa"
            className="px-1 py-4 data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-400 data-[state=active]:shadow-none rounded-none"
          >
            Q&A
          </TabsTrigger>
          <TabsTrigger 
            value="notes"
            className="px-1 py-4 data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-400 data-[state=active]:shadow-none rounded-none"
          >
            Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="m-0 pt-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <DocumentViewer
                files={workspaceFiles}
                activeFile={activeFile}
                onFileSelect={setActiveFile}
              />
            </div>
            
            {/* AI Output Panel - Show conditionally */}
            {showAiPanel && (
              <AiOutputPanel summary={documentSummary} />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="mindmaps" className="m-0 pt-4">
          <div className="p-8 text-center text-gray-400">
            <i className="ri-mind-map text-5xl mb-4"></i>
            <h3 className="text-lg font-medium mb-2">Mind Maps</h3>
            <p className="max-w-md mx-auto mb-4">
              Create visual representations of concepts and ideas from your documents to better understand relationships.
            </p>
            <Button>Create Mind Map</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="qa" className="m-0 pt-4">
          <div className="p-8 text-center text-gray-400">
            <i className="ri-question-answer-line text-5xl mb-4"></i>
            <h3 className="text-lg font-medium mb-2">Questions & Answers</h3>
            <p className="max-w-md mx-auto mb-4">
              Ask questions about your documents and get AI-powered answers with source citations.
            </p>
            <Button>Ask a Question</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="m-0 pt-4">
          <div className="p-8 text-center text-gray-400">
            <i className="ri-sticky-note-line text-5xl mb-4"></i>
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <p className="max-w-md mx-auto mb-4">
              Create and organize notes related to your workspace documents and research.
            </p>
            <Button>Create Note</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workspace;
