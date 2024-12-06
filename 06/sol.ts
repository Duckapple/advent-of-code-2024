import { add } from "../common/array.ts";

const text = await Deno.readTextFile("./06/input");
// const text = await Deno.readTextFile("./06/example");
const map = text.split("\n").map((x) => [...x]);

let sol2 = 0;

const y = map.findIndex((x) => x.includes("^"));
const x = map[y].indexOf("^");
const location = [y, x];

const direction = [-1, 0];
function turn(direction: number[]) {
  return [direction[1], -direction[0]];
}

map[y][x] = "U";
function dirChar(direction: number[]) {
  if (direction[0] > 0) return "D";
  if (direction[0] < 0) return "U";
  if (direction[1] > 0) return "R";
  return "L";
}

function solve(
  map: string[][],
  location: number[],
  direction: number[],
  attempts = 0
) {
  let sol1 = 1;
  while (true) {
    const nextCoord = add(location, direction) as [number, number];
    const [i, j] = nextCoord;
    if (0 > i || i >= map.length || 0 > j || j >= map[0].length)
      return [sol1] as const;
    const nextChar = map[i][j];
    if (nextChar === ".") {
      sol1++;
      if (attempts > 0) {
        const args = structuredClone([map, location, direction] as const);
        args[0][i][j] = "#";
        const [isLoop] = solve(...args);
        if (isLoop === -1) {
          sol2++;
        }
      }
      map[i][j] = dirChar(direction);
    } else if (nextChar === "#") {
      direction = turn(direction);
      continue;
    } else if (nextChar === dirChar(direction)) {
      // map.forEach((x) => console.log(...x));
      return [-1];
    }
    location = add(location, direction);
  }
}

const [sol1] = solve(map, location, direction, 1);
// map.forEach((x) => console.log(...x));

console.log("Solution 1:", sol1);

console.log("Solution 2:", sol2);
