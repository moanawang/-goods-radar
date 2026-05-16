import type { Stall } from "@/lib/data";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

async function request<T>(url: string): Promise<T> {
  console.log("[frontend api] request", { url });

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });
  const payload = (await response.json()) as ApiResponse<T>;

  console.log("[frontend api] response", {
    url,
    ok: response.ok,
    status: response.status,
    hasData: payload.data !== undefined,
    error: payload.error ?? null,
  });

  if (!response.ok || payload.error || payload.data === undefined) {
    throw new Error(payload.error ?? "请求失败，请稍后再试");
  }

  return payload.data;
}

export function fetchStalls() {
  return request<Stall[]>("/api/stalls");
}

export function searchStallsByIp(query: string) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set("q", query.trim());
  }

  const suffix = params.toString();
  const url = `/api/stalls/search${suffix ? `?${suffix}` : ""}`;

  console.log("[frontend search] calling stalls search API", {
    query,
    url,
  });

  return request<Stall[]>(url);
}

export function fetchStallById(id: string) {
  return request<Stall>(`/api/stalls/${encodeURIComponent(id)}`);
}
