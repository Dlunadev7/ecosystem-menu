import useSWR from "swr";

import { CacheKeyEnum } from "../config/cache_keys";
import { useSDK } from "@/shared/api";

export function useUserStores(token?: string) {
  const { stores } = useSDK();
  const { data, error, mutate } = useSWR(token ? CacheKeyEnum.USER_STORES : null, stores.userStores);

  return ({
    user_stores: data,
    loading_user_stores: !data && !error,
    user_stores_error: error,
    refetch_user_stores: mutate,
  });
}