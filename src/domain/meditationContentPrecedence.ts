/**
 * Conteúdo remoto válido prevalece; embutido só quando remoto ausente ou vazio.
 */
export function preferRemoteList<T>(remote: T[] | null | undefined, embedded: T[]): T[] {
  if (remote != null && remote.length > 0) return remote;
  return embedded;
}

export function preferRemoteValue<T>(remote: T | null | undefined, embedded: T): T {
  if (remote != null) return remote;
  return embedded;
}
