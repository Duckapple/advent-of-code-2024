export type Vec2 = [number, number];

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
export function get<T>(arr: T[][], input: Vec2): T;
export function get<T>(arr: T[][], [a, b, ...rest]: number[]) {
  return arr[a][b];
}

export function within(arr: Vec2, bounds: [Vec2, Vec2]) {
  return (
    bounds[0][0] <= arr[0] &&
    arr[0] < bounds[0][1] &&
    bounds[1][0] <= arr[1] &&
    arr[1] < bounds[1][1]
  );
}

export function adj(pos: Vec2): Vec2[] {
  return [
    add(pos, [-1, 0]),
    add(pos, [0, -1]),
    add(pos, [1, 0]),
    add(pos, [0, 1]),
  ];
}
