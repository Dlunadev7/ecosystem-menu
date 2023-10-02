import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useQuery() {
  const { query } = useRouter();
  return useMemo(() => query, [query]);
}
