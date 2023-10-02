import useSWR from "swr";
import { CategoryEntity, IDType } from "@ecosystem-ar/sdk";

import { CacheKeyEnum } from "../config/cache_keys";
import { useSDK } from "@/shared/api";

export function useCategories(store_id: IDType) {
  const { categories } = useSDK();
  const should_fetch = store_id ? `${CacheKeyEnum.CATEGORIES}-${store_id}` : null;
  const { data, error, mutate } = useSWR<CategoryEntity[]>(should_fetch, () => categories.findByStoreID(store_id));

  return ({
    categories: data || [],
    loading_categories: !data && !error,
    categories_error: error,
    refetch_categories: mutate,
  });
}