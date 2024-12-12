import { sum } from "../common/array.ts";

const text = await Deno.readTextFile("./11/input");
// const text = await Deno.readTextFile("./11/example");
const stones = text.split(" ").map((x) => Number(x));

const memo = new Map<number, number[]>();

function solve(stone: number, depthLeft: number): number {
  if (depthLeft === 0) return 1;
  let memoStone = memo.get(stone);
  if (!memoStone) {
    memoStone = [];
    memo.set(stone, memoStone);
  }
  const m = memoStone[depthLeft];
  if (m) {
    return m;
  }

  const newDepth = depthLeft - 1;
  if (stone === 0) {
    const res = solve(1, newDepth);
    memoStone[depthLeft] = res;
    return res;
  }

  const str = stone + "";
  if (str.length % 2 === 0) {
    const res =
      solve(Number(str.slice(0, str.length / 2)), newDepth) +
      solve(Number(str.slice(str.length / 2, str.length)), newDepth);
    memoStone[depthLeft] = res;
    return res;
  }

  const res = solve(stone * 2024, newDepth);
  memoStone[depthLeft] = res;
  return res;
}

console.log("Solution 1:", sum(stones.map((x) => solve(x, 25))));

console.log("Solution 2:", sum(stones.map((x) => solve(x, 75))));
