import React, { useRef, useState, useEffect } from "react";
import {
  MoreHorizontal,
  SquarePen,
  CircleUserRound,
  User2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;

  isMobile: boolean;
  username;
}

export function Sidebar({ isCollapsed, isMobile, username }: SidebarProps) {
  const handleLogout = (event) => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    if (username === "userA") {
      setUser("userB");
    } else {
      setUser("userA");
    }
  }, [username]);

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chat Apps</p>
          </div>
          <hr />
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <a
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9 cursor-pointer"
                  )}
                >
                  <CircleUserRound size={20} />
                </a>
              </PopoverTrigger>
              <PopoverContent className="w-30">
                <a
                  className="w-full rounded-xl cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </PopoverContent>
            </Popover>
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <MoreHorizontal size={20} />
            </a>

            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <SquarePen size={20} />
            </a>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <div className="flex p-2 bg-slate-200 rounded-xl cursor-pointer">
          <Avatar className="flex justify-center items-center">
            <Avatar className="flex justify-center items-center">
              <AvatarImage src="https://github.com/shadcn.png$" alt="@shadcn" />
              <AvatarFallback>
                <User2Icon size={15} className="text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </Avatar>
          <div className="flex flex-col max-w-28 pl-2">
            <span className="item-center mt-2">
              <h1 className="font-bold">{user}</h1>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
