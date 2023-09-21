// adapted from https://stackoverflow.com/a/2450976
export function shuffle<T>(array: T[]): T[] {
  const copy = array.slice();
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [copy[currentIndex], copy[randomIndex]] = [
      copy[randomIndex],
      copy[currentIndex],
    ];
  }

  return copy;
}

export function repeat<T>(
  n: number,
  callback: (i: number) => T = (i) => i as unknown as T
): T[] {
  return Array.from({ length: n }, (_, i) => callback(i));
}
