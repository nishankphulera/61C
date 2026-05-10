"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ContentItem } from "@/lib/content";

type Props = {
  rows: ContentItem[];
  onDelete: (id: string) => Promise<void>;
};

function orderDupKey(row: ContentItem): string {
  return `${row.page}\0${row.section}\0${row.order}`;
}

export default function AdminContentTable({ rows, onDelete }: Props) {
  const duplicateOrderKeys = useMemo(() => {
    const counts = new Map<string, number>();
    for (const row of rows) {
      const key = orderDupKey(row);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const dups = new Set<string>();
    counts.forEach((count, key) => {
      if (count > 1) dups.add(key);
    });
    return dups;
  }, [rows]);

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="min-w-full bg-black/50 text-sm">
        <thead className="bg-white/10 text-left">
          <tr>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Page</th>
            <th className="px-3 py-2">Section</th>
            <th className="px-3 py-2">Media</th>
            <th className="px-3 py-2">Order</th>
            <th className="px-3 py-2">Published</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-t border-white/10">
              <td className="px-3 py-2">{row.title}</td>
              <td className="px-3 py-2">{row.page}</td>
              <td className="px-3 py-2">{row.section}</td>
              <td className="px-3 py-2">{row.mediaType}</td>
              <td className="px-3 py-2">
                <span
                  className={
                    duplicateOrderKeys.has(orderDupKey(row))
                      ? "font-medium text-amber-400"
                      : undefined
                  }
                  title={
                    duplicateOrderKeys.has(orderDupKey(row))
                      ? "Duplicate order in this page + section — edit to use unique values"
                      : undefined
                  }
                >
                  {row.order}
                </span>
              </td>
              <td className="px-3 py-2">{row.isPublished ? "Yes" : "No"}</td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/content/${row._id}/edit`}
                    className="rounded bg-blue-500 px-2 py-1 text-xs text-white"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(row._id)}
                    className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {!rows.length ? (
            <tr>
              <td colSpan={7} className="px-3 py-8 text-center text-white/60">
                No content found for this filter.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
