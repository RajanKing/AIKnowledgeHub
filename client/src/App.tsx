import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Workspace from "@/pages/workspace";
import YoutubeAnalysis from "@/pages/youtube-analysis";
import UploadDocument from "@/pages/upload-document";
import Profile from "@/pages/profile";
import Models from "@/pages/models";
import KnowledgeGraph from "@/pages/knowledge-graph";
import { UiProvider } from "./contexts/ui-context";

// Wrap each component with the MainLayout
import MainLayout from "@/components/main-layout";
import Databases from "@/pages/databases";
import Billing from "@/pages/billing";
import Settings from "@/pages/settings";
import Conversation from "@/pages/conversation";

// Create layout wrapper components
const WrappedDashboard = () => (
  <MainLayout>
    <Dashboard />
  </MainLayout>
);

const WrappedWorkspace = () => (
  <MainLayout>
    <Workspace />
  </MainLayout>
);

const WrappedYoutubeAnalysis = () => (
  <MainLayout>
    <YoutubeAnalysis />
  </MainLayout>
);

const WrappedUploadDocument = () => (
  <MainLayout>
    <UploadDocument />
  </MainLayout>
);

const WrappedProfile = () => (
  <MainLayout>
    <Profile />
  </MainLayout>
);

const WrappedModels = () => (
  <MainLayout>
    <Models />
  </MainLayout>
);

const WrappedKnowledgeGraph = () => (
  <MainLayout>
    <KnowledgeGraph />
  </MainLayout>
);

const WrappedDatabases = () => (
  <MainLayout>
    <Databases />
  </MainLayout>
);

const WrappedBilling = () => (
  <MainLayout>
    <Billing />
  </MainLayout>
);

const WrappedSettings = () => (
  <MainLayout>
    <Settings />
  </MainLayout>
);

const WrappedConversation = () => (
  <MainLayout>
    <Conversation />
  </MainLayout>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={WrappedDashboard} />
      <Route path="/workspace/:id" component={WrappedWorkspace} />
      <Route path="/youtube-analysis" component={WrappedYoutubeAnalysis} />
      <Route path="/upload-document" component={WrappedUploadDocument} />
      <Route path="/profile" component={WrappedProfile} />
      <Route path="/models" component={WrappedModels} />
      <Route path="/knowledge-graph" component={WrappedKnowledgeGraph} />
      <Route path="/databases" component={WrappedDatabases} />
      <Route path="/billing" component={WrappedBilling} />
      <Route path="/settings" component={WrappedSettings} />
      <Route path="/conversation" component={WrappedConversation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UiProvider>
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </UiProvider>
    </QueryClientProvider>
  );
}

export default App;
