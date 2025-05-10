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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { aiModels } from "@/lib/data";

export default function ModelsPage() {
  const { toast } = useToast();
  const [models, setModels] = useState(aiModels);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  
  // Filter models based on search query
  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleModel = (id: number) => {
    setModels(
      models.map((model) =>
        model.id === id ? { ...model, isActive: !model.isActive } : model
      )
    );

    const model = models.find((model) => model.id === id);
    toast({
      title: `${model?.isActive ? "Disabled" : "Enabled"} ${model?.name}`,
      description: `The model has been ${
        model?.isActive ? "disabled" : "enabled"
      } successfully.`,
    });
  };

  const handleConfigureModel = (model: any) => {
    setSelectedModel(model);
    setShowConfigDialog(true);
  };

  const handleSaveConfig = () => {
    setShowConfigDialog(false);
    toast({
      title: "Model configuration saved",
      description: `Configuration for ${selectedModel?.name} has been updated successfully.`,
    });
  };

  return (
    <div className="container mx-auto pb-8">
      <div className="py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">AI Models</h2>
            <p className="text-muted-foreground">
              Configure and manage AI models for your workspace
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <i className="ri-search-line absolute left-2.5 top-2.5 text-muted-foreground"></i>
              <Input
                type="search"
                placeholder="Search models..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <i className="ri-add-line mr-2"></i> Add Model
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add AI Model</DialogTitle>
                  <DialogDescription>
                    Connect to a new AI model for your workspace
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="model-provider">Provider</Label>
                    <Select>
                      <SelectTrigger id="model-provider">
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="google">Google AI</SelectItem>
                        <SelectItem value="meta">Meta AI</SelectItem>
                        <SelectItem value="cohere">Cohere</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="model-name">Model Name</Label>
                    <Input id="model-name" placeholder="e.g., GPT-4, Claude 3" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your API key is stored securely and never shared.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="model-description">Description (Optional)</Label>
                    <Input
                      id="model-description"
                      placeholder="Brief description of this model"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="model-active" defaultChecked />
                    <Label htmlFor="model-active">Enable model</Label>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Add Model</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="models">Connected Models</TabsTrigger>
            <TabsTrigger value="usage">Usage & Performance</TabsTrigger>
            <TabsTrigger value="settings">Model Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Models</CardTitle>
                <CardDescription>
                  AI models connected to your workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead className="hidden md:table-cell">Provider</TableHead>
                      <TableHead className="hidden lg:table-cell">Capabilities</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredModels.map((model) => (
                      <TableRow key={model.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className={`text-${model.color}-500 text-xl`}>
                              <i className={model.icon}></i>
                            </div>
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-xs text-muted-foreground hidden sm:block">
                                {model.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{model.provider}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {model.capabilities.map((capability) => (
                              <Badge
                                key={capability}
                                variant="outline"
                                className="text-xs"
                              >
                                {capability}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                model.isActive ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></div>
                            <span className="hidden sm:inline-block">
                              {model.isActive ? "Active" : "Inactive"}
                            </span>
                            <Switch
                              checked={model.isActive}
                              onCheckedChange={() => handleToggleModel(model.id)}
                              className="ml-auto md:ml-0"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => handleConfigureModel(model)}
                            >
                              <i className="ri-settings-3-line"></i>
                              <span className="sr-only">Configure</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <i className="ri-information-line"></i>
                              <span className="sr-only">Info</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <i className="ri-delete-bin-line"></i>
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredModels.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <i className="ri-robot-line text-3xl text-muted-foreground"></i>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No models found</h3>
                    <p className="text-muted-foreground max-w-sm">
                      No AI models match your search criteria. Try with a different
                      search term or add a new model.
                    </p>
                    <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                      <i className="ri-add-line mr-2"></i> Add Model
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Model Configuration Dialog */}
            <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    Configure {selectedModel?.name}
                  </DialogTitle>
                  <DialogDescription>
                    Adjust parameters and settings for this model
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model-temperature">Temperature</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">0.0</span>
                      <input
                        id="model-temperature"
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
                      Controls randomness. Lower values are more deterministic, higher values more creative.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-max-tokens">Max Tokens</Label>
                    <Select defaultValue="4000">
                      <SelectTrigger id="model-max-tokens">
                        <SelectValue placeholder="Select token limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">1,000 tokens</SelectItem>
                        <SelectItem value="2000">2,000 tokens</SelectItem>
                        <SelectItem value="4000">4,000 tokens</SelectItem>
                        <SelectItem value="8000">8,000 tokens</SelectItem>
                        <SelectItem value="16000">16,000 tokens</SelectItem>
                        <SelectItem value="32000">32,000 tokens</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Maximum number of tokens to generate in the response
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-context-window">Context Window</Label>
                    <Select defaultValue="16k">
                      <SelectTrigger id="model-context-window">
                        <SelectValue placeholder="Select context window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4k">4K context window</SelectItem>
                        <SelectItem value="8k">8K context window</SelectItem>
                        <SelectItem value="16k">16K context window</SelectItem>
                        <SelectItem value="32k">32K context window</SelectItem>
                        <SelectItem value="128k">128K context window</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Maximum context size the model can process
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-system-prompt">Default System Prompt</Label>
                    <Input
                      id="model-system-prompt"
                      defaultValue="You are a helpful assistant."
                    />
                    <p className="text-xs text-muted-foreground">
                      Default system instruction to guide model behavior
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <h4 className="text-sm font-medium">Advanced Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="model-top-p">Top P</Label>
                        <Input
                          id="model-top-p"
                          type="number"
                          min="0"
                          max="1"
                          step="0.05"
                          defaultValue="0.9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model-frequency-penalty">Frequency Penalty</Label>
                        <Input
                          id="model-frequency-penalty"
                          type="number"
                          min="0"
                          max="2"
                          step="0.1"
                          defaultValue="0.0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model-presence-penalty">Presence Penalty</Label>
                        <Input
                          id="model-presence-penalty"
                          type="number"
                          min="0"
                          max="2"
                          step="0.1"
                          defaultValue="0.0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model-stop-sequences">Stop Sequences</Label>
                        <Input
                          id="model-stop-sequences"
                          placeholder="e.g., ###, END"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>

                </div>
                <DialogFooter>
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button onClick={handleSaveConfig}>Save Configuration</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </TabsContent>

          <TabsContent value="usage" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Tokens</CardTitle>
                  <CardDescription>This month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    214,550
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 18%</span> from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Response Time</CardTitle>
                  <CardDescription>Last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    1.8s
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↓ 12%</span> improved speed
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Model</CardTitle>
                  <CardDescription>By usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold flex items-center">
                    <i className="ri-openai-fill text-green-500 mr-2"></i> GPT-4o
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    64% of total API calls
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Usage Breakdown</CardTitle>
                <CardDescription>
                  Token usage by model and function
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Input Tokens</TableHead>
                      <TableHead>Output Tokens</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <i className="ri-openai-fill text-green-500 mr-2"></i>
                          GPT-4o
                        </div>
                      </TableCell>
                      <TableCell>124,560</TableCell>
                      <TableCell>32,450</TableCell>
                      <TableCell>$4.85</TableCell>
                      <TableCell className="text-right">64%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <i className="ri-reactjs-line text-blue-500 mr-2"></i>
                          Claude 3 Haiku
                        </div>
                      </TableCell>
                      <TableCell>45,200</TableCell>
                      <TableCell>15,780</TableCell>
                      <TableCell>$1.24</TableCell>
                      <TableCell className="text-right">23%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <i className="ri-openai-fill text-green-500 mr-2"></i>
                          Text Embeddings
                        </div>
                      </TableCell>
                      <TableCell>26,750</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>$0.21</TableCell>
                      <TableCell className="text-right">12%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <i className="ri-google-fill text-red-500 mr-2"></i>
                          Gemini Pro
                        </div>
                      </TableCell>
                      <TableCell>2,450</TableCell>
                      <TableCell>1,270</TableCell>
                      <TableCell>$0.06</TableCell>
                      <TableCell className="text-right">1%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <i className="ri-download-line mr-2"></i> Export Usage Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Global Model Settings</CardTitle>
                <CardDescription>
                  Default settings for all AI models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="default-model">Default Model</Label>
                  <Select defaultValue="gpt-4o">
                    <SelectTrigger id="default-model">
                      <SelectValue placeholder="Select default model" />
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
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Model used when no specific model is selected
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="content-filter">Content Filtering</Label>
                    <p className="text-sm text-muted-foreground">
                      Filter unsafe or inappropriate content from responses
                    </p>
                  </div>
                  <Switch id="content-filter" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="model-fallback">Model Fallback</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically fall back to alternative models if primary is unavailable
                    </p>
                  </div>
                  <Switch id="model-fallback" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cache-responses">Cache Responses</Label>
                    <p className="text-sm text-muted-foreground">
                      Cache identical requests to save tokens and improve response time
                    </p>
                  </div>
                  <Switch id="cache-responses" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-system-prompt">Default System Prompt</Label>
                  <Input
                    id="default-system-prompt"
                    defaultValue="You are a helpful assistant working in the AI Knowledge Workspace platform."
                  />
                  <p className="text-xs text-muted-foreground">
                    Applied to all models unless overridden in model-specific settings
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="timeout">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
                      <SelectItem value="120">120 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Maximum time to wait for model responses
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Global Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Keys Management</CardTitle>
                <CardDescription>
                  Manage API keys for different AI providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="openai-api-key">OpenAI API Key</Label>
                  <div className="flex">
                    <Input
                      id="openai-api-key"
                      type="password"
                      value="••••••••••••••••••••••••••••••••"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none border-l-0">
                      Update
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last updated: May 1, 2025
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anthropic-api-key">Anthropic API Key</Label>
                  <div className="flex">
                    <Input
                      id="anthropic-api-key"
                      type="password"
                      value="••••••••••••••••••••••••••••••••"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none border-l-0">
                      Update
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last updated: April 15, 2025
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="google-api-key">Google AI API Key</Label>
                  <div className="flex">
                    <Input
                      id="google-api-key"
                      type="password"
                      value="••••••••••••••••••••••••••••••••"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none border-l-0">
                      Update
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last updated: April 28, 2025
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-api-key">Meta AI API Key</Label>
                  <div className="flex">
                    <Input
                      id="meta-api-key"
                      type="text"
                      placeholder="No API key configured"
                      className="rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none border-l-0">
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}