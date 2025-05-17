"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasJustVerified, setHasJustVerified] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    const hasParams = Array.from(searchParams.keys()).length > 0;

    if (hasParams && !error) {
      setVerificationMessage(
        "Email verified successfully! You can now log in."
      );
      setHasJustVerified(true);
      setTimeout(() => setVerificationMessage(""), 5000);
    } else if (error === "invalid_token" || error === "expired_token") {
      setVerificationMessage(
        "Email verification failed. Please try logging in or requesting a new link."
      );
      setTimeout(() => setVerificationMessage(""), 5000);
    }
  }, [searchParams]);

  useEffect(() => {
    if (hasJustVerified) {
      const timer = setTimeout(() => setHasJustVerified(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [hasJustVerified]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/ideas");
    }
  };

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-400 to-cyan-600 text-white flex-col justify-center items-center text-center px-12">
        <div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Welcome Back!
          </h1>
          <p className="text-lg max-w-md mx-auto">
            Generate amazing AI project ideas. Login to get started and explore
            new ideas!
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-8 py-16 sm:px-12 md:px-16 bg-white shadow-lg rounded-l-3xl max-w-md mx-auto w-full">
        <h2 className="text-4xl font-extrabold mb-8 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600 drop-shadow-md">
          Login
        </h2>

        {verificationMessage && (
          <p
            className={`text-${
              verificationMessage.startsWith("Email verified") ? "green" : "red"
            }-600 text-sm mb-4`}
          >
            {verificationMessage}
          </p>
        )}

        <div className="space-y-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-lg py-3"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-lg py-3"
          />
          {errorMsg && (
            <p className="text-red-600 text-sm mt-1 font-semibold">
              {errorMsg}
            </p>
          )}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white text-lg font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-teal-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
