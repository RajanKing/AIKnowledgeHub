import { pgTable, text, serial, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"),
  name: text("name").notNull(),
  avatar: text("avatar"),
  email: text("email"),
  bio: text("bio"),
  role: text("role").default("user"),
  plan: text("plan").default("free"),
  usageTokens: integer("usage_tokens").default(0),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  preferences: jsonb("preferences"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  avatar: true,
  email: true,
  bio: true,
  role: true,
  plan: true,
  usageTokens: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
  preferences: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Workspace schema
export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  colorId: integer("color_id").notNull().default(0),
  projectType: integer("project_type").notNull().default(0),
  fileCount: integer("file_count").notNull().default(0),
  views: integer("views").notNull().default(0),
  lastModified: timestamp("last_modified").notNull().defaultNow(),
  isPrivate: boolean("is_private").notNull().default(false),
  ownerId: integer("owner_id").notNull(),
  collaborators: text("collaborators").array(),
});

export const insertWorkspaceSchema = createInsertSchema(workspaces).pick({
  name: true,
  description: true,
  colorId: true,
  projectType: true,
  fileCount: true,
  views: true,
  lastModified: true,
  isPrivate: true,
  ownerId: true,
  collaborators: true,
});

export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;
export type Workspace = typeof workspaces.$inferSelect;

// File schema
export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: real("size").notNull().default(0),
  preview: text("preview"),
  workspaceId: integer("workspace_id").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  duration: text("duration"),
  isActive: boolean("is_active").notNull().default(false),
});

export const insertFileSchema = createInsertSchema(files).pick({
  name: true,
  type: true,
  size: true,
  preview: true,
  workspaceId: true,
  uploadedAt: true,
  duration: true,
  isActive: true,
});

export type InsertFile = z.infer<typeof insertFileSchema>;
export type File = typeof files.$inferSelect;

// AI Model schema
export const aiModels = pgTable("ai_models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  isActive: boolean("is_active").notNull().default(false),
});

export const insertAIModelSchema = createInsertSchema(aiModels).pick({
  name: true,
  provider: true,
  icon: true,
  color: true,
  isActive: true,
});

export type InsertAIModel = z.infer<typeof insertAIModelSchema>;
export type AIModel = typeof aiModels.$inferSelect;

// Template schema
export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const insertTemplateSchema = createInsertSchema(templates).pick({
  name: true,
  description: true,
  icon: true,
  color: true,
});

export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

// Summary schema
export const summaries = pgTable("summaries", {
  id: serial("id").primaryKey(),
  fileId: integer("file_id").notNull(),
  content: text("content").notNull(),
  generatedAt: timestamp("generated_at").notNull().defaultNow(),
  modelId: integer("model_id").notNull(),
  length: text("length").notNull().default("brief"),
});

export const insertSummarySchema = createInsertSchema(summaries).pick({
  fileId: true,
  content: true,
  generatedAt: true,
  modelId: true,
  length: true,
});

export type InsertSummary = z.infer<typeof insertSummarySchema>;
export type Summary = typeof summaries.$inferSelect;

// MindMap schema
export const mindMaps = pgTable("mind_maps", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  fileId: integer("file_id").notNull(),
  nodes: text("nodes").notNull(),
  connections: text("connections").notNull(),
  generatedAt: timestamp("generated_at").notNull().defaultNow(),
  modelId: integer("model_id").notNull(),
});

export const insertMindMapSchema = createInsertSchema(mindMaps).pick({
  title: true,
  fileId: true,
  nodes: true,
  connections: true,
  generatedAt: true,
  modelId: true,
});

export type InsertMindMap = z.infer<typeof insertMindMapSchema>;
export type MindMap = typeof mindMaps.$inferSelect;

// Question/Answer schema
export const questionAnswers = pgTable("question_answers", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sources: text("sources").array(),
  workspaceId: integer("workspace_id").notNull(),
  generatedAt: timestamp("generated_at").notNull().defaultNow(),
  modelId: integer("model_id").notNull(),
});

export const insertQASchema = createInsertSchema(questionAnswers).pick({
  question: true,
  answer: true,
  sources: true,
  workspaceId: true,
  generatedAt: true,
  modelId: true,
});

export type InsertQA = z.infer<typeof insertQASchema>;
export type QuestionAnswer = typeof questionAnswers.$inferSelect;

// Note schema
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  workspaceId: integer("workspace_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: integer("user_id").notNull(),
});

export const insertNoteSchema = createInsertSchema(notes).pick({
  title: true,
  content: true,
  workspaceId: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;

// Knowledge Graph schema
export const knowledgeGraphs = pgTable("knowledge_graphs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  workspaceId: integer("workspace_id").notNull(),
  nodes: jsonb("nodes").notNull(),
  edges: jsonb("edges").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: integer("user_id").notNull(),
});

export const insertKnowledgeGraphSchema = createInsertSchema(knowledgeGraphs).pick({
  title: true,
  description: true,
  workspaceId: true,
  nodes: true,
  edges: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type InsertKnowledgeGraph = z.infer<typeof insertKnowledgeGraphSchema>;
export type KnowledgeGraph = typeof knowledgeGraphs.$inferSelect;

// Vector Database schema
export const vectorDatabases = pgTable("vector_databases", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  provider: text("provider").notNull(),
  connectionString: text("connection_string"),
  settings: jsonb("settings"),
  vectorCount: integer("vector_count").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: integer("user_id").notNull(),
});

export const insertVectorDatabaseSchema = createInsertSchema(vectorDatabases).pick({
  name: true,
  description: true,
  provider: true,
  connectionString: true,
  settings: true,
  vectorCount: true,
  userId: true,
});

export type InsertVectorDatabase = z.infer<typeof insertVectorDatabaseSchema>;
export type VectorDatabase = typeof vectorDatabases.$inferSelect;

// Conversation schema
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  messages: jsonb("messages").notNull(),
  modelId: integer("model_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: integer("user_id").notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  title: true,
  messages: true,
  modelId: true,
  userId: true,
});

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

// Billing Records schema
export const billingRecords = pgTable("billing_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: real("amount").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  invoiceId: text("invoice_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBillingRecordSchema = createInsertSchema(billingRecords).pick({
  userId: true,
  amount: true,
  description: true,
  status: true,
  invoiceId: true,
});

export type InsertBillingRecord = z.infer<typeof insertBillingRecordSchema>;
export type BillingRecord = typeof billingRecords.$inferSelect;
