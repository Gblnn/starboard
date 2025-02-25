import { PageTransition } from "@/components/transitions/PageTransition";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  updateUserActivity,
  subscribeToActiveUsers,
} from "@/lib/firebase/activeUsers";
import { FileText, Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeUsers, setActiveUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update current user's activity status
    if (user?.uid) {
      updateUserActivity(user.uid);
    }

    // Set up activity update interval
    const activityInterval = setInterval(() => {
      if (user?.uid) {
        updateUserActivity(user.uid);
      }
    }, 60000);

    // Subscribe to active users updates
    const unsubscribe = subscribeToActiveUsers((count) => {
      setActiveUsers(count);
      setIsLoading(false);
    });

    return () => {
      clearInterval(activityInterval);
      unsubscribe(); // Clean up the listener
    };
  }, [user]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between p-8">
          <h1 className="text-2xl font-semibold md:text-2xl">Dashboard v4</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/inbox", { state: { direction: "left" } })}
            className="h-10 w-10"
          >
            <Inbox className="" />
            <span className="sr-only">Inbox</span>
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-6 px-4 md:space-y-8 md:px-8">
          {/* Quick Stats */}
          <div className="grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Records
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">
                  +180 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>
                  Currently active users in the app
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{activeUsers}</div>
                )}
              </CardContent>
            </Card>
            {/* Add more stat cards */}
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">{/* Chart placeholder */}</div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">{/* Activity items */}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
