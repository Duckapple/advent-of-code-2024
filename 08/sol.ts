import { within } from "../common/array.ts";
import { add } from "../common/array.ts";
import { sub } from "../common/array.ts";

const text = await Deno.readTextFile("./08/input");
// const text = await Deno.readTextFile("./08/example");
const lines = text.split("\n");

const sets: Record<string, [number, number][]> = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char !== ".") {
      sets[char] ??= [];
      sets[char].push([i, j]);
    }
  }
}

const antinodes = new Set<string>();
const bounds = [
  [0, lines.length],
  [0, lines[0].length],
] as [[number, number], [number, number]];

for (const key in sets) {
  const tuples = sets[key];
  for (let i = 0; i < tuples.length - 1; i++) {
    for (let j = i + 1; j < tuples.length; j++) {
      const diff = sub(tuples[i], tuples[j]);
      for (const coords of [add(diff, tuples[i]), sub(tuples[j], diff)]) {
        if (within(coords, bounds)) {
          antinodes.add(coords.toString());
        }
      }
    }
  }
}

let sol1 = antinodes.size;

console.log("Solution 1:", sol1);

const antinodes2 = new Set<string>();
for (const key in sets) {
  const tuples = sets[key];
  for (let i = 0; i < tuples.length - 1; i++) {
    for (let j = i + 1; j < tuples.length; j++) {
      const diff = sub(tuples[i], tuples[j]);
      let addy = tuples[i];
      while (within(addy, bounds)) {
        antinodes2.add(addy.toString());
        addy = add(addy, diff);
      }
      let subby = tuples[i];
      while (within(subby, bounds)) {
        antinodes2.add(subby.toString());
        subby = sub(subby, diff);
      }
    }
  }
}

let sol2 = antinodes2.size;

console.log("Solution 2:", sol2);
