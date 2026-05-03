"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearAdminToken,
  fetchAdminContactSubmissions,
  getAdminToken,
  type ContactSubmissionItem,
} from "@/lib/api";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function AdminContactSubmissionsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ContactSubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRows = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminContactSubmissions();
      setRows(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    void loadRows();
  }, [router, loadRows]);

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">Contact messages</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/content" className="rounded border border-white/30 px-3 py-2 text-sm hover:bg-white/10">
              Content admin
            </Link>
            <button
              type="button"
              onClick={() => {
                clearAdminToken();
                router.replace("/admin/login");
              }}
              className="rounded border border-white/30 px-3 py-2 text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        <p className="text-sm text-white/60">Submissions from the site contact form (newest first).</p>

        <button type="button" onClick={() => void loadRows()} className="rounded-md bg-white/15 px-3 py-2 text-sm">
          Refresh
        </button>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {loading ? (
          <p className="text-white/70">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="text-white/70">No messages yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full bg-black/50 text-sm">
              <thead className="bg-white/10 text-left">
                <tr>
                  <th className="px-3 py-2 whitespace-nowrap">Received</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2 min-w-[200px]">Message</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row._id} className="border-t border-white/10 align-top">
                    <td className="px-3 py-2 whitespace-nowrap text-white/80">{formatDate(row.createdAt)}</td>
                    <td className="px-3 py-2 font-medium">{row.fullName}</td>
                    <td className="px-3 py-2">
                      <a href={`mailto:${row.email}`} className="text-blue-400 underline hover:text-blue-300">
                        {row.email}
                      </a>
                    </td>
                    <td className="px-3 py-2 text-white/90">{row.phone || "—"}</td>
                    <td className="max-w-xl px-3 py-2 whitespace-pre-wrap break-words text-white/90">{row.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
