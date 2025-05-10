import { Workspace, File, Template, AIModel, User } from "@shared/schema";

// Sample workspaces for UI display
export const workspaces: Workspace[] = [
  {
    id: 1,
    name: "AI Ethics Research",
    description: "Research on ethical considerations in AI development and deployment",
    colorId: 0,
    projectType: 0,
    fileCount: 3,
    views: 24,
    lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    collaborators: [1, 2]
  },
  {
    id: 2,
    name: "ML Course Notes",
    description: "Notes and resources for the machine learning course",
    colorId: 1,
    projectType: 1,
    fileCount: 2,
    views: 17,
    lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    collaborators: [1]
  },
  {
    id: 3,
    name: "Product Requirements",
    description: "Product requirements and specifications for the AI assistant",
    colorId: 2,
    projectType: 2,
    fileCount: 5,
    views: 36,
    lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    collaborators: [1, 2, 3, 4]
  }
];

// Sample files within a workspace
export const files: Record<number, File[]> = {
  1: [
    {
      id: 1,
      name: "AI Ethics Framework.pdf",
      type: "pdf",
      size: 1.2, // MB
      preview: null,
      workspaceId: 1,
      uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isActive: true
    },
    {
      id: 2,
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
      id: 3,
      name: "Interview Transcripts.docx",
      type: "docx",
      size: 0.54, // MB
      preview: null,
      workspaceId: 1,
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isActive: false
    }
  ]
};

// Sample document summary
export const documentSummary = `
This framework establishes ethical principles for AI development with a focus on:

- **Transparency:** Making AI systems explainable to users
- **Fairness:** Preventing bias and discrimination
- **Accountability:** Maintaining human oversight and responsibility

The document provides guidance for researchers, engineers, product managers, and organizations
implementing AI systems. It emphasizes the importance of regular fairness testing and clear
responsibility structures.
`;

// Sample templates
export const templates: Template[] = [
  {
    id: 1,
    name: "Research Summary",
    description: "Analyze and extract key points from academic papers",
    icon: "ri-file-text-line",
    color: "blue"
  },
  {
    id: 2,
    name: "Concept Map",
    description: "Visualize connections between ideas and topics",
    icon: "ri-mind-map",
    color: "purple"
  },
  {
    id: 3,
    name: "Video Notes",
    description: "Extract and organize key points from video content",
    icon: "ri-youtube-line",
    color: "red"
  },
  {
    id: 4,
    name: "Study Guide",
    description: "Create organized study materials with flashcards",
    icon: "ri-book-2-line",
    color: "green"
  }
];

// Available AI models
export const aiModels = [
  {
    id: 1,
    name: "GPT-4o",
    provider: "OpenAI",
    icon: "ri-openai-fill",
    color: "green",
    isActive: true,
    description: "Latest multimodal model with advanced reasoning capabilities",
    capabilities: ["Text", "Images", "Code", "Knowledge Graph", "Summarization"]
  },
  {
    id: 2,
    name: "Claude 3 Opus",
    provider: "Anthropic",
    icon: "ri-reactjs-line",
    color: "blue",
    isActive: true,
    description: "Powerful reasoning and instruction-following model",
    capabilities: ["Text", "Images", "Code", "Long Context", "Document Analysis"]
  },
  {
    id: 3,
    name: "Gemini Pro",
    provider: "Google",
    icon: "ri-google-fill",
    color: "red",
    isActive: false,
    description: "Google's multimodal AI model for text and visual tasks",
    capabilities: ["Text", "Images", "Reasoning", "Research", "Summarization"]
  },
  {
    id: 4,
    name: "Llama 3",
    provider: "Meta AI",
    icon: "ri-fire-fill",
    color: "orange",
    isActive: false,
    description: "Open-source model for research and development",
    capabilities: ["Text", "Reasoning", "Code", "Multilingual"]
  },
  {
    id: 5,
    name: "Embeddings",
    provider: "OpenAI",
    icon: "ri-openai-fill",
    color: "green",
    isActive: true,
    description: "Vector embeddings for semantic search and RAG",
    capabilities: ["Text Embeddings", "Similarity Search", "Document Retrieval"]
  }
];

// Sample users/collaborators
export const users: User[] = [
  {
    id: 1,
    username: "sarahchen",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    username: "michaelscott",
    name: "Michael Scott",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    username: "emilyjohnson",
    name: "Emily Johnson",
    avatar: null
  },
  {
    id: 4,
    username: "davidwilson",
    name: "David Wilson",
    avatar: null
  }
];

// YouTube video analysis demo data
export const youtubeDemo = {
  title: "AI Knowledge Management: The Future of Learning",
  duration: "18:42",
  views: "245K",
  channel: "TechInsights",
  thumbnailUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
  summary: `
This video explores the future of AI-powered knowledge management systems and how they're transforming learning and research processes. The presenter discusses:

#### Key Technologies
- **Large Language Models (LLMs):** Enabling natural language understanding and generation for processing diverse content.
- **Retrieval-Augmented Generation (RAG):** Combining search capabilities with generative AI to provide contextually relevant information.
- **Multimodal Processing:** Analyzing text, audio, and visual content together for comprehensive understanding.

#### Benefits for Different Users
- **Students:** Faster comprehension of lecture material, personalized study guides, and AI-assisted question answering.
- **Researchers:** Efficient literature reviews, connection of ideas across sources, and identification of research gaps.
- **Knowledge Workers:** Streamlined information processing, better retention, and improved sharing of insights.

#### Emerging Challenges
- Ensuring factual accuracy and attribution
- Maintaining privacy and security of sensitive documents
- Creating intuitive interfaces for non-technical users
- Developing standards for integration with existing tools

The video concludes with a demonstration of an integrated workspace where users can ingest content from multiple sources, generate various AI outputs, and export findings to their preferred tools.
  `
};
