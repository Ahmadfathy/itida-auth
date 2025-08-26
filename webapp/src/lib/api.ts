export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${apiBaseUrl}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const problem = await res.json().catch(() => ({}));
    throw Object.assign(new Error(problem?.title || 'Request failed'), { problem });
  }
  return (await res.json()) as T;
}
