import { useCallback, useEffect, useState } from "react";
import { parseStoredValue } from "./policy";

export function useWorkspaceStorage<T>(key: string, fallback: T) {
  const read = useCallback(() => {
    try {
      return parseStoredValue(window.localStorage.getItem(key), fallback);
    } catch {
      return fallback;
    }
  }, [key, fallback]);
  const [value, setValue] = useState<T>(read);
  useEffect(() => {
    const update = (event: StorageEvent) => {
      if (event.key === key) setValue(read());
    };
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, [key, read]);
  const write = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* Storage may be disabled. */
      }
    },
    [key],
  );
  return [value, write] as const;
}
