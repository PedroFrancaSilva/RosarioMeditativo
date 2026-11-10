import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const DEV_TOOLS_ENABLED_KEY = '@rosario/dev/tools-enabled';
export const DEV_TOOLS_QUERY_KEY = ['dev-tools-enabled'] as const;

async function readDevToolsEnabled(): Promise<boolean> {
  if (!__DEV__) return false;
  return (await AsyncStorage.getItem(DEV_TOOLS_ENABLED_KEY)) === '1';
}

async function writeDevToolsEnabled(enabled: boolean): Promise<boolean> {
  await AsyncStorage.setItem(DEV_TOOLS_ENABLED_KEY, enabled ? '1' : '0');
  return enabled;
}

/** Só em `__DEV__`: ferramentas extras (ex. painel de crop na oração). */
export function useDevToolsEnabled() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: DEV_TOOLS_QUERY_KEY,
    queryFn: readDevToolsEnabled,
    enabled: __DEV__,
    staleTime: 0,
  });

  const mutation = useMutation({
    mutationFn: writeDevToolsEnabled,
    onSuccess: (enabled) => {
      queryClient.setQueryData(DEV_TOOLS_QUERY_KEY, enabled);
    },
  });

  return {
    enabled: __DEV__ ? (query.data ?? false) : false,
    isReady: !__DEV__ || !query.isLoading,
    setEnabled: (enabled: boolean) => {
      if (!__DEV__) return;
      mutation.mutate(enabled);
    },
    isSaving: mutation.isPending,
  };
}
