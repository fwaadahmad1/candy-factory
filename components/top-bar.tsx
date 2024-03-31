"use client";
import { usePathname } from "next/navigation";
import { Bell, BellDot, ChevronDownCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavRoute, NavRoutes } from "@/lib/NavRoutes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { title } from "process";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TopBar = () => {
  const path = usePathname().split("/").filter(Boolean);

  const navLink = NavRoutes.find((o) => o.path.includes(`/${path[0]}`));
  const [hasNotification, setHasNotification] = useState<boolean>(false);
  const toggleNotification = () => {
    setHasNotification(prevState => !prevState);
  };

  const candyCrumbs: Array<NavRoute> = useMemo(() => {
    const navRoutes: Array<NavRoute> = [];
    navLink && navRoutes.push(navLink);
    let subNavLink: NavRoute | undefined = navLink;
    path.forEach((_, index) => {
      if (index == 0 || !navLink) return;
      path.slice(0, index).map(() => {
        subNavLink = subNavLink?.subLinks?.find((o) =>
          o.path.includes("/" + path.slice(0, index + 1).join("/")),
        );
        subNavLink && navRoutes.push(subNavLink);
      });
    });
    return navRoutes;
  }, [navLink, path]);

  function BreadCrumbs() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {candyCrumbs.length == 1 ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbPage>{candyCrumbs.at(-1)?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : candyCrumbs.length == 2 ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={navLink?.path}>
                  {navLink?.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{candyCrumbs.at(-1)?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : candyCrumbs.length > 2 ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={navLink?.path}>
                  {navLink?.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {candyCrumbs.slice(1, -1).map((navLink) => {
                return (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={navLink.path}>
                        {navLink.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                );
              })}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{candyCrumbs.at(-1)?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <></>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  

  return (
    <div
      className={
        "flex flex-row justify-between w-full bg-card px-8 py-1 border-l-4 border-background"
      }
    >
      <div className={"flex flex-row items-center"}>
        <BreadCrumbs />
      </div>

      <div className={"flex flex-row items-center"}>
        <NotificationBell />


        <Button
          variant={"ghost"}
          className={"flex flex-row gap-4 items-center py-8"}
        >
          <Avatar>
            <AvatarFallback
              className={"bg-secondary/80 text-secondary-foreground"}
            >
              S
            </AvatarFallback>
          </Avatar>

          <div className={"flex flex-col items-start"}>
            <p className={"text-sm font-semibold"}>Sabrina</p>
            <p className={"text-xs text-muted-foreground"}>Admin</p>
          </div>

          <ChevronDownCircle strokeWidth={1} size={20} />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
