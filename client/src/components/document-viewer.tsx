import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileItem } from "@/components/file-item";
import { cn } from "@/lib/utils";
import { File } from "@shared/schema";

interface DocumentViewerProps {
  files: File[];
  activeFile?: File;
  onFileSelect: (file: File) => void;
  className?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  files,
  activeFile,
  onFileSelect,
  className,
}) => {
  if (!activeFile) {
    return (
      <div className={cn("flex flex-col h-full items-center justify-center p-6", className)}>
        <div className="text-center">
          <i className="ri-file-list-3-line text-gray-400 text-5xl mb-4"></i>
          <h3 className="text-lg font-medium mb-2">No Document Selected</h3>
          <p className="text-sm text-gray-400 mb-4">
            Select a document from the list to view it here or upload a new one.
          </p>
          <Button>Upload Document</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col lg:flex-row gap-6", className)}>
      {/* File List */}
      <Card className="w-full lg:w-64 flex-shrink-0 p-4 border border-dark-700 h-fit">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">Files</h2>
          <Button variant="ghost" size="icon" className="p-1">
            <i className="ri-add-line text-lg"></i>
          </Button>
        </div>
        
        <div className="space-y-2">
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              isActive={activeFile?.id === file.id}
              onClick={() => onFileSelect(file)}
            />
          ))}
        </div>
      </Card>
      
      {/* Document Preview */}
      <Card className="flex-1 overflow-hidden border border-dark-700">
        <div className="p-4 border-b border-dark-700 flex items-center justify-between">
          <div className="flex items-center">
            <i className={cn(
              activeFile.type === "pdf" ? "ri-file-text-line text-blue-500" : 
              activeFile.type === "youtube" ? "ri-youtube-line text-red-500" :
              activeFile.type === "docx" ? "ri-file-word-line text-green-500" :
              "ri-file-line",
              "mr-2"
            )}></i>
            <h3 className="font-medium">{activeFile.name}</h3>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="p-1.5">
              <i className="ri-fullscreen-line text-lg"></i>
            </Button>
            <Button variant="ghost" size="icon" className="p-1.5">
              <i className="ri-download-line text-lg"></i>
            </Button>
          </div>
        </div>
        
        {/* Document Content */}
        {activeFile.type === "pdf" && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
              {/* AI Knowledge Workspace Platform document - uses a white background since this is mimicking a PDF viewer */}
              <div className="p-8 text-dark-900">
                <h1 className="text-2xl font-bold mb-4">AI Ethics Framework for Responsible Development</h1>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Abstract</h2>
                  <p className="text-sm">
                    This framework outlines principles and practical guidelines for the ethical development of AI systems. 
                    It addresses transparency, fairness, accountability, privacy, and human oversight to ensure AI technologies serve the common good.
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">1. Introduction</h2>
                  <p className="text-sm mb-2">
                    As artificial intelligence becomes increasingly integrated into critical systems and decision-making processes, 
                    establishing clear ethical guidelines is essential. This framework provides practical guidance for:
                  </p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Researchers developing new AI models</li>
                    <li>Engineers implementing AI systems</li>
                    <li>Product managers overseeing AI features</li>
                    <li>Organizations deploying AI solutions</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">2. Core Principles</h2>
                  <div className="ml-4">
                    <h3 className="text-base font-medium mb-1">2.1 Transparency</h3>
                    <p className="text-sm mb-2">
                      AI systems should be explainable and interpretable. Users should understand how and why decisions are made.
                    </p>
                    
                    <h3 className="text-base font-medium mb-1">2.2 Fairness</h3>
                    <p className="text-sm mb-2">
                      AI systems should avoid reinforcing biases and discrimination. Regular testing for fairness across demographics is required.
                    </p>
                    
                    <h3 className="text-base font-medium mb-1">2.3 Accountability</h3>
                    <p className="text-sm mb-2">
                      Clear lines of responsibility for AI outcomes must be established. Humans should remain accountable for AI-driven decisions.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 pt-3 border-t border-gray-200">
                  <span>Page 1 of 12</span>
                  <span>AI Ethics Research Group | 2023</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeFile.type === "youtube" && (
          <div className="aspect-w-16 aspect-h-9 bg-black">
            <div className="w-full h-full bg-dark-900 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center"
                >
                  <i className="ri-play-fill text-white text-4xl"></i>
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {activeFile.type === "docx" && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
              <div className="p-8 text-dark-900">
                <h1 className="text-2xl font-bold mb-4">Interview Transcripts</h1>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Interview with Dr. Sarah Johnson</h2>
                  <p className="text-sm text-gray-500 mb-4">Senior AI Ethics Researcher at TechLabs</p>
                  
                  <p className="text-sm mb-3">
                    <strong>Interviewer:</strong> Thank you for taking the time to speak with us today. Could you start by sharing your perspective on the most pressing ethical concerns in AI development?
                  </p>
                  
                  <p className="text-sm mb-3">
                    <strong>Dr. Johnson:</strong> I believe the three most critical issues are transparency in decision-making processes, fairness across different demographic groups, and establishing clear accountability frameworks. Many organizations are rushing to implement AI without properly addressing these fundamental concerns.
                  </p>
                  
                  <p className="text-sm mb-3">
                    <strong>Interviewer:</strong> How do you recommend organizations approach these challenges?
                  </p>
                  
                  <p className="text-sm mb-3">
                    <strong>Dr. Johnson:</strong> It starts with organizational culture. Ethics can't be an afterthought or handled by a siloed team. We need cross-functional collaboration, with ethicists involved from the earliest stages of development. I also recommend regular auditing and testing, especially for high-stakes applications.
                  </p>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 pt-3 border-t border-gray-200">
                  <span>Confidential Interview Transcript</span>
                  <span>Recorded: April 15, 2023</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
