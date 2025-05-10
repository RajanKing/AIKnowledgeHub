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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Sample vector database data
const vectorDatabases = [
  {
    id: 1,
    name: "Research Papers",
    description: "Vector database for research papers and academic content",
    provider: "Pinecone",
    vectorCount: 1250,
    dimensions: 1536,
    metric: "cosine",
    createdAt: "2 weeks ago",
    status: "Active",
  },
  {
    id: 2,
    name: "Course Materials",
    description: "Vector database for course materials and lecture notes",
    provider: "Chroma",
    vectorCount: 865,
    dimensions: 768,
    metric: "cosine",
    createdAt: "3 weeks ago",
    status: "Active",
  },
  {
    id: 3,
    name: "Product Documentation",
    description: "Vector database for product documentation and requirements",
    provider: "Qdrant",
    vectorCount: 425,
    dimensions: 1024,
    metric: "dot",
    createdAt: "1 month ago",
    status: "Inactive",
  },
];

// Provider options for the add database dialog
const providerOptions = [
  { label: "Pinecone", value: "pinecone", description: "Production-grade vector database" },
  { label: "Chroma", value: "chroma", description: "Open-source embedding database" },
  { label: "Qdrant", value: "qdrant", description: "Vector search database" },
  { label: "Milvus", value: "milvus", description: "Open-source vector database" },
  { label: "Weaviate", value: "weaviate", description: "Open-source vector search engine" },
  { label: "Custom", value: "custom", description: "Custom vector database connection" },
];

export default function DatabasesPage() {
  const { toast } = useToast();
  const [databases, setDatabases] = useState(vectorDatabases);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  // Filter databases based on search query
  const filteredDatabases = databases.filter(
    (db) =>
      db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (database: any) => {
    setSelectedDatabase(database);
    setShowDetailsDialog(true);
  };

  const handleToggleStatus = (id: number) => {
    setDatabases(
      databases.map((db) =>
        db.id === id ? { ...db, status: db.status === "Active" ? "Inactive" : "Active" } : db
      )
    );

    const database = databases.find((db) => db.id === id);
    toast({
      title: `Database ${database?.status === "Active" ? "deactivated" : "activated"}`,
      description: `${database?.name} has been ${
        database?.status === "Active" ? "deactivated" : "activated"
      } successfully.`,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto pb-8">
        <div className="py-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Vector Databases</h2>
              <p className="text-muted-foreground">
                Manage your vector embeddings and semantic search databases
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full md:w-64">
                <i className="ri-search-line absolute left-2.5 top-2.5 text-muted-foreground"></i>
                <Input
                  type="search"
                  placeholder="Search databases..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <i className="ri-database-2-line mr-2"></i> Add Database
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Vector Database</DialogTitle>
                    <DialogDescription>
                      Connect to a new vector database for semantic search
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="db-name">Database Name</Label>
                      <Input
                        id="db-name"
                        placeholder="e.g., Research Papers, Customer Support"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="provider">Provider</Label>
                      <Select>
                        <SelectTrigger id="provider">
                          <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {providerOptions.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              <div>
                                <div className="font-medium">{provider.label}</div>
                                <div className="text-xs text-muted-foreground">{provider.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="connection-string">Connection String</Label>
                      <Input
                        id="connection-string"
                        type="password"
                        placeholder="Enter connection string or API key"
                      />
                      <p className="text-xs text-muted-foreground">
                        Connection details are securely stored and encrypted.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of this database"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="dimensions">Vector Dimensions</Label>
                        <Input
                          id="dimensions"
                          type="number"
                          placeholder="e.g., 1536"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="metric">Distance Metric</Label>
                        <Select defaultValue="cosine">
                          <SelectTrigger id="metric">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cosine">Cosine</SelectItem>
                            <SelectItem value="euclidean">Euclidean</SelectItem>
                            <SelectItem value="dot">Dot Product</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>
                      <i className="ri-database-2-line mr-2"></i> Connect Database
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Connected Databases</CardTitle>
              <CardDescription>
                Vector databases for semantic search and embedding storage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead className="hidden md:table-cell">Vectors</TableHead>
                    <TableHead className="hidden md:table-cell">Dimensions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDatabases.map((database) => (
                    <TableRow key={database.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{database.name}</span>
                          <span className="text-xs text-muted-foreground hidden sm:inline-block">
                            Created {database.createdAt}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {database.provider}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {database.vectorCount.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {database.dimensions}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              database.status === "Active"
                                ? "bg-green-500"
                                : "bg-amber-500"
                            }`}
                          ></div>
                          <span className="hidden sm:inline-block">{database.status}</span>
                          <Switch
                            checked={database.status === "Active"}
                            onCheckedChange={() => handleToggleStatus(database.id)}
                            className="ml-auto md:ml-0"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(database)}
                          >
                            <i className="ri-eye-line"></i>
                            <span className="sr-only">View details</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <i className="ri-pencil-line"></i>
                            <span className="sr-only">Edit</span>
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

              {filteredDatabases.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <i className="ri-search-line text-3xl text-muted-foreground"></i>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No databases found</h3>
                  <p className="text-muted-foreground max-w-sm">
                    No vector databases match your search criteria. Try with a different
                    search term or add a new database.
                  </p>
                  <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                    <i className="ri-database-2-line mr-2"></i> Add Database
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Database Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Vectors</CardTitle>
                <CardDescription>Across all databases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {filteredDatabases
                    .reduce((sum, db) => sum + db.vectorCount, 0)
                    .toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 12%</span> from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Databases</CardTitle>
                <CardDescription>Currently connected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {filteredDatabases.filter((db) => db.status === "Active").length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Out of {filteredDatabases.length} total databases
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Dimensions</CardTitle>
                <CardDescription>Vector size</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(
                    filteredDatabases.reduce((sum, db) => sum + db.dimensions, 0) /
                      filteredDatabases.length
                  ) || 0}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Most common: 1536 dimensions
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Database Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedDatabase?.name}</DialogTitle>
            <DialogDescription>
              {selectedDatabase?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Provider</h4>
                <div className="text-sm flex items-center">
                  <Badge variant="outline" className="font-normal">
                    {selectedDatabase?.provider}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Status</h4>
                <div className="text-sm flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      selectedDatabase?.status === "Active"
                        ? "bg-green-500"
                        : "bg-amber-500"
                    }`}
                  ></div>
                  {selectedDatabase?.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Vector Count</h4>
                <div className="text-sm">
                  {selectedDatabase?.vectorCount.toLocaleString()}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Dimensions</h4>
                <div className="text-sm">{selectedDatabase?.dimensions}</div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Distance Metric</h4>
                <div className="text-sm capitalize">{selectedDatabase?.metric}</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Connection</h4>
              <div className="text-sm p-2 bg-muted rounded-md font-mono text-xs overflow-x-auto">
                <code>••••••••••••••••••••••••••••••••••••••••</code>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
              <div className="space-y-2">
                <div className="text-xs flex justify-between">
                  <span>Vector count updated</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="text-xs flex justify-between">
                  <span>New embeddings added</span>
                  <span className="text-muted-foreground">6 hours ago</span>
                </div>
                <div className="text-xs flex justify-between">
                  <span>Database queried</span>
                  <span className="text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline">
              <i className="ri-search-line mr-1"></i> Query Database
            </Button>
            <Button>
              <i className="ri-refresh-line mr-1"></i> Refresh Metrics
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}