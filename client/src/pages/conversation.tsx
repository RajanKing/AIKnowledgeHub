import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Sample conversation data
const sampleMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    role: "user",
    content: "I need to analyze the latest research paper on large language models. Can you help me extract the key points?",
    timestamp: "1 minute ago",
  },
  {
    id: 3,
    role: "assistant",
    content: "I'd be happy to help you analyze a research paper on large language models. To get started, could you provide me with the title and authors of the paper, or upload the paper so I can review it? Once I have the paper, I can extract key points such as:\n\n- Main research contributions\n- Novel methodologies\n- Experimental results\n- Limitations and future work\n- Practical implications\n\nI can also create a structured summary with different levels of detail based on your needs.",
    timestamp: "1 minute ago",
  },
];

export default function ConversationPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState(sampleMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputMessage,
      timestamp: "Just now",
    };
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: "I'm analyzing your request. This is a simulated response as the actual AI integration is still in development. In a real implementation, this would connect to the selected AI model and provide a contextually relevant response based on your input and previous conversation history.",
        timestamp: "Just now",
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([{
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: "Just now",
    }]);
    
    toast({
      title: "Conversation cleared",
      description: "All previous messages have been removed.",
    });
  };

  const handleExportConversation = () => {
    const conversationText = messages
      .map(msg => `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversation exported",
      description: "Your conversation has been downloaded as a text file.",
    });
  };

  return (
    <div className="container mx-auto pb-8 h-full flex flex-col">
      <div className="py-6 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">AI Conversation</h2>
            <p className="text-muted-foreground">
              Have a conversation with AI models and save the results
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-48">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">
                    <div className="flex items-center">
                      <i className="ri-openai-fill mr-2 text-green-500"></i>
                      <span>GPT-4o</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="claude-3-opus">
                    <div className="flex items-center">
                      <i className="ri-reactjs-line mr-2 text-blue-500"></i>
                      <span>Claude 3 Opus</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="gemini-pro">
                    <div className="flex items-center">
                      <i className="ri-google-fill mr-2 text-red-500"></i>
                      <span>Gemini Pro</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="llama-3">
                    <div className="flex items-center">
                      <i className="ri-fire-fill mr-2 text-orange-500"></i>
                      <span>Llama 3</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleClearConversation}>
                    <i className="ri-eraser-line"></i>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear conversation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleExportConversation}>
                    <i className="ri-download-line"></i>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export conversation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button>
              <i className="ri-add-line mr-2"></i> New Chat
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="py-3 px-4 border-b">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <i className={`mr-1 ${
                selectedModel === 'gpt-4o' ? 'ri-openai-fill text-green-500' : 
                selectedModel === 'claude-3-opus' ? 'ri-reactjs-line text-blue-500' :
                selectedModel === 'gemini-pro' ? 'ri-google-fill text-red-500' :
                'ri-fire-fill text-orange-500'
              }`}></i>
              {selectedModel === 'gpt-4o' ? 'GPT-4o' : 
               selectedModel === 'claude-3-opus' ? 'Claude 3 Opus' :
               selectedModel === 'gemini-pro' ? 'Gemini Pro' :
               'Llama 3'}
            </Badge>
            <CardTitle className="text-md">New Conversation</CardTitle>
            <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
              <i className="ri-settings-3-line"></i>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={`flex-shrink-0 ${message.role === "user" ? "ml-3" : "mr-3"}`}>
                  <Avatar>
                    {message.role === "user" ? (
                      <>
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                        <AvatarFallback>SC</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="" alt="AI" />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          <i className="ri-robot-line"></i>
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                </div>
                
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row">
                <div className="flex-shrink-0 mr-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <i className="ri-robot-line"></i>
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="p-3 rounded-lg bg-muted flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
        
        <CardFooter className="p-4 border-t">
          <div className="relative w-full flex">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="min-h-10 resize-none pr-16"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <i className="ri-file-upload-line"></i>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button
                disabled={!inputMessage.trim() || isLoading}
                onClick={handleSendMessage}
                size="icon"
                className="h-8 w-8"
              >
                <i className="ri-send-plane-fill"></i>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}