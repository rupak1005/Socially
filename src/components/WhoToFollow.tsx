import { getRandomUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./FollowButton";

async function WhoToFollow() {
  const users = await getRandomUsers();

  if (users.length === 0) return null;

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Who to Follow</CardTitle>
        <p className="text-sm text-muted-foreground">Discover amazing people</p>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center flex-1 min-w-0 gap-3">
                <Link href={`/profile/${user.username}`}>
                  <Avatar className="w-10 h-10 ring-2 ring-background">
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium text-sm hover:underline truncate block"
                  >
                    {user.name}
                  </Link>
                  <p className="text-xs text-muted-foreground truncate">
                    @{user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user._count.followers}{" "}
                    {user._count.followers === 1 ? "follower" : "followers"}
                  </p>
                </div>
              </div>
              <div className="ml-6 flex-shrink-0">
                <FollowButton userId={user.id} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t">
        <Link 
  href="/explore" 
  className="text-sm text-primary hover:underline font-medium"
>
  View more suggestions →
</Link>
        </div>
      </CardContent>
      
    </Card>
  );
}
export default WhoToFollow;