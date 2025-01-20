"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { SingleChat } from "../common/single-chat";
import { BotThinking } from "../common/bot-thinking";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const defaultProfile =
  "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";

interface IMessage {
  content: string;
  author: "bot" | "human";
}

export function Chat() {
  const [query, setQuery] = useState("");
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([
    {
      author: "bot",
      content: "Hello! How can I help you today?",
    },
  ]);

  const handleClick = async () => {
    if (!query) return;
    setGenerating(true);
    setMessages((prev) => [
      ...prev,
      {
        author: "human",
        content: query,
      },
    ]);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: query
      }),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ask`,
        options
      );
      const { answer } = await res.json();
      setMessages((prev) => [...prev, { author: "bot", content: answer }]);
      setGenerating(false);
      setQuery("");
    } catch (e) {
      console.log(e);
      setGenerating(false);
    }
  };

  return (
    <section
      style={{
        minHeight: "93vh",
      }}
      className="flex flex-col justify-between max-w-3xl mx-auto border-x-2 rounded-3xl max-h-screen"
    >
      <div className="flex flex-col w-full justify-between mx-auto max-h-[100vh-56px]">
        <main
          className="flex-1 border-t rounded-3xl"
          style={{
            maxHeight: "84vh",
            overflowY: "scroll",
          }}
        >
          <div className="container px-4 py-6 mx-auto flex flex-col gap-4">
            <div className="space-y-1">
              {messages.map((msg, i) => (
                <SingleChat
                  {...msg}
                  image={defaultProfile}
                  firstName="Anonymous"
                  key={i}
                />
              ))}
              {generating && <BotThinking />}
            </div>
          </div>
        </main>
      </div>
      <div className="border-t">
        <div className="container px-4 py-4 mx-auto">
          <div
            className="grid items-center gap-1"
            style={{
              gridTemplateColumns: "1fr auto",
            }}
          >
            <form
              className="flex"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                disabled={generating}
                onChange={(e) => {
                  setQuery(e.currentTarget.value);
                }}
                value={query}
                className="rounded-lg"
                placeholder="Type your message here."
              />
              <Button className="h-10 px-6 rounded-full" onClick={handleClick}>
                {generating ? <Loader2 className="animate-spin" /> : <Send />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
