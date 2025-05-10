import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const themeOptions = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
  { id: "system", name: "System" },
];

const notificationOptions = [
  {
    id: "all_emails",
    label: "All emails",
    description: "Receive all emails from the platform.",
  },
  {
    id: "workflow_updates",
    label: "Workflow updates",
    description: "Get notified when your workflows are updated.",
  },
  {
    id: "ai_suggestions",
    label: "AI Suggestions",
    description: "Receive AI-generated suggestions based on your content.",
  },
  {
    id: "security_alerts",
    label: "Security alerts",
    description: "Get important security alerts for your account.",
  },
];

const defaultValues: Partial<ProfileFormValues> = {
  name: "Sarah Chen",
  email: "sarah@example.com",
  bio: "AI researcher and enthusiast",
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export default function ProfilePage() {
  const { toast } = useToast();
  const [theme, setTheme] = useState("dark");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    console.log(data);
  }

  return (
    <div className="container mx-auto pb-8">
      <div className="space-y-6 py-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">
            Manage your profile settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your public profile information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col items-center md:items-start space-y-4">
                        <Avatar className="h-32 w-32">
                          <AvatarImage
                            src={defaultValues.avatarUrl || ""}
                            alt={defaultValues.name}
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          Change Avatar
                        </Button>
                      </div>

                      <div className="flex-1 space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your email address"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about yourself"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                You can <span>@mention</span> other users and
                                organizations.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">Update profile</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account details and subscription.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Username</Label>
                  <div className="rounded-md border p-2">sarahchen</div>
                </div>

                <div className="space-y-1">
                  <Label>Subscription Plan</Label>
                  <div className="flex items-center">
                    <div className="rounded-md bg-primary/10 text-primary px-2 py-1 text-xs font-medium">
                      Premium
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      $19.99/month
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-auto h-8 text-primary"
                    >
                      Manage subscription
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>API Usage</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">5,000 tokens remaining</span>
                    <span className="text-xs text-muted-foreground">
                      Resets on June 1, 2025
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <Button variant="outline" className="text-destructive">
                  <i className="ri-delete-bin-line mr-2"></i> Delete account
                </Button>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all of your content.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the application looks and feels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {themeOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center justify-center p-4 rounded-md border cursor-pointer ${
                          theme === option.id
                            ? "border-primary bg-primary/10"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setTheme(option.id)}
                      >
                        <div className="text-center">
                          <div className="mb-2">
                            {option.id === "light" ? (
                              <i className="ri-sun-line text-2xl"></i>
                            ) : option.id === "dark" ? (
                              <i className="ri-moon-line text-2xl"></i>
                            ) : (
                              <i className="ri-computer-line text-2xl"></i>
                            )}
                          </div>
                          <div className="text-sm font-medium">
                            {option.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Text Size</Label>
                  <div className="flex items-center space-x-2">
                    <i className="ri-text-spacing text-lg"></i>
                    <input
                      type="range"
                      min="75"
                      max="125"
                      defaultValue="100"
                      step="5"
                      className="flex h-2 w-full rounded-full accent-primary"
                    />
                    <i className="ri-text-spacing text-2xl"></i>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Custom Styles</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1 rounded-full"
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: "#4A5568" }}
                      ></span>
                      Dark
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1 rounded-full"
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: "#6B46C1" }}
                      ></span>
                      Purple
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1 rounded-full"
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: "#2B6CB0" }}
                      ></span>
                      Blue
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1 rounded-full"
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: "#48BB78" }}
                      ></span>
                      Green
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {notificationOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-start space-x-4"
                    >
                      <Switch
                        id={option.id}
                        defaultChecked={
                          option.id === "security_alerts" ||
                          option.id === "workflow_updates"
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor={option.id}>{option.label}</Label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Email Digest</h4>
                      <p className="text-sm text-muted-foreground">
                        Get a summary of platform activities.
                      </p>
                    </div>
                    <div className="w-32">
                      <select
                        className="w-full rounded-md border p-2 text-sm"
                        defaultValue="daily"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save notification preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}