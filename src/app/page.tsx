"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-cyan-100 px-6">
      <Card className="max-w-xl w-full shadow-2xl border border-gray-300 rounded-2xl text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-teal-800">
            Welcome to AI Idea Generator
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Generate creative AI-powered project ideas.
          </CardDescription>
        </CardHeader>

        <CardContent className="py-6">
          <p className="text-lg text-gray-700 mb-6">
            Generate amazing project ideas. Log in or create an account to get
            started!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/login" passHref>
              <Button
                variant="default"
                className="bg-teal-600 text-white hover:bg-teal-700"
              >
                Login
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button
                variant="outline"
                className="text-teal-600 border-teal-600 hover:bg-teal-50"
              >
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
