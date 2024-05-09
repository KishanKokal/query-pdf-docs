"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import Bubble from "@/components/ui/bubble";
import { fetchQueryResponse } from "../utils";

interface userMessage {
  id: number;
  content: string;
  role: string;
}

interface assistantMessage {
  id: number;
  sources: object[];
  role: string;
}

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<(userMessage | assistantMessage)[]>([
    {
      id: 1,
      content:
        "My primary task is to identify and deliver the essential sections from the textbook, particularly those related to electromagnetism. If there's anything specific within that realm you're curious about or need clarification on, don't hesitate to ask, and I'll be glad to assist you!",
      role: "assistant",
      sources: [],
    },
  ]);
  const [query, setQuery] = useState("");

  const submitQuery = () => {
    const length = messages.length;
    const id = messages[length - 1]["id"] + 1;
    const content = query;
    const role = "user";
    setMessages((prev) => [
      ...prev,
      { id: id, content: content, role: role, sources: [] },
    ]);
    setQuery("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === "Enter") {
      event.preventDefault();
      submitQuery();
      fetchQueryResponse(query).then((sources): void => {
        let id = messages.length;
        console.log(sources);
        setMessages((prev) => [
          ...prev,
          { id: id, role: "assistant", sources: sources, content: "" },
        ]);
      });
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="h-5/6 w-5/6 border-2 border-sky-500 flex flex-col justify-around items-center rounded-3xl p-5 gap-2">
        <div className="h-5/6 w-full border-2 border-sky-500 rounded-3xl flex flex-col p-5 overflow-y-scroll gap-5 scrollbar scrollbar-thumb-rose-500">
          {messages.map(({ id, role, content, sources }, index) => (
            <Bubble
              key={id}
              role={role}
              content={content}
              sources={sources ? sources : []}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="h-1/6 w-full flex flex-col gap-5">
          <Textarea
            value={query}
            autoFocus={true}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(event) => {
              handleKeyDown(event);
            }}
          />
          <Button
            onClick={() => {
              submitQuery();
              fetchQueryResponse(query).then((sources): void => {
                let id = messages.length;
                console.log(sources);
                setMessages((prev) => [
                  ...prev,
                  { id: id, role: "assistant", sources: sources, content: "" },
                ]);
              });
            }}
          >
            Ask Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
