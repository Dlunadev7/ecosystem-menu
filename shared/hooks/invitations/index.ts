import useSWR from "swr";
import { IDType, InvitationEntity } from "@ecosystem-ar/sdk";

import { CacheKeyEnum } from "../config/cache_keys";
import { useSDK } from "@/shared/api";

export function useInvitations(store: IDType, user: IDType) {
  const { users } = useSDK();
  const { data, error, mutate } = useSWR<InvitationEntity[]>(store ? `${CacheKeyEnum.INVITATIONS}-${store}` : null, () => users.findInvitationsByStore(user, store));

  return ({
    invitations: data || [],
    loading_invitations: !data && !error,
    invitations_error: error,
    refetch_invitations: mutate,
  });
}

export function useUserInvitations(user: IDType) {
  const { users } = useSDK();
  const { data, error, mutate } = useSWR<InvitationEntity[]>(user ? `${CacheKeyEnum.INVITATIONS}-${user}` : null, () => users.findInvitationsByGuest(user));

  return ({
    invitations: data || [],
    loading_invitations: !data && !error,
    invitations_error: error,
    refetch_invitations: mutate,
  });
}