"use client";

import { Button } from "#/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "#/components/ui/drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { Label } from "#/components/ui/label";
import { HashIcon, LockIcon } from "lucide-react";
import { useActionState } from "react";
import { signIn } from "../auth-action";

export default function AuthForm() {
  const [_, action, pending] = useActionState(signIn, undefined);
  return (
    <Drawer direction="top" dismissible open={true}>
      <DrawerContent>
        <DrawerHeader className="items-start border-b">
          <DrawerTitle className="text-2xl font-bold">
            Verifikasi Identitas
          </DrawerTitle>
          <p className="text-muted-foreground">
            Harap verifikasi identitas Anda terlebih dahulu.
          </p>
        </DrawerHeader>
        <form id="auth-form" action={action} className="space-y-4 px-4 mt-4">
          <div className="space-y-2">
            <Label>Nomor Telpon</Label>
            <InputGroup>
              <InputGroupAddon>
                <HashIcon />
              </InputGroupAddon>
              <InputGroupInput name="phoneNumber" placeholder="08xxxxxx" />
            </InputGroup>
          </div>
          <div className="space-y-2">
            <Label>Kata Sandi</Label>
            <InputGroup>
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
              <InputGroupInput
                name="password"
                type="password"
                placeholder="katasandi"
              />
            </InputGroup>
          </div>
        </form>
        <DrawerFooter>
          <Button type="submit" form="auth-form" disabled={pending}>
            Verifikasi
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
