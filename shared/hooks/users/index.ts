import useSWR from "swr";
import { IDType, StaffType } from "@ecosystem-ar/sdk";

import { CacheKeyEnum } from "../config/cache_keys";
import { useSDK } from "@/shared/api";

export function useStaff(store: IDType) {
  const { users } = useSDK();
  const { data, error, mutate } = useSWR<StaffType[]>(store ? `${CacheKeyEnum.STORE_STAFF}-${store}` : null, () => users.findUsersByStore(store));

  return ({
    staff: data || [],
    loading_staff: !data && !error,
    staff_error: error,
    refetch_staff: mutate,
  });
}