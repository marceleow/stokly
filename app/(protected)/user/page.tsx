import UserList from "#/features/user/components/user-list";
import { Suspense } from "react";

export default async function UserPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Pengguna</h1>
      <p className="text-muted-foreground">Kelola akses dan peran</p>
      <Suspense fallback={<div>Loading...</div>}>
        <UserList />
      </Suspense>
    </div>
  );
}
