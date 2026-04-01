"use client";

import Link from "next/link";
import { ContentItem } from "@/lib/content";

type Props = {
  rows: ContentItem[];
  onDelete: (id: string) => Promise<void>;
};

export default function AdminContentTable({ rows, onDelete }: Props) {
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
              <td className="px-3 py-2">{row.order}</td>
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
