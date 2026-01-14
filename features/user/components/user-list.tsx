import UserCard from "#/features/user/components/user-card";
import { getUsers } from "#/features/user/user-queries";
import { cacheTag } from "next/cache";

export default async function UserList() {
  "use cache";
  cacheTag("users");
  const users = await getUsers();

  return (
    <div className="flex flex-col mt-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
