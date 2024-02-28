"use client";
import { usePathname } from "next/navigation";
import { Bell, ChevronDownCircle, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavRoutes } from "@/lib/NavRoutes";

const TopBar = () => {
  const path = usePathname().split("/").filter(Boolean);

  const navLink = NavRoutes.find((o) => o.path.includes(`/${path[0]}`));
  const subNavLink = navLink?.subLinks?.find((o) =>
    o.path.includes(`/${path[0]}/${path[1]}`),
  );

  return (
    <div
      className={
        "flex flex-row justify-between w-full bg-card px-8 py-1 border-l-4 border-background"
      }
    >
      <div className={"flex flex-row items-center"}>
        <div
          className={`${path?.[1] && navLink?.subLinks ? "text-muted-foreground" : "font-semibold"}`}
        >
          {navLink?.title}
        </div>
        {path?.[1] && navLink?.subLinks ? (
          <>
            <div className={"flex flex-row font-semibold"}>
              <div
                className={"flex h-full justify-center items-center mx-2 w-4"}
              >
                <ChevronRight />
              </div>
              <div className={`${path?.[2] && subNavLink?.subLinks ? "text-muted-foreground font-normal" : "font-semibold"}`}>{subNavLink?.title}</div>
            </div>

            {path?.[2] && subNavLink?.subLinks && (
              <div className={"flex flex-row font-semibold"}>
                <div
                  className={"flex h-full justify-center items-center mx-2 w-4"}
                >
                  <ChevronRight />
                </div>
                {
                  subNavLink.subLinks.find((o) =>
                    o.path.includes(`/${path[0]}/${path[1]}/${path[2]}`),
                  )?.title
                }
              </div>
            )}
          </>
        ) : null}
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
