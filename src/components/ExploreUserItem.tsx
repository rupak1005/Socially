// src/components/ExploreUserItem.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toggleFollow } from "@/actions/user.action";
import toast from "react-hot-toast";

interface ExploreUserItemProps {
  user: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
    currentUserId: string | null;
    isFollowing: boolean;
  };
}

export default function ExploreUserItem({ user }: ExploreUserItemProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFollow = async () => {
    if (!user.currentUserId) {
      toast.error("Please sign in to follow users");
      return;
    }

    setIsLoading(true);
    try {
      const result = await toggleFollow(user.id);
      if (result?.success) {
        setIsFollowing(!isFollowing);
        toast.success(isFollowing ? "Unfollowed successfully" : "Followed successfully");
      } else {
        toast.error(result?.error || "Failed to update follow status");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b hover:bg-muted/25 transition-colors">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${user.username}`}>
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.image ?? "/avatar.png"} />
          </Avatar>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link 
            href={`/profile/${user.username}`}
            className="font-medium hover:underline block"
          >
            {user.name || user.username}
          </Link>
          <p className="text-sm text-muted-foreground">
            @{user.username}
          </p>
        </div>
      </div>

      {user.currentUserId && (
        <Button
          size="sm"
          variant={isFollowing ? "outline" : "default"}
          onClick={handleToggleFollow}
          disabled={isLoading}
          className="shrink-0"
        >
          {isLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
}