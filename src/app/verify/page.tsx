"use client";

export default function VerifyPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <div className="text-center max-w-md p-8 bg-white shadow-xl rounded-2xl border border-green-300">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Check your email
        </h1>
        <p className="text-gray-600">
          We&apos;ve sent a verification link to your inbox. Click it to
          activate your account.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          After confirming, you will be redirected to the login page.
        </p>
      </div>
    </main>
  );
}
