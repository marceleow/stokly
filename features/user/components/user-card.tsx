"use client";

import { useActionState, useEffect, useState } from "react";

import { Button } from "#/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "#/components/ui/drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { Label } from "#/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "#/components/ui/native-select";
import type { User } from "#/drizzle/schema";
import { UserRole } from "#/features/auth/auth-permission";
import { formatPhoneID } from "#/lib/format";
import { cn } from "#/lib/utils";
import {
  ChevronRightIcon,
  HashIcon,
  LockIcon,
  PencilIcon,
  UserIcon,
} from "lucide-react";
import { deactivateUser, toggleUserActive, updateUser } from "../user-action";

/* -------------------------------------------------------------------------- */
/* constants                                                                  */
/* -------------------------------------------------------------------------- */

const ROLE_OPTIONS = Object.values(UserRole).map((role) => ({
  label: role.toUpperCase(),
  value: role,
}));

/* -------------------------------------------------------------------------- */
/* small reusable UI pieces                                                   */
/* -------------------------------------------------------------------------- */

function UserStatusBadge({ active, role }: { active: boolean; role: string }) {
  return (
    <div className="flex gap-2">
      <div
        className={cn(
          "py-1 px-2 text-xs font-bold rounded-sm",
          active ? "bg-[#34C759] text-green-50" : "bg-[#FF3B30] text-red-50",
        )}
      >
        {active ? "ACTIVE" : "INACTIVE"}
      </div>
      <div className="py-1 px-2 bg-muted text-xs font-bold rounded-sm">
        {role.toUpperCase()}
      </div>
    </div>
  );
}

function UserCardSummary({ user }: { user: User }) {
  return (
    <div className="flex-1 text-start">
      <h1 className="font-semibold">{user.name}</h1>
      <p className="text-xs text-muted-foreground">
        {formatPhoneID(user.phoneNumber)}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* edit user form (CLOSE ON SUCCESS HERE)                                      */
/* -------------------------------------------------------------------------- */

function UserEditForm({
  user,
  closeAll,
}: {
  user: User;
  closeAll: () => void;
}) {
  const [state, action, pending] = useActionState(updateUser, null);

  useEffect(() => {
    if (!pending && state?.success) {
      closeAll();
    }
  }, [pending, state, closeAll]);

  return (
    <form action={action} id="edit-user" className="space-y-4 p-4">
      <input type="hidden" name="userId" value={user.id} />

      <div className="space-y-2">
        <Label>Nama</Label>
        <InputGroup>
          <InputGroupAddon>
            <UserIcon />
          </InputGroupAddon>
          <InputGroupInput key={user.id} placeholder={user.name} name="name" />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <Label>Nomor Telepon</Label>
        <InputGroup>
          <InputGroupAddon>
            <HashIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder={user.phoneNumber} name="phoneNumber" />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <Label>Role</Label>
        <NativeSelect name="role" className="w-full" defaultValue={user.role}>
          {ROLE_OPTIONS.map((role) => (
            <NativeSelectOption key={role.value} value={role.value}>
              {role.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label>Ubah Password</Label>
        <InputGroup>
          <InputGroupAddon>
            <LockIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="passwordbaru"
            name="password"
            type="password"
          />
        </InputGroup>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* deactivate user drawer                                                           */
/* -------------------------------------------------------------------------- */

function UserActivationDrawer({
  user,
  closeAll,
}: {
  user: User;
  closeAll: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(toggleUserActive, null);

  const isActive = user.active === true;
  const nextActive = isActive ? 0 : 1;

  const title = isActive ? "Nonaktifkan Pengguna" : "Aktifkan Pengguna";
  const description = isActive
    ? "Kamu yakin ingin menonaktifkan akun ini?"
    : "Kamu yakin ingin mengaktifkan kembali akun ini?";

  const warningText = isActive
    ? "Pengguna yang dinonaktifkan tidak dapat login kembali."
    : "Pengguna akan dapat login kembali setelah diaktifkan.";

  const buttonLabel = isActive ? "Nonaktifkan Pengguna" : "Aktifkan Pengguna";
  const confirmLabel = isActive ? "Ya, Nonaktifkan" : "Ya, Aktifkan";

  const variant = isActive ? "destructive" : "default";
  const accentColor = isActive ? "text-red-600" : "text-green-600";

  useEffect(() => {
    if (!pending && state?.success) {
      setOpen(false);
      closeAll();
    }
  }, [pending, state, closeAll]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={variant}>
          <LockIcon />
          {buttonLabel}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle
            className={cn("text-start font-bold text-2xl", accentColor)}
          >
            {title}
          </DrawerTitle>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground">{description}</p>

          <div className="rounded-md border p-3 bg-muted">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatPhoneID(user.phoneNumber)}
            </p>
          </div>

          <p className={cn("text-sm", accentColor)}>{warningText}</p>
        </div>

        <DrawerFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            Batal
          </Button>

          <form action={action}>
            <input type="hidden" name="userId" value={user.id} />
            <input type="hidden" name="active" value={nextActive} />
            <Button
              type="submit"
              variant={variant}
              disabled={pending}
              className="w-full"
            >
              {pending ? "Memproses..." : confirmLabel}
            </Button>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* -------------------------------------------------------------------------- */
/* edit user drawer                                                           */
/* -------------------------------------------------------------------------- */

function UserEditDrawer({
  user,
  closeAll,
}: {
  user: User;
  closeAll: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <PencilIcon />
          Edit Pengguna
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="border-b">
          <div className="flex justify-between items-baseline">
            <DrawerTitle className="text-start font-bold text-2xl">
              Edit Pengguna
            </DrawerTitle>
            <h1 className="text-lg font-semibold">{user.name}</h1>
          </div>
        </DrawerHeader>

        <UserEditForm
          user={user}
          closeAll={() => {
            setOpen(false);
            closeAll();
          }}
        />

        <DrawerFooter>
          <Button type="submit" form="edit-user">
            Simpan Perubahan
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* -------------------------------------------------------------------------- */
/* main drawer                                                                */
/* -------------------------------------------------------------------------- */

function UserDrawer({ user, closeAll }: { user: User; closeAll: () => void }) {
  return (
    <DrawerContent>
      <DrawerHeader className="border-b">
        <DrawerTitle className="text-start font-bold text-3xl">
          {user.name}
        </DrawerTitle>
        <UserStatusBadge active={user.active} role={user.role} />
      </DrawerHeader>

      <DrawerFooter>
        <UserActivationDrawer user={user} closeAll={closeAll} />
        <UserEditDrawer user={user} closeAll={closeAll} />
      </DrawerFooter>
    </DrawerContent>
  );
}

/* -------------------------------------------------------------------------- */
/* public component                                                           */
/* -------------------------------------------------------------------------- */

export default function UserCard({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="p-4 flex justify-between border-b">
        <UserCardSummary user={user} />
        <div className="flex items-center gap-2">
          <UserStatusBadge active={user.active} role={user.role} />
          <ChevronRightIcon className="w-4 h-4 text-muted-foreground shrink-0" />
        </div>
      </DrawerTrigger>
      <UserDrawer user={user} closeAll={() => setOpen(false)} />
    </Drawer>
  );
}
