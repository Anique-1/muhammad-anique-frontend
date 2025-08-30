"use client";

import ChatPage from "@/components/chatpage";
import { useRouter } from "next/navigation";

export default function ChatPageRoute() {
  const router = useRouter();
  return <ChatPage onBack={() => router.push("/")} />;
}
