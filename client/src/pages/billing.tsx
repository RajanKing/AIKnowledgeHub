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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Sample plan data
const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    frequency: "month",
    description: "Basic features for personal projects",
    features: [
      "5 workspaces",
      "100MB storage",
      "5,000 tokens per month",
      "Community support",
    ],
    limitations: [
      "Limited AI models",
      "No API access",
      "Standard processing speed",
    ],
    current: false,
    popular: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    frequency: "month",
    description: "For individuals with advanced needs",
    features: [
      "10 workspaces",
      "1GB storage",
      "50,000 tokens per month",
      "Email support",
      "API access",
      "All AI models",
    ],
    limitations: ["Standard processing speed"],
    current: false,
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    frequency: "month",
    description: "For professionals and small teams",
    features: [
      "Unlimited workspaces",
      "10GB storage",
      "250,000 tokens per month",
      "Priority support",
      "API access",
      "All AI models",
      "Priority processing",
      "Advanced analytics",
    ],
    limitations: [],
    current: true,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99.99,
    frequency: "month",
    description: "For organizations with custom needs",
    features: [
      "Unlimited workspaces",
      "100GB storage",
      "1,000,000 tokens per month",
      "Dedicated support",
      "API access",
      "All AI models",
      "Priority processing",
      "Advanced analytics",
      "SSO Authentication",
      "Custom integrations",
    ],
    limitations: [],
    current: false,
    popular: false,
  },
];

// Sample billing history
const billingHistory = [
  {
    id: "INV-2024-05001",
    date: "May 1, 2025",
    description: "Premium Plan Subscription - Monthly",
    amount: 19.99,
    status: "Paid",
  },
  {
    id: "INV-2024-05002",
    date: "May 1, 2025",
    description: "API Usage - 1000 tokens",
    amount: 4.50,
    status: "Paid",
  },
  {
    id: "INV-2024-04001",
    date: "April 1, 2025",
    description: "Premium Plan Subscription - Monthly",
    amount: 19.99,
    status: "Paid",
  },
  {
    id: "INV-2024-04002",
    date: "April 15, 2025",
    description: "API Usage - 500 tokens",
    amount: 2.25,
    status: "Paid",
  },
  {
    id: "INV-2024-03001",
    date: "March 1, 2025",
    description: "Premium Plan Subscription - Monthly",
    amount: 19.99,
    status: "Paid",
  },
];

export default function BillingPage() {
  const { toast } = useToast();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [selectedPlan, setSelectedPlan] = useState(plans.find((plan) => plan.current)?.id || "");
  
  const currentPlan = plans.find(plan => plan.current) || plans[0];
  
  const handleChangePlan = () => {
    toast({
      title: "Plan changed",
      description: "Your plan has been updated successfully. Changes will be applied in the next billing cycle.",
    });
    setShowUpgradeDialog(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto pb-8">
        <div className="py-6 space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Billing & Usage</h2>
            <p className="text-muted-foreground">
              Manage your subscription, payment methods, and usage metrics
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="subscriptions">Subscription</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>

            <TabsContent value="subscriptions" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    Your current subscription plan and details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">{currentPlan.name} Plan</h3>
                        {currentPlan.popular && (
                          <Badge className="bg-primary">Popular</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {currentPlan.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        ${currentPlan.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{currentPlan.frequency}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Next billing date: June 1, 2025
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Features included:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4">
                      {currentPlan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-2 items-start sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
                  <Button variant="outline" className="text-destructive">
                    <i className="ri-close-circle-line mr-2"></i> Cancel Subscription
                  </Button>
                  <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <i className="ri-arrow-up-line mr-2"></i> Upgrade Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Upgrade Your Plan</DialogTitle>
                        <DialogDescription>
                          Choose a plan that best fits your needs
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid gap-4">
                          {plans.map((plan) => (
                            <div 
                              key={plan.id}
                              className={`flex items-start border rounded-lg p-4 transition-all ${
                                selectedPlan === plan.id 
                                  ? "ring-2 ring-primary border-primary" 
                                  : "hover:border-primary/50"
                              } ${plan.current ? "bg-muted/50" : ""}`}
                              onClick={() => setSelectedPlan(plan.id)}
                            >
                              <input
                                type="radio"
                                id={`plan-${plan.id}`}
                                name="plan"
                                className="mt-1"
                                checked={selectedPlan === plan.id}
                                onChange={() => setSelectedPlan(plan.id)}
                              />
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <label htmlFor={`plan-${plan.id}`} className="font-medium">
                                      {plan.name}
                                    </label>
                                    {plan.popular && (
                                      <Badge className="text-xs">Popular</Badge>
                                    )}
                                    {plan.current && (
                                      <Badge variant="outline" className="text-xs">Current Plan</Badge>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium">
                                      ${plan.price}
                                      <span className="text-sm font-normal text-muted-foreground">
                                        /{plan.frequency}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {plan.description}
                                </p>
                                <div className="mt-2 text-xs text-muted-foreground">
                                  <span className="font-medium text-foreground">Includes:</span>{" "}
                                  {plan.features.slice(0, 3).join(", ")}
                                  {plan.features.length > 3 && ` and ${plan.features.length - 3} more`}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleChangePlan}>
                          Update Subscription
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Manage your payment information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-8 rounded bg-muted flex items-center justify-center mr-3">
                        <i className="ri-visa-line text-xl"></i>
                      </div>
                      <div>
                        <div className="font-medium">•••• •••• •••• 4242</div>
                        <div className="text-xs text-muted-foreground">
                          Expires 12/26
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">Default</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <i className="ri-delete-bin-line mr-2"></i> Remove
                  </Button>
                  <Button size="sm">
                    <i className="ri-bank-card-line mr-2"></i> Add Payment Method
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Token Usage</CardTitle>
                    <CardDescription>This billing period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      125,450 <span className="text-lg font-normal text-muted-foreground">/ 250,000</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>50% used</span>
                        <span>22 days left</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Storage</CardTitle>
                    <CardDescription>Used space</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      4.2 <span className="text-lg font-normal text-muted-foreground">/ 10 GB</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>42% used</span>
                        <span>5.8 GB free</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">API Calls</CardTitle>
                    <CardDescription>This month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      1,245
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      <span className="text-green-500">↑ 18%</span> from last month
                    </div>
                    <div className="h-10 flex mt-2">
                      <div className="w-1/4 h-full bg-blue-500 rounded-l-sm"></div>
                      <div className="w-1/3 h-full bg-green-500"></div>
                      <div className="w-1/5 h-full bg-amber-500"></div>
                      <div className="w-1/6 h-full bg-purple-500 rounded-r-sm"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>GPT-4o</span>
                      <span>Embedding</span>
                      <span>Gemini</span>
                      <span>Other</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Breakdown</CardTitle>
                  <CardDescription>
                    Detailed breakdown of your usage by service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead className="hidden md:table-cell">Limit</TableHead>
                        <TableHead>Usage %</TableHead>
                        <TableHead className="text-right">Est. Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">GPT-4o</TableCell>
                        <TableCell>56,750 tokens</TableCell>
                        <TableCell className="hidden md:table-cell">N/A</TableCell>
                        <TableCell>22.7%</TableCell>
                        <TableCell className="text-right">$2.45</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Text Embeddings</TableCell>
                        <TableCell>35,200 tokens</TableCell>
                        <TableCell className="hidden md:table-cell">N/A</TableCell>
                        <TableCell>14.1%</TableCell>
                        <TableCell className="text-right">$0.45</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Claude</TableCell>
                        <TableCell>12,500 tokens</TableCell>
                        <TableCell className="hidden md:table-cell">N/A</TableCell>
                        <TableCell>5.0%</TableCell>
                        <TableCell className="text-right">$0.75</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Gemini Pro</TableCell>
                        <TableCell>21,000 tokens</TableCell>
                        <TableCell className="hidden md:table-cell">N/A</TableCell>
                        <TableCell>8.4%</TableCell>
                        <TableCell className="text-right">$0.65</TableCell>
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

            <TabsContent value="invoices" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View and download your past invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingHistory.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell className="hidden md:table-cell">{invoice.description}</TableCell>
                          <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={invoice.status === "Paid" ? "default" : "outline"}
                               className={invoice.status === "Paid" ? "bg-green-500" : ""}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <i className="ri-download-line"></i>
                              <span className="sr-only">Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {billingHistory.length} invoices
                  </div>
                  <Button variant="outline">
                    <i className="ri-download-line mr-2"></i> Download All
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}