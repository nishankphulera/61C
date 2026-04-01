"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminContentForm from "@/components/AdminContentForm";
import { fetchAdminContentById, getAdminToken, updateAdminContent } from "@/lib/api";
import { ContentItem } from "@/lib/content";

export default function EditAdminContentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [initial, setInitial] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }

    async function load(): Promise<void> {
      try {
        const data = await fetchAdminContentById(params.id);
        setInitial(data);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [params.id, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        Loading...
      </main>
    );
  }

  if (!initial) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        Content not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold">Edit Content</h1>
        <AdminContentForm
          initial={initial}
          submitLabel="Save"
          onSubmit={async (payload) => {
            await updateAdminContent(params.id, payload);
            router.push("/admin/content");
          }}
        />
      </div>
    </main>
  );
}
