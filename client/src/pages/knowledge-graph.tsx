import React, { useState } from "react";
import MainLayout from "@/components/main-layout";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Sample knowledge graph data
const sampleKnowledgeGraph = {
  title: "AI Ethics Relationships",
  description: "Graph showing relationships between key AI ethics concepts",
  nodes: [
    { id: "1", label: "Ethics", position: { x: "50%", y: "30%" }, color: "#4285F4" },
    { id: "2", label: "Fairness", position: { x: "30%", y: "50%" }, color: "#EA4335" },
    { id: "3", label: "Transparency", position: { x: "70%", y: "50%" }, color: "#FBBC05" },
    { id: "4", label: "Accountability", position: { x: "40%", y: "70%" }, color: "#34A853" },
    { id: "5", label: "Privacy", position: { x: "60%", y: "70%" }, color: "#8E24AA" },
  ],
  edges: [
    { source: "1", target: "2" },
    { source: "1", target: "3" },
    { source: "2", target: "4" },
    { source: "3", target: "5" },
    { source: "4", target: "5" },
  ],
};

// Sample knowledge graph list
const sampleGraphs = [
  {
    id: 1,
    title: "AI Ethics Relationships",
    description: "Graph showing relationships between key AI ethics concepts",
    nodeCount: 5,
    edgeCount: 5,
    workspaceName: "AI Ethics Research",
    createdAt: "2 days ago",
    updatedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Machine Learning Concepts",
    description: "Core concepts and algorithms in machine learning",
    nodeCount: 12,
    edgeCount: 18,
    workspaceName: "ML Course Notes",
    createdAt: "1 week ago",
    updatedAt: "3 days ago",
  },
  {
    id: 3,
    title: "Product Architecture",
    description: "Architecture and components for AI product",
    nodeCount: 8,
    edgeCount: 10,
    workspaceName: "Product Requirements",
    createdAt: "5 days ago",
    updatedAt: "1 day ago",
  },
];

// Simple SVG knowledge graph component
const KnowledgeGraphView = ({ nodes, edges }: { nodes: any[]; edges: any[] }) => {
  return (
    <div className="w-full h-[400px] relative border rounded-md overflow-hidden bg-muted/20">
      <svg width="100%" height="100%" className="knowledge-graph">
        {/* Render edges first so they appear behind nodes */}
        {edges.map((edge, index) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          // Convert percentage positions to SVG coordinates
          const sourceX = parseFloat(sourceNode.position.x) / 100;
          const sourceY = parseFloat(sourceNode.position.y) / 100;
          const targetX = parseFloat(targetNode.position.x) / 100;
          const targetY = parseFloat(targetNode.position.y) / 100;

          return (
            <line
              key={`edge-${index}`}
              x1={`${sourceX * 100}%`}
              y1={`${sourceY * 100}%`}
              x2={`${targetX * 100}%`}
              y2={`${targetY * 100}%`}
              stroke="#CBD5E0"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
          );
        })}

        {/* Render nodes */}
        {nodes.map((node) => {
          const x = node.position.x;
          const y = node.position.y;
          return (
            <g key={node.id} transform={`translate(${x}, ${y})`}>
              <circle
                cx="0"
                cy="0"
                r="30"
                fill={node.color}
                fillOpacity="0.2"
                stroke={node.color}
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="0"
                r="25"
                fill={node.color}
                fillOpacity="0.4"
              />
              <text
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#374151"
                fontSize="12px"
                fontWeight="500"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default function KnowledgeGraphPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("viewer");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGraph, setSelectedGraph] = useState(sampleGraphs[0]);
  
  // Filter graphs based on search query
  const filteredGraphs = sampleGraphs.filter(
    (graph) =>
      graph.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      graph.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      graph.workspaceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewGraph = (graph: any) => {
    setSelectedGraph(graph);
    setActiveTab("viewer");
    
    toast({
      title: "Graph loaded",
      description: `${graph.title} has been loaded successfully.`,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto pb-8">
        <div className="py-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Knowledge Graphs</h2>
              <p className="text-muted-foreground">
                Visualize connections between concepts and ideas
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full md:w-64">
                <i className="ri-search-line absolute left-2.5 top-2.5 text-muted-foreground"></i>
                <Input
                  type="search"
                  placeholder="Search graphs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <i className="ri-mind-map mr-2"></i> New Graph
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create Knowledge Graph</DialogTitle>
                    <DialogDescription>
                      Generate a new knowledge graph from existing notes
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="graph-title">Graph Title</Label>
                      <Input
                        id="graph-title"
                        placeholder="Enter a title for your graph"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="workspace">Source Workspace</Label>
                      <Select>
                        <SelectTrigger id="workspace">
                          <SelectValue placeholder="Select a workspace" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">AI Ethics Research</SelectItem>
                          <SelectItem value="2">ML Course Notes</SelectItem>
                          <SelectItem value="3">Product Requirements</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="source-type">Source Type</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="source-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Notes & Documents</SelectItem>
                          <SelectItem value="notes">Notes Only</SelectItem>
                          <SelectItem value="documents">Documents Only</SelectItem>
                          <SelectItem value="selected">Selected Files</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="ai-model">AI Model</Label>
                      <Select defaultValue="gpt4o">
                        <SelectTrigger id="ai-model">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt4o">
                            <div className="flex items-center">
                              <i className="ri-openai-fill mr-2"></i>
                              GPT-4o
                            </div>
                          </SelectItem>
                          <SelectItem value="gemini">
                            <div className="flex items-center">
                              <i className="ri-google-fill mr-2"></i>
                              Gemini Pro
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>
                      <i className="ri-magic-line mr-2"></i> Generate Graph
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="viewer">Graph Viewer</TabsTrigger>
              <TabsTrigger value="library">Graph Library</TabsTrigger>
              <TabsTrigger value="editor">Graph Editor</TabsTrigger>
            </TabsList>

            <TabsContent value="viewer" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedGraph.title}</CardTitle>
                      <CardDescription>{selectedGraph.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <i className="ri-download-line mr-1"></i> Export
                      </Button>
                      <Button size="sm">
                        <i className="ri-edit-line mr-1"></i> Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <KnowledgeGraphView 
                    nodes={sampleKnowledgeGraph.nodes} 
                    edges={sampleKnowledgeGraph.edges} 
                  />
                </CardContent>
                <CardFooter className="pt-3 border-t flex justify-between items-center bg-muted/20">
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <div>{selectedGraph.nodeCount} nodes</div>
                    <div className="border-l pl-3">{selectedGraph.edgeCount} connections</div>
                    <div className="border-l pl-3">
                      <i className="ri-time-line mr-1"></i>
                      Updated {selectedGraph.updatedAt}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <i className="ri-zoom-in-line mr-1"></i> Zoom
                    </Button>
                    <Button size="sm" variant="outline">
                      <i className="ri-fullscreen-line mr-1"></i> Fullscreen
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Graph Insights</CardTitle>
                  <CardDescription>AI-generated insights based on this knowledge graph</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-medium flex items-center">
                      <i className="ri-lightbulb-line mr-2 text-amber-500"></i>
                      Key Concepts
                    </h4>
                    <p className="text-sm">
                      The central concept in this graph is <strong>Ethics</strong>, which connects directly to <strong>Fairness</strong> and <strong>Transparency</strong>. 
                      The graph shows that <strong>Accountability</strong> stems from <strong>Fairness</strong>, while <strong>Privacy</strong> is connected to <strong>Transparency</strong>.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-medium flex items-center">
                      <i className="ri-link-m mr-2 text-blue-500"></i>
                      Key Relationships
                    </h4>
                    <p className="text-sm">
                      The graph reveals an important relationship between <strong>Accountability</strong> and <strong>Privacy</strong>, suggesting these concepts are interdependent
                      in AI ethics frameworks. The connection from <strong>Ethics</strong> to both <strong>Fairness</strong> and <strong>Transparency</strong> shows these are foundational ethical principles.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-medium flex items-center">
                      <i className="ri-question-answer-line mr-2 text-green-500"></i>
                      Suggested Questions
                    </h4>
                    <ul className="text-sm space-y-1 list-disc list-inside ml-1">
                      <li>How does transparency in AI systems contribute to privacy protections?</li>
                      <li>What mechanisms ensure accountability in fair AI systems?</li>
                      <li>How can ethical frameworks balance transparency requirements with privacy concerns?</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="library" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGraphs.map((graph) => (
                  <Card key={graph.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{graph.title}</CardTitle>
                      <CardDescription>{graph.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center mb-3">
                        <i className="ri-mind-map text-6xl text-muted-foreground/50"></i>
                      </div>
                      <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-2">
                        <Badge variant="outline">{graph.nodeCount} nodes</Badge>
                        <Badge variant="outline">{graph.edgeCount} connections</Badge>
                        <div className="ml-auto flex items-center">
                          <i className="ri-time-line mr-1"></i> {graph.updatedAt}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 border-t flex justify-between gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 px-2"
                      >
                        <i className="ri-delete-bin-line mr-1"></i> Delete
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 px-2"
                        >
                          <i className="ri-edit-line mr-1"></i> Edit
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs h-8 px-2"
                          onClick={() => handleViewGraph(graph)}
                        >
                          <i className="ri-eye-line mr-1"></i> View
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredGraphs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <i className="ri-search-line text-3xl text-muted-foreground"></i>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No graphs found</h3>
                  <p className="text-muted-foreground max-w-sm">
                    No knowledge graphs match your search criteria. Try with a different
                    search term or create a new graph.
                  </p>
                  <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                    <i className="ri-mind-map mr-2"></i> Create New Graph
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="editor" className="space-y-4 mt-4">
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>Graph Editor</CardTitle>
                  <CardDescription>
                    The graph editor feature is coming soon
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-muted p-8 mb-4">
                    <i className="ri-tools-line text-4xl text-muted-foreground"></i>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md text-center">
                    We're working on an advanced graph editor that will allow you
                    to create and modify knowledge graphs directly. Stay tuned for
                    updates!
                  </p>
                  <Button className="mt-6" variant="outline" onClick={() => setActiveTab("viewer")}>
                    <i className="ri-arrow-left-line mr-2"></i> Back to Viewer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}