export function isEmbedded(): boolean {
  return typeof window !== "undefined" &&
    ((window.self !== window.top) || (!!window.location && new URLSearchParams(window.location.search).get("embedded") === "true"));
}

export function parseStoredValue<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export function webHosts(hosts: string[] | Record<string, number>): string[] {
  return Array.isArray(hosts) ? hosts : Object.keys(hosts);
}
