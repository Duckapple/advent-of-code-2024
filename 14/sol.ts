import { setTimeout } from "node:timers/promises";
import { add, groupBy, hash, Vec2 } from "../common/array.ts";

const text = (await Deno.readTextFile("./14/input")).trim();
const space: Vec2 = [101, 103];
// const text = (await Deno.readTextFile("./14/example")).trim();
// const space: Vec2 = [11, 7];

const robots = text.split("\n").map((x) => {
  const [p, v] = x
    .split(" ")
    .map((s) => s.split("=")[1].split(",").map(Number) as Vec2);
  return { p, v };
});

function mod(x: number, y: number) {
  return ((x % y) + y) % y;
}
function mod2(p: Vec2) {
  return [mod(p[0], space[0]), mod(p[1], space[1])] as Vec2;
}

const newPos = robots.map(({ p, v }) => add(p, [v[0] * 100, v[1] * 100]));
const modded = newPos.map(
  ([p1, p2]) => [mod(p1, space[0]), mod(p2, space[1])] as Vec2
);

function score(arr: Vec2[]) {
  const qs = [0, 0, 0, 0];
  const a0 = Math.floor(space[0] / 2);
  const a1 = Math.floor(space[1] / 2);
  for (const [p0, p1] of arr) {
    if (p0 > a0 && p1 > a1) qs[0]++;
    if (p0 < a0 && p1 > a1) qs[1]++;
    if (p0 > a0 && p1 < a1) qs[2]++;
    if (p0 < a0 && p1 < a1) qs[3]++;
  }
  return qs[0] * qs[1] * qs[2] * qs[3];
}

// console.log(modded);
// log(modded);

console.log("Solution 1:", score(modded));

function log(modded: Vec2[]) {
  const map = Array.from({ length: space[1] }, () => Array(space[0]).fill(0));
  modded.forEach(([p1, p2]) => map[p2][p1]++);
  map.forEach((map) => console.log(...map.map((x) => (x ? x : "."))));
}

const positions = robots.map(({ p, v }) => p);
for (let i = 0; true; i++) {
  for (let j = 0; j < positions.length; j++) {
    positions[j] = mod2(add(positions[j], robots[j].v));
  }
  // if (score(positions) > 225943500 / 3) continue;
  if (groupBy(positions, (a) => a[0])[45]?.length < 30) continue;
  if (groupBy(positions, (a) => a[1])[52]?.length < 30) continue;
  // if (new Set(positions.map((x) => hash(x, 101))).size > 490) continue;
  // if (
  //   Object.entries(groupBy(positions, (a) => a[0])).sort(
  //     (e1, e2) => e1[1][0] - e2[1][0]
  //   )[0][1] < 15
  // )
  //   continue;
  console.log(i + 1);
  log(positions);
  await setTimeout(1000);
}
