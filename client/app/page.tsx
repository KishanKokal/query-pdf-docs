"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-6">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          🤖 AI-Powered PDF Query Chat
        </h2>
        <Button
          variant="default"
          onClick={() => {
            router.push("/chat");
          }}
        >
          Start Chat
        </Button>
      </div>
    </main>
  );
}
