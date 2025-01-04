import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useQueryState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state from URL or default value
  const [state, setState] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const value = searchParams.get(key);
      if (value) {
        try {
          return JSON.parse(value) as T;
        } catch (e) {
          console.error(`Error parsing query parameter ${key}:`, e);
        }
      }
    }
    return defaultValue;
  });

  // Only sync from URL when searchParams changes and the value is different
  useEffect(() => {
    const value = searchParams.get(key);
    const currentStateAsString = JSON.stringify(state);

    // Only update if the URL value is different from current state
    if (value && value !== currentStateAsString) {
      try {
        const parsedValue = JSON.parse(value) as T;
        if (JSON.stringify(parsedValue) !== currentStateAsString) {
          setState(parsedValue);
        }
      } catch (e) {
        console.error(`Error parsing query parameter ${key}:`, e);
      }
    } else if (
      !value &&
      currentStateAsString !== JSON.stringify(defaultValue)
    ) {
      setState(defaultValue);
    }
  }, [searchParams, key, defaultValue]);

  const setQueryState = useCallback(
    (value: T) => {
      const params = new URLSearchParams(searchParams.toString());
      const valueString = JSON.stringify(value);

      // Only update URL if the value is different
      if (valueString !== params.get(key)) {
        params.set(key, valueString);
        router.replace(`?${params.toString()}`);
        setState(value);
      }
    },
    [key, router, searchParams]
  );

  return [state, setQueryState];
}
