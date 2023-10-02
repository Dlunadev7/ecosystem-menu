import useSWR from "swr";
import { ProductEntity, IDType } from "@ecosystem-ar/sdk";

import { CacheKeyEnum } from "../config/cache_keys";
import { useSDK } from "@/shared/api";

export function useProducts(store_id: IDType) {
  const { products } = useSDK();
  const should_fetch = store_id ? `${CacheKeyEnum.PRODUCTS}-${store_id}` : null;

  const { data, error, mutate } = useSWR<ProductEntity[]>(should_fetch, () => products.findByStoreID(store_id));

  return ({
    products: data || [],
    loading_products: !data && !error,
    products_error: error,
    refetch_products: mutate,
  });
}