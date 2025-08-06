"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);

    try {
      await toggleFollow(userId);
      toast.success("User followed successfully");
    } catch (error) {
      toast.error("Error following user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleFollow}
      disabled={isLoading}
      className="text-xs px-3 py-1 h-8 hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {isLoading ? (
        <Loader2Icon className="size-3 animate-spin" />
      ) : (
        "Follow"
      )}
    </Button>
  );
}
export default FollowButton;