// from https://youmightnotneed.com/lodash/#zip
export const zip = <T1 extends unknown, Tx extends unknown[][]>(
  arr: T1[],
  ...args: Tx
): [T1, ...Tx[number]][] =>
  arr.map((value, idx) => [value, ...args.map((arr) => arr[idx])]) as never;

export function add<T extends number>(arr1: T[], arr2: T[]) {
  return arr1.map((x, i) => x + arr2[i]);
}

// export function get<T>(arr: T[][], input: number[]): T;
export function get<T>(arr: T[][], input: [number, number]): T;
export function get<T>(arr: T[][], [a, b, ...rest]: number[]) {
  return arr[a][b];
}
