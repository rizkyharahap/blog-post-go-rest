import { useCallback } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export function usePostsParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
  const perPage = searchParams.has("per-page")
    ? Number(searchParams.get("per-page"))
    : 10;
  const filter = searchParams.get("filter") ?? "all";
  const search = searchParams.get("search") ?? "";

  const handleChangeParams = useCallback(
    (paramsObj: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const key in paramsObj) {
        const param = paramsObj[key];
        params.set(key, param);
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  return { page, perPage, filter, search, handleChangeParams };
}
