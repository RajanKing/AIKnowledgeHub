import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { aiModels } from "@/lib/data";

interface DocumentUploaderProps {
  className?: string;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ className }) => {
  const [, navigate] = useLocation();
  const [selectedModelId, setSelectedModelId] = useState<string>("1");  // Default to ChatGPT
  const [outputOptions, setOutputOptions] = useState({
    summary: true,
    mindMap: true,
    keyTerms: false,
    questions: false,
  });
  const [isPrivate, setIsPrivate] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceFolder, setWorkspaceFolder] = useState("Personal");
  
  const handleOptionChange = (option: keyof typeof outputOptions) => {
    setOutputOptions({
      ...outputOptions,
      [option]: !outputOptions[option],
    });
  };
  
  const handleBackClick = () => {
    navigate("/");
  };
  
  const handleSubmit = () => {
    // Here we would submit to backend
    navigate("/");
  };
  
  return (
    <div className={cn("px-4 sm:px-6 lg:px-8 py-6", className)}>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={handleBackClick}
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </Button>
        <h1 className="text-xl font-semibold">Upload Documents</h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {/* Upload Zone */}
        <Card className="mb-8 border-2 border-dashed border-dark-600 p-8 flex flex-col items-center justify-center">
          <i className="ri-upload-cloud-2-line text-5xl text-gray-400 mb-4"></i>
          <h2 className="text-lg font-medium mb-2">Drag and drop files here</h2>
          <p className="text-sm text-gray-400 mb-6 text-center">
            Support for PDF, DOCX, PPTX, EPUB, TXT, and Markdown files
          </p>
          <Button>
            Browse Files
          </Button>
        </Card>
        
        {/* Processing Options */}
        <Card className="p-5 border border-dark-700 mb-8">
          <h2 className="text-lg font-medium mb-4">Processing Options</h2>
          
          {/* AI Model Selection */}
          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-400 mb-2">
              AI Model
            </Label>
            <RadioGroup
              value={selectedModelId}
              onValueChange={setSelectedModelId}
              className="flex flex-col sm:flex-row gap-4"
            >
              {aiModels.map((model) => (
                <div
                  key={model.id}
                  className={cn(
                    "bg-dark-700 rounded-lg px-4 py-3 flex items-center cursor-pointer",
                    Number(selectedModelId) === model.id && "border border-primary-500"
                  )}
                >
                  <RadioGroupItem
                    value={model.id.toString()}
                    id={`model-${model.id}`}
                    className="sr-only"
                  />
                  <i className={cn(model.icon, `text-xl text-${model.color}-500 mr-2`)}></i>
                  <span>{model.name}</span>
                  {model.isActive && (
                    <span className="ml-2 text-xs bg-green-500 bg-opacity-10 text-green-500 px-1.5 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Output Options */}
          <div>
            <Label className="block text-sm font-medium text-gray-400 mb-2">
              Generate
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-dark-700 rounded-lg px-4 py-3 flex items-center">
                <Checkbox
                  id="summary-option"
                  checked={outputOptions.summary}
                  onCheckedChange={() => handleOptionChange('summary')}
                />
                <Label
                  htmlFor="summary-option"
                  className="ml-2 cursor-pointer"
                >
                  Summary (3 lengths)
                </Label>
              </div>
              
              <div className="bg-dark-700 rounded-lg px-4 py-3 flex items-center">
                <Checkbox
                  id="mindmap-option"
                  checked={outputOptions.mindMap}
                  onCheckedChange={() => handleOptionChange('mindMap')}
                />
                <Label
                  htmlFor="mindmap-option"
                  className="ml-2 cursor-pointer"
                >
                  Mind Map
                </Label>
              </div>
              
              <div className="bg-dark-700 rounded-lg px-4 py-3 flex items-center">
                <Checkbox
                  id="keyterms-option"
                  checked={outputOptions.keyTerms}
                  onCheckedChange={() => handleOptionChange('keyTerms')}
                />
                <Label
                  htmlFor="keyterms-option"
                  className="ml-2 cursor-pointer"
                >
                  Key Terms & Definitions
                </Label>
              </div>
              
              <div className="bg-dark-700 rounded-lg px-4 py-3 flex items-center">
                <Checkbox
                  id="questions-option"
                  checked={outputOptions.questions}
                  onCheckedChange={() => handleOptionChange('questions')}
                />
                <Label
                  htmlFor="questions-option"
                  className="ml-2 cursor-pointer"
                >
                  Practice Questions
                </Label>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Workspace Settings */}
        <Card className="p-5 border border-dark-700 mb-8">
          <h2 className="text-lg font-medium mb-4">Workspace Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="workspace-name"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Workspace Name
              </Label>
              <Input
                id="workspace-name"
                className="border border-dark-600 bg-dark-700 placeholder-gray-400"
                placeholder="My Research Project"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </div>
            
            <div>
              <Label
                htmlFor="workspace-folder"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Save to Folder
              </Label>
              <Select
                value={workspaceFolder}
                onValueChange={setWorkspaceFolder}
              >
                <SelectTrigger
                  id="workspace-folder"
                  className="border border-dark-600 bg-dark-700"
                >
                  <SelectValue placeholder="Select a folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Study">Study</SelectItem>
                  <SelectItem value="Create New Folder...">Create New Folder...</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="private-workspace"
                checked={isPrivate}
                onCheckedChange={() => setIsPrivate(!isPrivate)}
              />
              <Label
                htmlFor="private-workspace"
                className="text-sm"
              >
                Make this workspace private
              </Label>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="mr-3"
            onClick={handleBackClick}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Upload & Process
          </Button>
        </div>
      </div>
    </div>
  );
};
