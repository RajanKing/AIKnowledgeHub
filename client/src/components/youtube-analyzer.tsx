import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { youtubeDemo } from "@/lib/data";

interface YouTubeAnalyzerProps {
  className?: string;
}

export const YouTubeAnalyzer: React.FC<YouTubeAnalyzerProps> = ({ className }) => {
  const [, navigate] = useLocation();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [options, setOptions] = useState({
    summary: true,
    mindMap: true,
    keyPoints: false,
    questions: false,
  });
  
  const handleAnalyze = () => {
    if (!youtubeUrl) return;
    
    setProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setProcessing(false);
      setShowResults(true);
    }, 2000);
  };
  
  const handleOptionChange = (option: keyof typeof options) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };
  
  const handleBackClick = () => {
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
        <h1 className="text-xl font-semibold">YouTube Video Analysis</h1>
      </div>
      
      {/* YouTube URL Input */}
      <div className="max-w-3xl mx-auto mb-8">
        <Card className="p-5 border border-dark-700">
          <h2 className="text-lg font-medium mb-4">Analyze YouTube Video</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="flex-1 w-full">
              <Label htmlFor="youtube-url" className="block text-sm font-medium text-gray-400 mb-1">
                YouTube URL
              </Label>
              <Input
                id="youtube-url"
                className="border border-dark-600 bg-dark-700 placeholder-gray-400"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
            <Button
              className="px-4 py-2 w-full sm:w-auto"
              onClick={handleAnalyze}
              disabled={!youtubeUrl || processing}
            >
              Analyze
            </Button>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400">Options:</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="generate-summary" 
                  checked={options.summary} 
                  onCheckedChange={() => handleOptionChange('summary')}
                />
                <Label htmlFor="generate-summary">Generate Summary</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="create-mindmap" 
                  checked={options.mindMap} 
                  onCheckedChange={() => handleOptionChange('mindMap')}
                />
                <Label htmlFor="create-mindmap">Create Mind Map</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="extract-keypoints" 
                  checked={options.keyPoints} 
                  onCheckedChange={() => handleOptionChange('keyPoints')}
                />
                <Label htmlFor="extract-keypoints">Extract Key Points</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="generate-questions" 
                  checked={options.questions} 
                  onCheckedChange={() => handleOptionChange('questions')}
                />
                <Label htmlFor="generate-questions">Generate Questions</Label>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Processing Status */}
      {processing && (
        <div className="max-w-3xl mx-auto mb-8">
          <Card className="p-5 border border-dark-700">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
              <div>
                <h3 className="font-medium">Processing Video</h3>
                <p className="text-sm text-gray-400">Extracting transcript and analyzing content...</p>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={45} className="h-2.5" />
              <p className="text-xs text-gray-400 mt-1">45% complete - Estimated time: 2 minutes</p>
            </div>
          </Card>
        </div>
      )}
      
      {/* Analysis Results */}
      {showResults && (
        <div className="fade-in">
          {/* Video Player and Info */}
          <div className="max-w-3xl mx-auto mb-8">
            <Card className="overflow-hidden border border-dark-700">
              <div className="aspect-w-16 aspect-h-9 bg-black">
                <div className="w-full h-full bg-dark-900 flex items-center justify-center">
                  <img 
                    src={youtubeDemo.thumbnailUrl} 
                    alt="AI knowledge workspace visualization" 
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
              <div className="p-4">
                <h2 className="font-medium">{youtubeDemo.title}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {youtubeDemo.duration} · {youtubeDemo.views} views · Uploaded by {youtubeDemo.channel}
                </p>
              </div>
            </Card>
          </div>
          
          {/* Analysis Tabs */}
          <div className="max-w-3xl mx-auto">
            <Card className="border border-dark-700 overflow-hidden">
              <div className="border-b border-dark-700">
                <div className="flex overflow-x-auto scrollbar-hide">
                  <Button
                    variant="ghost"
                    className="px-4 py-3 rounded-none border-b-2 border-primary-500 text-primary-400"
                  >
                    Summary
                  </Button>
                  <Button
                    variant="ghost"
                    className="px-4 py-3 rounded-none border-b-2 border-transparent"
                  >
                    Transcript
                  </Button>
                  <Button
                    variant="ghost"
                    className="px-4 py-3 rounded-none border-b-2 border-transparent"
                  >
                    Mind Map
                  </Button>
                  <Button
                    variant="ghost"
                    className="px-4 py-3 rounded-none border-b-2 border-transparent"
                  >
                    Key Points
                  </Button>
                </div>
              </div>
              
              {/* Summary Tab Content */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Video Summary</h3>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="p-1.5">
                      <i className="ri-edit-line text-lg"></i>
                    </Button>
                    <Button variant="ghost" size="icon" className="p-1.5">
                      <i className="ri-download-line text-lg"></i>
                    </Button>
                    <Button variant="ghost" size="icon" className="p-1.5">
                      <i className="ri-share-line text-lg"></i>
                    </Button>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: youtubeDemo.summary }} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
