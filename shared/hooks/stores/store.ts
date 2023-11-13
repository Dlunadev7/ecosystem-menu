import useSWR from "swr";

import { CacheKeyEnum } from "../config/cache_keys";
import { StoreEntity } from "@ecosystem-ar/sdk";
import { useSDK } from "@/shared/api";

export function useStore(store_slug: string) {
  const { stores } = useSDK();
  const { data, error, mutate } = useSWR<StoreEntity>(store_slug ? `${CacheKeyEnum.STORE}-${store_slug}` : null, () => stores.findBySlug(store_slug));

  return ({
    store: data,
    loading_store: !data && !error,
    store_error: error,
    refetch_store: mutate,
  });
}