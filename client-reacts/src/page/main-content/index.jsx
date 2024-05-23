import "@/App.css";
import { ChatLayout } from "@/components/demo/chat-layout";
function Content({ username }) {
  return (
    <div>
      <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4 ">
        <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex ">
          <ChatLayout username={username} />
        </div>
      </main>
    </div>
  );
}

export default Content;
