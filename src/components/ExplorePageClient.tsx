"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SearchIcon, UsersIcon, TrendingUpIcon } from "lucide-react";
import ExploreUserItem from "@/components/ExploreUserItem";

interface User {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
  currentUserId: string | null;
  isFollowing: boolean;
  recentActivity?: boolean;
  isNewUser?: boolean;
}

interface ExplorePageClientProps {
  users: User[];
}

export default function ExplorePageClient({ users }: ExplorePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    const query = searchQuery.toLowerCase().trim();
    return users.filter(user => 
      user.name?.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const activeToday = users.filter(u => u.recentActivity).length;
  const newThisWeek = users.filter(u => u.isNewUser).length;

  return (
    <div className="space-y-4">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold">{activeToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold">{newThisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search users..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users List */}
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>All Users</CardTitle>
            <span className="text-sm text-muted-foreground">
              {filteredUsers.length} {searchQuery ? 'results' : 'users'} found
              {searchQuery && ` for "${searchQuery}"`}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <UsersIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p>
                  {searchQuery 
                    ? `No users found for "${searchQuery}"`
                    : "No users found"
                  }
                </p>
                {searchQuery && (
                  <p className="text-sm mt-2">
                    Try searching with a different term
                  </p>
                )}
              </div>
            ) : (
              filteredUsers.map((user) => (
                <ExploreUserItem 
                  key={user.id} 
                  user={{
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    image: user.image,
                    currentUserId: user.currentUserId,
                    isFollowing: user.isFollowing,
                  }} 
                />
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 