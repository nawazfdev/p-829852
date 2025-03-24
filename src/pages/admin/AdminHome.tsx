
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, User, DollarSign, Home } from "lucide-react";

const AdminHome = () => {
  // Dummy data (would come from API in real implementation)
  const stats = [
    { title: "Total Properties", value: 24, icon: <Building className="h-8 w-8" />, change: "+2 this week" },
    { title: "Active Listings", value: 18, icon: <Home className="h-8 w-8" />, change: "+1 this week" },
    { title: "User Inquiries", value: 13, icon: <User className="h-8 w-8" />, change: "+5 this week" },
    { title: "Total Revenue", value: "$45,250", icon: <DollarSign className="h-8 w-8" />, change: "+$3,200 this month" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Here's what's happening.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="text-primary">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>
              Properties added in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect to Supabase to see real property data here.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>
              User inquiries from the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect to Supabase to see real inquiry data here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
