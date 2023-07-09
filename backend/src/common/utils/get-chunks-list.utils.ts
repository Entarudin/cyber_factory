export function getChunksList<T>(arr: T[], size: number): [T[]] {
  const result = [];

  for (let i = 0; i < Math.ceil(arr.length / size); i++) {
    result.push(arr.slice(i * size, i * size + size));
  }

  return result as [T[]];
}

export const MAX_SIZE_CHUNK = 500;
