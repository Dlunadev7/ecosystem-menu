import useSWR from "swr";

import { SubscriptionEntity } from "@ecosystem-ar/sdk";

import { CacheKeyEnum } from "../config/cache_keys";
import { useSDK } from "@/shared/api";

export function useSubscriptions(subscription_id?: string) {
  const { subscriptions } = useSDK();
  const { data, error, mutate } = useSWR<SubscriptionEntity[]>(subscription_id ? `${CacheKeyEnum.SUBSCRIPTIONS}-${subscription_id}` : null, () => subscriptions.findSubscription(subscription_id as string));
  const [ sub ] = data || [];

  return ({
    subscription: sub,
    loading_subscription: !data && !error,
    subscription_error: error,
    refetch_subscription: mutate,
  });
}

export function useInvoices(subscription_id?: string) {
  const { subscriptions } = useSDK();
  const { data, error, mutate } = useSWR<any>(
    subscription_id ? `${CacheKeyEnum.INVOICES}-${subscription_id}` : null,
    () => subscriptions.findSubscriptionInvoices(subscription_id as string)
  );

  const payload = (data?.results || []).map(({ status, id, payment, debit_date, transaction_amount, currency_id }: any) => ({
    id,
    status: payment?.status || status,
    debit_date,
    amount: transaction_amount,
    currency: currency_id,
  }))

  return ({
    invoices: payload,
    loading_invoices: !data && !error,
    invoices_error: error,
    refetch_invoices: mutate,
  });
}