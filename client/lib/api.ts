import { ContentItem } from "./content";

function resolveApiBaseUrl(): string {
  const configured = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim();
  const normalized = configured.replace(/\/+$/, "");

  if (typeof window === "undefined") {
    return normalized || "http://localhost:5000";
  }

  const runningOnLocalhost =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const pointsToLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalized);

  // In production browsers, never call localhost even if misconfigured at build time.
  if (!runningOnLocalhost && pointsToLocalhost) {
    return "";
  }

  return normalized;
}

const API_BASE_URL = resolveApiBaseUrl();
const ADMIN_TOKEN_KEY = "adminToken";

type ContentFilters = {
  page?: string;
  section?: string;
  published?: string;
};

function buildQuery(filters?: ContentFilters): string {
  if (!filters) return "";
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getAdminToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || "Request failed");
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function loginAdmin(username: string, password: string): Promise<{ token: string }> {
  return apiFetch<{ token: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function fetchAdminContent(filters?: ContentFilters): Promise<ContentItem[]> {
  const token = getAdminToken();
  return apiFetch<ContentItem[]>(`/api/admin/content${buildQuery(filters)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchPublicContent(filters?: ContentFilters): Promise<ContentItem[]> {
  return apiFetch<ContentItem[]>(`/api/public/content${buildQuery(filters)}`);
}

export type ContactFormPayload = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<{ id: string; message: string }> {
  return apiFetch<{ id: string; message: string }>("/api/public/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type ContactSubmissionItem = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export async function fetchAdminContactSubmissions(): Promise<ContactSubmissionItem[]> {
  const token = getAdminToken();
  return apiFetch<ContactSubmissionItem[]>("/api/admin/contact-submissions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchAdminContentById(id: string): Promise<ContentItem> {
  const token = getAdminToken();
  return apiFetch<ContentItem>(`/api/admin/content/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createAdminContent(payload: Partial<ContentItem>): Promise<ContentItem> {
  const token = getAdminToken();
  return apiFetch<ContentItem>("/api/admin/content", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function updateAdminContent(id: string, payload: Partial<ContentItem>): Promise<ContentItem> {
  const token = getAdminToken();
  return apiFetch<ContentItem>(`/api/admin/content/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminContent(id: string): Promise<void> {
  const token = getAdminToken();
  await apiFetch<void>(`/api/admin/content/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
