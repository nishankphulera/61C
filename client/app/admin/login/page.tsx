"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, loginAdmin, setAdminToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (getAdminToken()) {
      router.replace("/admin/content");
    }
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await loginAdmin(username, password);
      setAdminToken(response.token);
      router.replace("/admin/content");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-4 py-20 text-white">
      <div className="mx-auto w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block text-sm">
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md bg-black px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md bg-black px-3 py-2"
            />
          </label>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-yellow-400 px-4 py-2 font-semibold text-black disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
