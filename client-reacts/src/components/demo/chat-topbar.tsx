import React, { useRef, useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Info, Phone, Video, EllipsisVertical, User2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface ChatTopbarProps {
  username;
}

export const TopbarIcons = [
  { icon: Phone },
  { icon: Video },
  { icon: EllipsisVertical },
];

export default function ChatTopbar({ username }: ChatTopbarProps) {
  const [user, setUser] = useState("");
  useEffect(() => {
    if (username === "userA") {
      setUser("userB");
    } else {
      setUser("userA");
    }
  }, [username]);

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage src="https://github.com/shadcn.png$" alt="@shadcn" />
          <AvatarFallback>
            {" "}
            <User2Icon size={15} className="text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-start">{user}</span>
          <span className="text-xs text-start">Online</span>
        </div>
      </div>

      <div>
        {TopbarIcons.map((icon, index) => (
          <a
            key={index}
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  );
}
