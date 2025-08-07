// src/app/explore/page.tsx
import { getAllUsers } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import ExplorePageClient from "@/components/ExplorePageClient";

export default async function ExplorePage() {
  const user = await currentUser();
  const allUsers = await getAllUsers();

  return <ExplorePageClient users={allUsers} />;
}