import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [autosave, setAutosave] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [darkCodeEditor, setDarkCodeEditor] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your application settings have been updated.",
    });
  };
  
  return (
    <div className="container mx-auto pb-8">
      <div className="py-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Configure your application preferences and settings
          </p>
        </div>
        
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage application appearance and behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autosave">Autosave Changes</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save your work as you edit
                </p>
              </div>
              <Switch
                id="autosave"
                checked={autosave}
                onCheckedChange={setAutosave}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view">Compact View</Label>
                <p className="text-sm text-muted-foreground">
                  Display information in a more condensed layout
                </p>
              </div>
              <Switch
                id="compact-view"
                checked={compactView}
                onCheckedChange={setCompactView}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-editor">Dark Code Editor</Label>
                <p className="text-sm text-muted-foreground">
                  Use dark theme for code and text editors
                </p>
              </div>
              <Switch
                id="dark-editor"
                checked={darkCodeEditor}
                onCheckedChange={setDarkCodeEditor}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="default-model">Default AI Model</Label>
              <Select defaultValue="gpt-4o">
                <SelectTrigger id="default-model">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="llama-3">Llama 3</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This model will be used by default for new conversations and queries
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Sync & Backup */}
        <Card>
          <CardHeader>
            <CardTitle>Sync & Backup</CardTitle>
            <CardDescription>
              Manage cloud synchronization and backup settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sync-enabled">Cloud Sync</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically sync your workspaces across devices
                </p>
              </div>
              <Switch
                id="sync-enabled"
                checked={syncEnabled}
                onCheckedChange={setSyncEnabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="backup-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                How often to create cloud backups of your data
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backup-retention">Backup Retention Period</Label>
              <Select defaultValue="30">
                <SelectTrigger id="backup-retention">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                How long to keep your backups before automatic deletion
              </p>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" className="w-full">
                <i className="ri-download-cloud-line mr-2"></i> Manual Backup Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* API Integration */}
        <Card>
          <CardHeader>
            <CardTitle>API Integration</CardTitle>
            <CardDescription>
              Manage API keys and external service connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input
                id="openai-key"
                type="password"
                placeholder="sk-••••••••••••••••••••••"
              />
              <p className="text-xs text-muted-foreground">
                Used for GPT model access and embeddings
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="anthropic-key">Anthropic API Key</Label>
              <Input
                id="anthropic-key"
                type="password"
                placeholder="sk_ant-••••••••••••••••••"
              />
              <p className="text-xs text-muted-foreground">
                Used for Claude model access
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="google-key">Google AI API Key</Label>
              <Input
                id="google-key"
                type="password"
                placeholder="AIza••••••••••••••••••••"
              />
              <p className="text-xs text-muted-foreground">
                Used for Gemini model access
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pinecone-key">Pinecone API Key</Label>
              <Input
                id="pinecone-key"
                type="password"
                placeholder="••••••••-••••-••••-••••-••••••••••••"
              />
              <p className="text-xs text-muted-foreground">
                Used for vector database access
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Advanced Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>
              Configure advanced options for power users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="token-limit">Default Token Limit</Label>
              <Select defaultValue="4000">
                <SelectTrigger id="token-limit">
                  <SelectValue placeholder="Select token limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">1,000 tokens</SelectItem>
                  <SelectItem value="2000">2,000 tokens</SelectItem>
                  <SelectItem value="4000">4,000 tokens</SelectItem>
                  <SelectItem value="8000">8,000 tokens</SelectItem>
                  <SelectItem value="16000">16,000 tokens</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Maximum number of tokens to use for AI model responses
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperature">Default Temperature</Label>
              <div className="flex items-center space-x-2">
                <span className="text-xs">0.0</span>
                <input
                  id="temperature"
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue="0.7"
                  className="flex h-2 w-full rounded-full accent-primary"
                />
                <span className="text-xs">2.0</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Controls randomness of AI responses (lower = more deterministic)
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="debug-mode">Debug Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Show advanced debugging information
                </p>
              </div>
              <Switch id="debug-mode" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dev-features">Developer Features</Label>
                <p className="text-sm text-muted-foreground">
                  Enable experimental developer features
                </p>
              </div>
              <Switch id="dev-features" />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
}