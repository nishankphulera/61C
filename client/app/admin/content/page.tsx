"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminContentTable from "@/components/AdminContentTable";
import { clearAdminToken, deleteAdminContent, fetchAdminContent, getAdminToken } from "@/lib/api";
import { ContentItem, PAGE_OPTIONS } from "@/lib/content";

export default function AdminContentPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ContentItem[]>([]);
  const [pageFilter, setPageFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [publishedFilter, setPublishedFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRows = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminContent({
        page: pageFilter || undefined,
        section: sectionFilter || undefined,
        published: publishedFilter || undefined,
      });
      setRows(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load content");
    } finally {
      setLoading(false);
    }
  }, [pageFilter, sectionFilter, publishedFilter]);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    void loadRows();
  }, [router, loadRows]);

  async function handleDelete(id: string): Promise<void> {
    const ok = window.confirm("Delete this content item?");
    if (!ok) return;
    await deleteAdminContent(id);
    await loadRows();
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">Admin Content</h1>
          <div className="flex items-center gap-2">
            <Link href="/admin/content/new" className="rounded bg-yellow-400 px-3 py-2 text-sm font-semibold text-black">
              New Item
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

        <div className="grid gap-3 md:grid-cols-4">
          <select value={pageFilter} onChange={(e) => setPageFilter(e.target.value)} className="rounded-md bg-white/10 px-3 py-2">
            <option value="">All pages</option>
            {PAGE_OPTIONS.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          <input
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="rounded-md bg-white/10 px-3 py-2"
            placeholder="Filter by section"
          />
          <select
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value)}
            className="rounded-md bg-white/10 px-3 py-2"
          >
            <option value="">All visibility</option>
            <option value="true">Published only</option>
            <option value="false">Unpublished only</option>
          </select>
          <button type="button" onClick={() => void loadRows()} className="rounded-md bg-white/15 px-3 py-2">
            Refresh
          </button>
        </div>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {loading ? <p className="text-white/70">Loading...</p> : <AdminContentTable rows={rows} onDelete={handleDelete} />}
      </div>
    </main>
  );
}
