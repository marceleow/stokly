import { getUser } from "#/features/auth/auth-queries";
import { Suspense } from "react";
import TimeDisplay from "./time-display";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-baseline p-4 border-b bg-muted">
      <Suspense fallback={<Skeleton className="w-24 h-4" />}>
        <TimeDisplay />
      </Suspense>
      <div className="flex items-baseline gap-2">
        <Suspense fallback={<Skeleton className="w-24 h-4" />}>
          <User />
        </Suspense>
      </div>
    </header>
  );
}

async function User() {
  const user = await getUser();
  return <h1 className="font-bold">{user.name}</h1>;
}
