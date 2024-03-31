"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { LayoutDashboard, Notebook, ShoppingBag } from "lucide-react";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavRoute, NavRoutes } from "@/lib/NavRoutes";

export function SideBar({ className }: { className: string }) {
  const router = useRouter();
  const path = usePathname();

  function NavLink({
    children,
    navLink,
  }: {
    children: ReactNode;
    navLink: NavRoute;
  }) {
    return (
      <Button
        variant={path.includes(`${navLink.path}`) ? "secondary" : "ghost"}
        className="w-full justify-start pr-24"
        onClick={() => router.push(navLink.path)}
      >
        {children}
      </Button>
    );
  }

  return (
    <nav className={cn("max-w-min pb-12 bg-card", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className={cn("flex justify-center py-8")}>
            <Image src={Logo} alt={"CandyCo"} />
          </div>
          <div className="space-y-1">
            <NavLink navLink={NavRoutes[0]}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {NavRoutes[0].title}
            </NavLink>
            <NavLink navLink={NavRoutes[1]}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              {NavRoutes[1].title}
            </NavLink>

            <Popover>
              <PopoverTrigger asChild={true}>
                <Button
                  variant={
                    path.includes(`${NavRoutes[2].path}`)
                      ? "secondary"
                      : "ghost"
                  }
                  className="w-full justify-start pr-24"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {NavRoutes[2].title}
                </Button>
              </PopoverTrigger>
              <PopoverContent asChild={true} side={"right"}>
                <div className="space-y-4 p-1">
                  {NavRoutes[2].subLinks?.map((link) => (
                    <NavLink key={link.path} navLink={link}>
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <NavLink navLink={NavRoutes[3]}>
              <Notebook className="mr-2 h-4 w-4" />
              {NavRoutes[3].title}
            </NavLink>
            <NavLink navLink={NavRoutes[4]}>
              <Notebook className="mr-2 h-4 w-4" />
              {NavRoutes[4].title}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
