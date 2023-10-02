import { useAuth } from "@/context/auth/auth.context";
import { EcosystemStoreSDK } from "@ecosystem-ar/sdk";

export function useSDK() {
  const { login, token } = useAuth();

  const EcosystemInstance = EcosystemStoreSDK({
    token,
    onTokenChange: login,
    base_uri: process.env.NEXT_PUBLIC_API_URI
  });

  return EcosystemInstance;
}