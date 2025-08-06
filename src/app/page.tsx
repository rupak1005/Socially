import { getPosts } from "@/actions/post.action";
import { getDbUserId, getUserStats } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import ModeToggle from "@/components/ModeToggle";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import WhoToFollow from "@/components/WhoToFollow";
import { SignedIn, SignedOut, SignInButton, UserButton, UserProfile } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();
  const userStats = user ? await getUserStats(user.id) : null;
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Welcome Section for Unauthenticated Users */}
          {!user && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Welcome to Socially
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Connect with friends, share your thoughts, and discover amazing content from people around the world.
                </p>
                <div className="flex justify-center gap-4">
                  <SignInButton mode="modal">
                    <Button size="lg" className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-900 hover:to-purple-900 dark:text-white">
                      Get Started
                    </Button>
                  </SignInButton>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Create Post Section */}
          {user && (
            <div className="mb-6">
              <CreatePost />
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} dbUserId={dbUserId} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6">
                  {user ? "Be the first to share something!" : "Sign in to see posts from your network"}
                </p>
                {user ? (
                  <Button onClick={() => document.querySelector('textarea')?.focus()}>
                    Create your first post
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button>Sign in to get started</Button>
                  </SignInButton>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 space-y-6">
            <WhoToFollow />
            
            {/* Quick Stats for Authenticated Users */}
            {user && userStats && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/10 dark:to-emerald-950/10 rounded-xl border border-green-200/10 dark:border-green-800/50 p-6">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-4">Your Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Posts created</span>
                    <span className="font-medium">{userStats.postsCreated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">People followed</span>
                    <span className="font-medium">{userStats.peopleFollowed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Likes received</span>
                    <span className="font-medium">{userStats.likesReceived}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Followers</span>
                    <span className="font-medium">{userStats.followers}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
