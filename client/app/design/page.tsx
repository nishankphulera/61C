"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { fetchPublicContent } from "@/lib/api";
import { ContentItem } from "@/lib/content";
import Image from "next/image";

export default function DesignPage() {
  const [items, setItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    fetchPublicContent({ page: "design", section: "design" })
      .then((rows) => setItems(rows.sort((a, b) => a.order - b.order)))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-24 md:pt-28">
        <h1 className="text-3xl font-semibold tracking-tight">Design</h1>
        {!items.length ? (
          <p className="mt-4 text-white/70">Coming soon.</p>
        ) : (
          <div className="mt-8 grid gap-5">
            {items.map((item) => (
              <article key={item._id} className="rounded-xl border border-white/15 bg-white/5 p-4">
                <h2 className="text-xl font-medium">{item.title}</h2>
                {item.description ? <p className="mt-2 text-white/70">{item.description}</p> : null}
                {item.thumbnailUrl ? (
                  <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg">
                    <Image src={item.thumbnailUrl} alt={item.title} fill className="object-cover" />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
