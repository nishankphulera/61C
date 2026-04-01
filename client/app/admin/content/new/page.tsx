"use client";

import { useRouter } from "next/navigation";
import AdminContentForm from "@/components/AdminContentForm";
import { createAdminContent, getAdminToken } from "@/lib/api";
import { useEffect } from "react";

export default function NewAdminContentPage() {
  const router = useRouter();

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold">Create Content</h1>
        <AdminContentForm
          submitLabel="Create"
          onSubmit={async (payload) => {
            await createAdminContent(payload);
            router.push("/admin/content");
          }}
        />
      </div>
    </main>
  );
}
