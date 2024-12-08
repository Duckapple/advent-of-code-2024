// from https://youmightnotneed.com/lodash/#zip
export const zip = <T1 extends unknown, Tx extends unknown[][]>(
  arr: T1[],
  ...args: Tx
): [T1, ...Tx[number]][] =>
  arr.map((value, idx) => [value, ...args.map((arr) => arr[idx])]) as never;

export function add<Arr extends number[]>(arr1: Arr, arr2: Arr) {
  return arr1.map((x, i) => x + arr2[i]) as Arr;
}
export function sub<Arr extends number[]>(arr1: Arr, arr2: Arr) {
  return arr1.map((x, i) => x - arr2[i]) as Arr;
}

// export function get<T>(arr: T[][], input: number[]): T;
export function get<T>(arr: T[][], input: [number, number]): T;
export function get<T>(arr: T[][], [a, b, ...rest]: number[]) {
  return arr[a][b];
}

export function within(
  arr: [number, number],
  bounds: [[number, number], [number, number]]
) {
  return (
    bounds[0][0] <= arr[0] &&
    arr[0] < bounds[0][1] &&
    bounds[1][0] <= arr[1] &&
    arr[1] < bounds[1][1]
  );
}
