import ChatTopbar from "./chat-topbar";
import ChatList from "./chat-list";
import React from "react";

export function Chat({ username }) {
  return (
    <div className="flex flex-col justify-between w-full h-[780px]">
      <ChatTopbar username={username} />
      <ChatList username={username} />
    </div>
  );
}
