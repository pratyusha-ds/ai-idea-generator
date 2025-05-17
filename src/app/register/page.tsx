"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/verify");
    }
  };

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 flex-col justify-center px-8 py-16 sm:px-12 md:px-16 bg-white shadow-lg rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none max-w-md mx-auto w-full">
        <h2 className="text-4xl font-extrabold mb-8 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600 drop-shadow-md">
          Register
        </h2>

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
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white text-lg font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-teal-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-400 to-cyan-600 text-white flex-col justify-center items-center text-center px-12">
        <div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Join Us Today!
          </h1>
          <p className="text-lg max-w-md mx-auto">
            Create your account and start generating AI project ideas in
            seconds.
          </p>
        </div>
      </div>
    </main>
  );
}
