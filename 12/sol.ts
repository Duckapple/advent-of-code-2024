import { adj, hash } from "../common/array.ts";
import type { Vec2 } from "../common/array.ts";

const text = await Deno.readTextFile("./12/input");
// const text = await Deno.readTextFile("./12/example");
// const text = await Deno.readTextFile("./12/example2");
// const text = await Deno.readTextFile("./12/example3");
const lines = text.split("\n");

function BFS(origin: Vec2) {
  const visited = new Set<number>([hash(origin, lines[0].length)]);
  const region = { area: 0, perimeter: 0, perimCount: 0 };
  const queue: Vec2[] = [origin];
  const type = lines[origin[0]][origin[1]];
  const edges: Vec2[][] = [[], [], [], []];

  while (queue.length) {
    const pos = queue.shift()!;
    region.area++;
    const allAdj = adj(pos);
    for (let i = 0; i < allAdj.length; i++) {
      const adjPos = allAdj[i];
      const under = lines[adjPos[0]]?.[adjPos[1]];
      if (under !== type) {
        region.perimeter++;
        edges[i].push(pos);
        continue;
      }
      const h = hash(adjPos, lines[0].length);
      if (!visited.has(h)) {
        queue.push(adjPos);
        visited.add(h);
      }
    }
  }

  for (let i = 0; i < edges.length; i++) {
    const ed = edges[i];
    ed.sort((a, b) => a[i % 2] - b[i % 2] || a[(i + 1) % 2] - b[(i + 1) % 2]);
    let prev = [-2, -2];
    for (const edgeSegment of ed) {
      const dist =
        Math.abs(edgeSegment[0] - prev[0]) + Math.abs(edgeSegment[1] - prev[1]);
      if (dist > 1) {
        region.perimCount++;
      }
      prev = edgeSegment;
    }
  }

  return { visited, region, type };
}

let visited = new Set<number>();
const regions: { area: number; perimeter: number; perimCount: number }[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (visited.has(hash([i, j], lines[0].length))) continue;
    const res = BFS([i, j]);
    regions.push(res.region);
    visited = visited.union(res.visited);
  }
}

console.log(
  "Solution 1:",
  regions.reduce((acc, curr) => acc + curr.area * curr.perimeter, 0)
);

let sol2 = 0;

console.log(
  "Solution 2:",
  regions.reduce((acc, curr) => acc + curr.area * curr.perimCount, 0)
);
