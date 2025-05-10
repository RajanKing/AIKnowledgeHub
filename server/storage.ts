import { 
  users, type User, type InsertUser, 
  workspaces, type Workspace, type InsertWorkspace,
  files, type File, type InsertFile,
  aiModels, type AIModel, type InsertAIModel,
  templates, type Template, type InsertTemplate,
  knowledgeGraphs, type KnowledgeGraph, type InsertKnowledgeGraph,
  vectorDatabases, type VectorDatabase, type InsertVectorDatabase,
  conversations, type Conversation, type InsertConversation,
  billingRecords, type BillingRecord, type InsertBillingRecord
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User>;
  
  // Workspace methods
  getWorkspaces(): Promise<Workspace[]>;
  getWorkspace(id: number): Promise<Workspace | undefined>;
  getWorkspacesByUser(userId: number): Promise<Workspace[]>;
  createWorkspace(workspace: InsertWorkspace): Promise<Workspace>;
  
  // File methods
  getFiles(): Promise<File[]>;
  getFile(id: number): Promise<File | undefined>;
  getFilesByWorkspace(workspaceId: number): Promise<File[]>;
  createFile(file: InsertFile): Promise<File>;
  
  // AI Model methods
  getAIModels(): Promise<AIModel[]>;
  getAIModel(id: number): Promise<AIModel | undefined>;
  createAIModel(model: InsertAIModel): Promise<AIModel>;
  updateAIModel(id: number, updates: Partial<InsertAIModel>): Promise<AIModel>;
  
  // Template methods
  getTemplates(): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  
  // Knowledge Graph methods
  getKnowledgeGraphs(userId: number): Promise<KnowledgeGraph[]>;
  getKnowledgeGraph(id: number): Promise<KnowledgeGraph | undefined>;
  createKnowledgeGraph(graph: InsertKnowledgeGraph): Promise<KnowledgeGraph>;
  
  // Vector Database methods
  getVectorDatabases(userId: number): Promise<VectorDatabase[]>;
  getVectorDatabase(id: number): Promise<VectorDatabase | undefined>;
  createVectorDatabase(db: InsertVectorDatabase): Promise<VectorDatabase>;
  
  // Conversation methods
  getConversations(userId: number): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: number, updates: Partial<InsertConversation>): Promise<Conversation>;
  
  // Billing methods
  getBillingRecords(userId: number): Promise<BillingRecord[]>;
  createBillingRecord(record: InsertBillingRecord): Promise<BillingRecord>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workspaces: Map<number, Workspace>;
  private files: Map<number, File>;
  private aiModels: Map<number, AIModel>;
  private templates: Map<number, Template>;
  private knowledgeGraphs: Map<number, KnowledgeGraph>;
  private vectorDatabases: Map<number, VectorDatabase>;
  private conversations: Map<number, Conversation>;
  private billingRecords: Map<number, BillingRecord>;
  
  private userIdCounter: number;
  private workspaceIdCounter: number;
  private fileIdCounter: number;
  private aiModelIdCounter: number;
  private templateIdCounter: number;
  private knowledgeGraphIdCounter: number;
  private vectorDatabaseIdCounter: number;
  private conversationIdCounter: number;
  private billingRecordIdCounter: number;

  constructor() {
    this.users = new Map();
    this.workspaces = new Map();
    this.files = new Map();
    this.aiModels = new Map();
    this.templates = new Map();
    this.knowledgeGraphs = new Map();
    this.vectorDatabases = new Map();
    this.conversations = new Map();
    this.billingRecords = new Map();
    
    this.userIdCounter = 1;
    this.workspaceIdCounter = 1;
    this.fileIdCounter = 1;
    this.aiModelIdCounter = 1;
    this.templateIdCounter = 1;
    this.knowledgeGraphIdCounter = 1;
    this.vectorDatabaseIdCounter = 1;
    this.conversationIdCounter = 1;
    this.billingRecordIdCounter = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }
  
  private initSampleData() {
    // Sample users
    const sampleUsers: InsertUser[] = [
      { 
        username: "sarahchen", 
        name: "Sarah Chen", 
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        email: "sarah@example.com",
        bio: "AI researcher and enthusiast",
        role: "admin",
        plan: "premium",
        usageTokens: 5000,
        preferences: { theme: "dark", notifications: true }
      },
      { 
        username: "michaelscott", 
        name: "Michael Scott", 
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        email: "michael@example.com",
        bio: "Business professional exploring AI",
        role: "user",
        plan: "free",
        usageTokens: 1000,
        preferences: { theme: "light", notifications: false }
      }
    ];
    
    sampleUsers.forEach(user => this.createUser(user));
    
    // Sample workspaces
    const sampleWorkspaces: InsertWorkspace[] = [
      { 
        name: "AI Ethics Research", 
        description: "Research on ethical considerations in AI development and deployment",
        colorId: 0,
        projectType: 0,
        fileCount: 3,
        views: 24,
        lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isPrivate: false,
        ownerId: 1,
        collaborators: ["2"]
      },
      { 
        name: "ML Course Notes", 
        description: "Notes and resources for the machine learning course",
        colorId: 1,
        projectType: 1,
        fileCount: 2,
        views: 17,
        lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isPrivate: true,
        ownerId: 1,
        collaborators: []
      },
      { 
        name: "Product Requirements", 
        description: "Product requirements and specifications for the AI assistant",
        colorId: 2,
        projectType: 2,
        fileCount: 5,
        views: 36,
        lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isPrivate: false,
        ownerId: 2,
        collaborators: ["1"]
      }
    ];
    
    sampleWorkspaces.forEach(workspace => this.createWorkspace(workspace));
    
    // Sample files for the AI Ethics Research workspace
    const sampleFiles: InsertFile[] = [
      {
        name: "AI Ethics Framework.pdf",
        type: "pdf",
        size: 1.2,
        preview: null,
        workspaceId: 1,
        uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        duration: null,
        isActive: true
      },
      {
        name: "Ethics Panel Discussion",
        type: "youtube",
        size: 0,
        preview: null,
        workspaceId: 1,
        uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        duration: "14:32",
        isActive: false
      },
      {
        name: "Interview Transcripts.docx",
        type: "docx",
        size: 0.54,
        preview: null,
        workspaceId: 1,
        uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        duration: null,
        isActive: false
      }
    ];
    
    sampleFiles.forEach(file => this.createFile(file));
    
    // Sample AI models
    const sampleAIModels: InsertAIModel[] = [
      {
        name: "GPT-4o",
        provider: "OpenAI",
        icon: "ri-openai-fill",
        color: "green",
        isActive: true
      },
      {
        name: "Gemini Pro",
        provider: "Google",
        icon: "ri-google-fill",
        color: "blue",
        isActive: false
      },
      {
        name: "Llama 3",
        provider: "Meta",
        icon: "ri-meta-fill",
        color: "purple",
        isActive: false
      },
      {
        name: "Claude 3",
        provider: "Anthropic",
        icon: "ri-ai-generate",
        color: "orange",
        isActive: false
      },
      {
        name: "Ollama (Local)",
        provider: "Local",
        icon: "ri-code-box-line",
        color: "gray",
        isActive: false
      }
    ];
    
    sampleAIModels.forEach(model => this.createAIModel(model));
    
    // Sample templates
    const sampleTemplates: InsertTemplate[] = [
      {
        name: "Research Summary",
        description: "Analyze and extract key points from academic papers",
        icon: "ri-file-text-line",
        color: "blue"
      },
      {
        name: "Concept Map",
        description: "Visualize connections between ideas and topics",
        icon: "ri-mind-map",
        color: "purple"
      },
      {
        name: "Video Notes",
        description: "Extract and organize key points from video content",
        icon: "ri-youtube-line",
        color: "red"
      },
      {
        name: "Study Guide",
        description: "Create organized study materials with flashcards",
        icon: "ri-book-2-line",
        color: "green"
      }
    ];
    
    sampleTemplates.forEach((template, index) => {
      const id = index + 1;
      this.templates.set(id, { ...template, id });
    });
    
    // Sample knowledge graphs
    const sampleKnowledgeGraphs: InsertKnowledgeGraph[] = [
      {
        title: "AI Ethics Relationships",
        description: "Graph showing relationships between key AI ethics concepts",
        workspaceId: 1,
        nodes: JSON.stringify([
          { id: "1", label: "Ethics", position: { x: "50%", y: "30%" }, color: "#4285F4" },
          { id: "2", label: "Fairness", position: { x: "30%", y: "50%" }, color: "#EA4335" },
          { id: "3", label: "Transparency", position: { x: "70%", y: "50%" }, color: "#FBBC05" },
          { id: "4", label: "Accountability", position: { x: "40%", y: "70%" }, color: "#34A853" },
          { id: "5", label: "Privacy", position: { x: "60%", y: "70%" }, color: "#8E24AA" }
        ]),
        edges: JSON.stringify([
          { source: "1", target: "2" },
          { source: "1", target: "3" },
          { source: "2", target: "4" },
          { source: "3", target: "5" },
          { source: "4", target: "5" }
        ]),
        userId: 1
      }
    ];
    
    sampleKnowledgeGraphs.forEach(graph => this.createKnowledgeGraph(graph));
    
    // Sample vector databases
    const sampleVectorDatabases: InsertVectorDatabase[] = [
      {
        name: "Research Papers",
        description: "Vector database for research papers and academic content",
        provider: "Pinecone",
        settings: JSON.stringify({ dimensions: 1536, metric: "cosine" }),
        vectorCount: 1250,
        userId: 1
      },
      {
        name: "Course Materials",
        description: "Vector database for course materials and lecture notes",
        provider: "Chroma",
        settings: JSON.stringify({ dimensions: 768, metric: "cosine" }),
        vectorCount: 865,
        userId: 1
      }
    ];
    
    sampleVectorDatabases.forEach(db => this.createVectorDatabase(db));
    
    // Sample conversations
    const sampleConversations: InsertConversation[] = [
      {
        title: "AI Ethics Discussion",
        messages: JSON.stringify([
          { role: "user", content: "What are the key principles of AI ethics?", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
          { role: "assistant", content: "The key principles of AI ethics include fairness, transparency, privacy, accountability, and safety. These principles guide the development and deployment of AI systems to ensure they benefit humanity.", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
          { role: "user", content: "How can we ensure fairness in AI systems?", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
          { role: "assistant", content: "Ensuring fairness in AI systems involves diverse training data, regular bias testing, interdisciplinary teams, clear documentation, and ongoing monitoring after deployment.", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
        ]),
        modelId: 1,
        userId: 1
      }
    ];
    
    sampleConversations.forEach(conversation => this.createConversation(conversation));
    
    // Sample billing records
    const sampleBillingRecords: InsertBillingRecord[] = [
      {
        userId: 1,
        amount: 19.99,
        description: "Premium Plan Subscription - Monthly",
        status: "paid",
        invoiceId: "INV-2024-05001"
      },
      {
        userId: 1,
        amount: 4.50,
        description: "API Usage - 1000 tokens",
        status: "paid",
        invoiceId: "INV-2024-05002"
      }
    ];
    
    sampleBillingRecords.forEach(record => this.createBillingRecord(record));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
      role: insertUser.role || "user",
      plan: insertUser.plan || "free",
      usageTokens: insertUser.usageTokens || 0,
      email: insertUser.email || null,
      bio: insertUser.bio || null,
      stripeCustomerId: insertUser.stripeCustomerId || null,
      stripeSubscriptionId: insertUser.stripeSubscriptionId || null,
      preferences: insertUser.preferences || null
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    return this.updateUser(userId, { stripeCustomerId: customerId });
  }
  
  async updateUserStripeInfo(userId: number, info: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User> {
    return this.updateUser(userId, {
      stripeCustomerId: info.stripeCustomerId,
      stripeSubscriptionId: info.stripeSubscriptionId
    });
  }
  
  // Workspace methods
  async getWorkspaces(): Promise<Workspace[]> {
    return Array.from(this.workspaces.values());
  }
  
  async getWorkspace(id: number): Promise<Workspace | undefined> {
    return this.workspaces.get(id);
  }
  
  async getWorkspacesByUser(userId: number): Promise<Workspace[]> {
    return Array.from(this.workspaces.values()).filter(
      workspace => workspace.ownerId === userId || 
        (workspace.collaborators && workspace.collaborators.includes(userId.toString()))
    );
  }
  
  async createWorkspace(insertWorkspace: InsertWorkspace): Promise<Workspace> {
    const id = this.workspaceIdCounter++;
    const workspace: Workspace = { 
      ...insertWorkspace, 
      id,
      description: insertWorkspace.description || null,
      colorId: insertWorkspace.colorId || 0,
      projectType: insertWorkspace.projectType || 0,
      fileCount: insertWorkspace.fileCount || 0,
      views: insertWorkspace.views || 0,
      lastModified: insertWorkspace.lastModified || new Date(),
      isPrivate: insertWorkspace.isPrivate || false,
      collaborators: insertWorkspace.collaborators || null
    };
    this.workspaces.set(id, workspace);
    return workspace;
  }
  
  // File methods
  async getFiles(): Promise<File[]> {
    return Array.from(this.files.values());
  }
  
  async getFile(id: number): Promise<File | undefined> {
    return this.files.get(id);
  }
  
  async getFilesByWorkspace(workspaceId: number): Promise<File[]> {
    return Array.from(this.files.values()).filter(
      file => file.workspaceId === workspaceId
    );
  }
  
  async createFile(insertFile: InsertFile): Promise<File> {
    const id = this.fileIdCounter++;
    const file: File = { 
      ...insertFile, 
      id,
      size: insertFile.size || 0,
      preview: insertFile.preview || null,
      uploadedAt: insertFile.uploadedAt || new Date(),
      duration: insertFile.duration || null,
      isActive: insertFile.isActive || false
    };
    this.files.set(id, file);
    return file;
  }
  
  // AI Model methods
  async getAIModels(): Promise<AIModel[]> {
    return Array.from(this.aiModels.values());
  }
  
  async getAIModel(id: number): Promise<AIModel | undefined> {
    return this.aiModels.get(id);
  }
  
  async createAIModel(model: InsertAIModel): Promise<AIModel> {
    const id = this.aiModelIdCounter++;
    const aiModel: AIModel = {
      ...model,
      id,
      isActive: model.isActive !== undefined ? model.isActive : false
    };
    this.aiModels.set(id, aiModel);
    return aiModel;
  }
  
  async updateAIModel(id: number, updates: Partial<InsertAIModel>): Promise<AIModel> {
    const model = this.aiModels.get(id);
    if (!model) {
      throw new Error(`AI Model with id ${id} not found`);
    }
    
    const updatedModel = { ...model, ...updates };
    this.aiModels.set(id, updatedModel);
    return updatedModel;
  }
  
  // Template methods
  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }
  
  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }
  
  // Knowledge Graph methods
  async getKnowledgeGraphs(userId: number): Promise<KnowledgeGraph[]> {
    return Array.from(this.knowledgeGraphs.values())
      .filter(graph => graph.userId === userId);
  }
  
  async getKnowledgeGraph(id: number): Promise<KnowledgeGraph | undefined> {
    return this.knowledgeGraphs.get(id);
  }
  
  async createKnowledgeGraph(graph: InsertKnowledgeGraph): Promise<KnowledgeGraph> {
    const id = this.knowledgeGraphIdCounter++;
    const knowledgeGraph: KnowledgeGraph = {
      ...graph,
      id,
      createdAt: graph.createdAt || new Date(),
      updatedAt: graph.updatedAt || new Date()
    };
    this.knowledgeGraphs.set(id, knowledgeGraph);
    return knowledgeGraph;
  }
  
  // Vector Database methods
  async getVectorDatabases(userId: number): Promise<VectorDatabase[]> {
    return Array.from(this.vectorDatabases.values())
      .filter(db => db.userId === userId);
  }
  
  async getVectorDatabase(id: number): Promise<VectorDatabase | undefined> {
    return this.vectorDatabases.get(id);
  }
  
  async createVectorDatabase(db: InsertVectorDatabase): Promise<VectorDatabase> {
    const id = this.vectorDatabaseIdCounter++;
    const vectorDb: VectorDatabase = {
      ...db,
      id,
      createdAt: new Date(),
      vectorCount: db.vectorCount || 0
    };
    this.vectorDatabases.set(id, vectorDb);
    return vectorDb;
  }
  
  // Conversation methods
  async getConversations(userId: number): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(convo => convo.userId === userId);
  }
  
  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }
  
  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const id = this.conversationIdCounter++;
    const convo: Conversation = {
      ...conversation,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.conversations.set(id, convo);
    return convo;
  }
  
  async updateConversation(id: number, updates: Partial<InsertConversation>): Promise<Conversation> {
    const conversation = this.conversations.get(id);
    if (!conversation) {
      throw new Error(`Conversation with id ${id} not found`);
    }
    
    const updatedConversation = { 
      ...conversation, 
      ...updates,
      updatedAt: new Date()
    };
    this.conversations.set(id, updatedConversation);
    return updatedConversation;
  }
  
  // Billing methods
  async getBillingRecords(userId: number): Promise<BillingRecord[]> {
    return Array.from(this.billingRecords.values())
      .filter(record => record.userId === userId);
  }
  
  async createBillingRecord(record: InsertBillingRecord): Promise<BillingRecord> {
    const id = this.billingRecordIdCounter++;
    const billingRecord: BillingRecord = {
      ...record,
      id,
      createdAt: new Date()
    };
    this.billingRecords.set(id, billingRecord);
    return billingRecord;
  }
}

export const storage = new MemStorage();
