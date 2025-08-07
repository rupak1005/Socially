"use client";

import { BellIcon, HomeIcon, UserIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { getUserByClerkId } from "@/actions/user.action";


function DesktopNavbar() {
  const { user } = useUser();
  const [userUsername, setUserUsername] = useState<string | null>(null);

  // Get user's username for dynamic profile routing
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const userData = await getUserByClerkId(user.id);
          if (userData) {
            setUserUsername(userData.username);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]);

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/explore">
          <UsersIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Explore</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href={userUsername ? `/profile/${userUsername}` : "/profile"}>
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}
export default DesktopNavbar;