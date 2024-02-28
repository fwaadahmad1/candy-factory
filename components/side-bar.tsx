"use client"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import Image from "next/image";
import Logo from "@/public/logo.svg"
import {LayoutDashboard, Notebook, Package, ShoppingBag} from "lucide-react";
import {ReactNode} from "react";
import {useRouter, usePathname} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

type NavLink = {
    title: string,
    path: string,
    subLinks?: Array<Omit<NavLink, "subLinks">>
}

export const navLinks: Array<NavLink> = [
    {
        title: "Dashboard",
        path: "/dashboard"
    }, {
        title: "Orders",
        path: "/orders"
    }, {
        title: "Production",
        path: "/production",
        subLinks: [{
            title: "Production In-Line",
            path: "/production/inLine"
        }, {
            title: "Pending Orders",
            path: "/production/pendingOrders"
        }, {
            title: "Machinery Info",
            path: "/production/machineryInfo"
        },]
    }, {
        title: "Inventory",
        path: "/inventory"
    }
]

export function SideBar({className}: { className: string }) {

    const router = useRouter();
    const path = usePathname();

    console.log(path)

    function NavLink({children, navLink}: { children: ReactNode, navLink: NavLink }) {
        return <Button variant={path.includes(`${navLink.path}`) ? "secondary" : "ghost"}
                       className="w-full justify-start pr-24"
                       onClick={() => router.push(navLink.path)}>
            {children}
        </Button>
    }

    return (
        <nav className={cn("max-w-min pb-12 bg-card", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className={cn("flex justify-center py-8")}>
                        <Image src={Logo} alt={"CandyCo"}/>
                    </div>
                    <div className="space-y-1">
                        <NavLink navLink={navLinks[0]}>
                            <LayoutDashboard className="mr-2 h-4 w-4"/>
                            {navLinks[0].title}
                        </NavLink>
                        <NavLink navLink={navLinks[1]}>
                            <ShoppingBag className="mr-2 h-4 w-4"/>
                            {navLinks[1].title}
                        </NavLink>

                        <Popover>
                            <PopoverTrigger asChild={true}>
                                <Button variant={path.includes(`${navLinks[2].path}`) ? "secondary" : "ghost"}
                                        className="w-full justify-start pr-24">
                                    <ShoppingBag className="mr-2 h-4 w-4"/>
                                    {navLinks[2].title}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent asChild={true} side={"right"}>
                                <div className="space-y-4 p-1">
                                    {navLinks[2].subLinks?.map(
                                        link => <NavLink key={link.path} navLink={link}>
                                            {link.title}
                                        </NavLink>)}

                                </div>
                            </PopoverContent>
                        </Popover>


                        <NavLink navLink={navLinks[3]}>
                            <Notebook className="mr-2 h-4 w-4"/>
                            {navLinks[3].title}
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}