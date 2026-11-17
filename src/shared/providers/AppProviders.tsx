import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

import { ChantProvider } from '@/features/chant/ChantProvider';
import { PreferencesProvider } from '@/features/preferences/PreferencesProvider';

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <ChantProvider>{children}</ChantProvider>
      </PreferencesProvider>
    </QueryClientProvider>
  );
}
