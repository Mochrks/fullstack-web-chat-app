import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import "@/App.css";
import { Paperclip, SendHorizontal, CameraIcon } from "lucide-react";
import { EmojiPicker } from "./emoji-picker";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
const socket = io("http://localhost:5000");

interface ChatListProps {
  username;
}

export default function ChatList({ username }: ChatListProps) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [recipient, setRecipient] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("register", username);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [username]);

  useEffect(() => {
    if (username === "userA") {
      setRecipient("userB");
    } else {
      setRecipient("userA");
    }
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "" && recipient.trim() !== "") {
      const message = { to: recipient, message: messageInput };
      socket.emit("message", message);
      setMessageInput("");
    }
  };

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden  overflow-h-scroll flex flex-col bg-custom-image p2">
        <div className="flex-1 p-6 overflow-y-auto  rounded-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 p-2 ${
                msg.from === username ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-2 rounded-md gap-2 ${
                  msg.from === username
                    ? "bg-orange-200 text-black"
                    : "bg-green-200 text-black"
                }`}
              >
                {msg.message}
                <br />
                <span className="text-gray-500 text-xs pt-2">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-2 border-t border-gray-300">
        <div className="flex">
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <EmojiPicker
              onChange={(value) => {
                setMessages(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </a>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <Paperclip size={15} className="text-muted-foreground" />
          </a>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <CameraIcon size={15} className="text-muted-foreground" />
          </a>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded-l-md outline-none pl-3"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            className="px-4 py-2 text-white rounded-r-md "
            onClick={sendMessage}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
