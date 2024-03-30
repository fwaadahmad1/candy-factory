"use client";
import { usePathname } from "next/navigation";
import { Bell, ChevronDownCircle } from "lucide-react";
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
import { useMemo } from "react";

const TopBar = () => {
  const path = usePathname().split("/").filter(Boolean);

  const navLink = NavRoutes.find((o) => o.path.includes(`/${path[0]}`));

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
        <Button variant={"ghost"} size="icon" className={"mx-8"}>
          <Bell size={26} />
        </Button>
        <Button
          variant={"ghost"}
          className={"flex flex-row gap-4 items-center py-8"}
        >
          <Avatar>
            <AvatarFallback
              className={"bg-secondary/80 text-secondary-foreground"}
            >
              SA
            </AvatarFallback>
          </Avatar>

          <div className={"flex flex-col items-start"}>
            {/* <p className={"text-sm font-semibold"}>Sabrina</p> */}
            <p className={"text-xs text-muted-foreground"}>System Admin</p>
          </div>

          {/* <ChevronDownCircle strokeWidth={1} size={20} /> */}
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
