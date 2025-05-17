"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

export default function IdeaGenerator() {
  const [topic, setTopic] = useState("");
  const [ideaBlocks, setIdeaBlocks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const generateIdeas = async () => {
    setLoading(true);
    setIdeaBlocks([]);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      if (data.ideas) {
        const blocks: string[] = data.ideas
          .split(/\*\*\d\./g)
          .filter((b: string) => b.trim() !== "");

        const preamble = blocks[0]?.trim() || "";

        const ideas = blocks.slice(1).map((b: string, i: number) => {
          const trimmed = b.trim();

          const [firstLineRaw, ...restLines] = trimmed.split("\n");

          const cleanHeading = firstLineRaw.replace(/[:*]+$/g, "").trim();

          const formatted = `**${i + 1}. ${cleanHeading}**`;
          const body = restLines.join("\n").trim();

          return body ? `${formatted}\n${body}` : formatted;
        });

        setIdeaBlocks([preamble, ...ideas]);
      } else {
        setIdeaBlocks(["No ideas generated."]);
      }
    } catch (error) {
      console.error(error);
      setIdeaBlocks(["Error generating ideas."]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-teal-100 px-4">
      <div className="absolute top-6 right-6">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="
            text-green-700
            border-green-700
            hover:bg-green-100
            transition
            transform
            hover:-translate-y-1
            hover:scale-105
            cursor-pointer
          "
        >
          Logout
        </Button>
      </div>

      <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-green-800">
            AI Project Idea Generator
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Generate 3 creative AI project ideas from any topic
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Input
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mb-4 text-lg"
          />

          {ideaBlocks.length > 0 ? (
            <div className="space-y-4">
              {ideaBlocks.map((block, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm prose prose-sm sm:prose lg:prose-lg dark:prose-invert"
                >
                  <ReactMarkdown>{block}</ReactMarkdown>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-4">
              Your AI-generated project ideas will appear here...
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            onClick={generateIdeas}
            disabled={loading}
            className="bg-gradient-to-r from-emerald-500 to-indigo-500 text-white hover:opacity-90"
          >
            {loading ? "Generating..." : "Generate Ideas"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
