// from https://youmightnotneed.com/lodash/#zip
export const zip = <T1 extends unknown, Tx extends unknown[][]>(
  arr: T1[],
  ...args: Tx
): [T1, ...Tx[number]][] =>
  arr.map((value, idx) => [value, ...args.map((arr) => arr[idx])]) as never;
