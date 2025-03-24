
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building, RefreshCw, Save, ArrowRight } from "lucide-react";

const apiConfigSchema = z.object({
  apiKey: z.string().min(5, { message: "API key is required" }),
  apiUrl: z.string().url({ message: "Must be a valid URL" }).default("https://api.repliers.io"),
  autoSync: z.boolean().default(false),
  syncInterval: z.string().default("24"),
  locationFilters: z.string().optional(),
});

const MLSIntegration = () => {
  const { toast } = useToast();
  const [isConfigured, setIsConfigured] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [propertyCount, setPropertyCount] = useState(0);
  
  const form = useForm<z.infer<typeof apiConfigSchema>>({
    resolver: zodResolver(apiConfigSchema),
    defaultValues: {
      apiKey: "",
      apiUrl: "https://api.repliers.io",
      autoSync: false,
      syncInterval: "24",
      locationFilters: "",
    },
  });

  function onSubmit(values: z.infer<typeof apiConfigSchema>) {
    // In a real implementation, we would store these settings in a database
    console.log("MLS API Settings:", values);
    
    toast({
      title: "API Configuration Saved",
      description: "Your MLS API integration has been configured successfully.",
    });
    
    setIsConfigured(true);
    // This is just simulating settings being saved - in reality this would be stored in your database
    localStorage.setItem("mlsApiSettings", JSON.stringify(values));
  }

  function syncNow() {
    setIsSyncing(true);
    
    // Simulate API synchronization - this would be replaced with real API calls
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date().toLocaleString();
      setLastSynced(now);
      setPropertyCount(Math.floor(Math.random() * 200) + 50); // Simulate importing random number of properties
      
      toast({
        title: "Synchronization Complete",
        description: `Successfully imported ${propertyCount} properties from the MLS.`,
      });
    }, 3000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MLS Integration</h1>
        <p className="text-muted-foreground">
          Configure your Multiple Listing Service (MLS) API integration to import properties automatically.
        </p>
      </div>

      <Tabs defaultValue="configuration" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="configuration">API Configuration</TabsTrigger>
          <TabsTrigger value="synchronization">Data Synchronization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Configure your Repliers.com MLS API integration details. 
                {isConfigured && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                    Configured
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your MLS API key" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the API key provided by Repliers.com.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="apiUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Endpoint URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="syncInterval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sync Interval (hours)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="72" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="autoSync"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Automatic Synchronization</FormLabel>
                            <FormDescription>
                              Automatically sync properties on the specified interval
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="locationFilters"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Location Filters</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="E.g. city:San Francisco,New York;state:CA,NY;zipCode:94107,10001" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Specify locations to filter properties by. Use format: key:value1,value2;key2:value3
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Configuration
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="synchronization">
          <Card>
            <CardHeader>
              <CardTitle>Data Synchronization</CardTitle>
              <CardDescription>
                Import and manage property data from your MLS API.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-secondary/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Last Synced</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {lastSynced || "Never"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Properties Imported</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{propertyCount}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Next Scheduled Sync</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {form.getValues("autoSync") ? "In 24 hours" : "Not scheduled"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Manual Synchronization</h3>
                      <p className="text-sm text-muted-foreground">
                        Trigger an immediate sync with the MLS API
                      </p>
                    </div>
                    <Button 
                      onClick={syncNow} 
                      disabled={!isConfigured || isSyncing}
                      className="min-w-[120px]"
                    >
                      {isSyncing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">View Imported Properties</h3>
                      <p className="text-sm text-muted-foreground">
                        See all properties imported from the MLS
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => window.location.href = "/admin/properties"}>
                      View Properties
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MLSIntegration;
