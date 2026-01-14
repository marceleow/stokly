"use client";

import { cn } from "#/lib/utils";
import { HomeIcon, LucideIcon, PackageIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

const navItems: {
  href: Route;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/material",
    label: "Material",
    icon: PackageIcon,
  },
  {
    href: "/user",
    label: "User",
    icon: UserIcon,
  },
];

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="bg-muted border-t border-border ">
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-3 transition-colors duration-150 ease-out",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs font-normal">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
