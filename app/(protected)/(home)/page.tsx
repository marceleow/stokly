"use client";

import Example from "#/components/test";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "#/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { UserRole } from "#/features/auth/auth-permission";
const options = [
  ...Object.values(UserRole).map((role) => ({
    label: role.toUpperCase(),
    value: role,
  })),
];
export default function Home() {
  return (
    <div>
      <Drawer dismissible>
        <DrawerTrigger>optooasdasd</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle />
          <Select items={options}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pilih Peran</SelectLabel>
                {options.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
