import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useQueryState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<T>(defaultValue);

  // useEffect(() => {
  //   const value = searchParams.get(key);

  //   if (typeof value === "string") {
  //     try {
  //       const parsedValue = JSON.parse(value) as T;
  //       setState(parsedValue);
  //     } catch (e) {
  //       console.error(`Error parsing query parameter ${key}:`, e);
  //       setState(defaultValue);
  //     }
  //   } else if (value === undefined) {
  //     setState(defaultValue);
  //   }
  // }, [key, defaultValue]);

  const setQueryState = useCallback(
    (value: T) => {
      const params = new URLSearchParams(
        searchParams as unknown as Record<string, string>
      );
      params.set(key, JSON.stringify(value));

      router.replace(`?${params.toString()}`);
      setState(value);
    },
    [key, router]
  );

  return [state, setQueryState];
}

// import { useRouter } from "next/navigation";
// import { useRef, useCallback, useEffect, useState } from "react";

// export function useQueryState<T>(
//   key: string,
//   defaultValue: T
// ): [T, (value: T) => void] {
//   const router = useRouter();
//   const isFirstUpdate = useRef(true);
//   const [state, setState] = useState<T>(defaultValue);

//   useEffect(() => {
//     const value = router.query[key];
//     if (typeof value === "string") {
//       try {
//         const parsedValue = JSON.parse(value) as T;
//         setState(parsedValue);
//       } catch (e) {
//         console.error(`Error parsing query parameter ${key}:`, e);
//         setState(defaultValue);
//       }
//     } else if (value === undefined && router.isReady) {
//       setState(defaultValue);
//     }
//   }, [router.query, key, router.isReady]);

//   const setQueryState = useCallback(
//     (value: T) => {
//       const url = new URL(window.location.href);
//       url.searchParams.set(key, JSON.stringify(value));

//       if (isFirstUpdate.current) {
//         router
//           .push(url, undefined, { scroll: false, shallow: true })
//           .then(() => {
//             isFirstUpdate.current = false;
//           })
//           .catch(console.error);
//       } else {
//         router
//           .replace(url, undefined, { scroll: false, shallow: true })
//           .catch(console.error);
//       }

//       setState(value);
//     },
//     [key, router]
//   );

//   return [state, setQueryState];
// }
