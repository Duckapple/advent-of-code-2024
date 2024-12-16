export type Vec2<T = number> = [T, T];

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

adj[0] = [-1, 0] as Vec2;
adj[1] = [0, -1] as Vec2;
adj[2] = [1, 0] as Vec2;
adj[3] = [0, 1] as Vec2;

export function sum(arr: number[]) {
  let sum = 0;
  for (const element of arr) {
    sum += element;
  }
  return sum;
}

export function hash(pos: Vec2, oneDimLength: number) {
  return pos[0] * oneDimLength + pos[1];
}

export function unhash(pos: number, oneDimLength: number) {
  return [Math.floor(pos / oneDimLength), pos % oneDimLength];
}

export function groupBy<T, U extends string | number | symbol>(
  arr: T[],
  f: (t: T) => U
): Record<U, T[]> {
  const res = {} as Record<U, T[]>;
  for (const el of arr) {
    const x = f(el);
    res[x] ??= [];
    res[x].push(el);
  }
  return res;
}
