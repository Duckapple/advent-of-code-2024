import { add, adj, hash, Vec2 } from "../common/array.ts";

const text = await Deno.readTextFile("./10/input");
// const text = await Deno.readTextFile("./10/example");
const lines = text.split("\n").map((x) => [...x].map((y) => Number(y)));

// const memo = Array.from(lines, (a) => Array<{ nines: number }>(a.length));

const graph = Array.from({ length: lines.length }, () =>
  Array.from({ length: lines.length }, () => [] as Vec2[])
);

const zeros: Vec2[] = [];
const nines: Vec2[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === 0) {
      zeros.push([i, j]);
      // BFS([i, j], 0);
    }
    if (line[j] === 9) {
      nines.push([i, j]);
      continue;
    }
    const adjacent = adj([i, j]);
    for (let index = 0; index < adjacent.length; index++) {
      const e = adjacent[index];
      if (lines[e[0]]?.[e[1]] === line[j] + 1) {
        graph[i][j][index] = add([i, j], adj[index as keyof typeof adj]);
      }
    }
  }
}
graph.forEach((arr) =>
  arr.forEach((x, i) => (arr[i] = x.filter((y) => y != null)))
);

const hashNines = nines.map((x) => hash(x, graph[0].length));

function BFS(origin: Vec2, graph: Vec2[][][]) {
  const visited = new Set<number>([hash(origin, graph[0].length)]);
  const queue: Vec2[] = [origin];

  while (queue.length) {
    const pos = queue.shift()!;
    for (const adjPos of graph[pos[0]][pos[1]]) {
      const h = hash(adjPos, graph[0].length);
      // console.log(adjPos, h);
      if (visited.has(h)) continue;
      visited.add(h);
      queue.push(adjPos);
    }
  }

  return hashNines.filter((nineH) => visited.has(nineH)).length;
}

let sol1 = 0;

for (const zero of zeros) {
  sol1 += BFS(zero, graph);
}

// console.log(zeros, nines);
// graph.forEach((x) => console.log(...x));

console.log("Solution 1:", sol1);

const memo: number[] = [];
hashNines.forEach((nine) => (memo[nine] = 1));

function DFS(pos: Vec2, graph: Vec2[][][]) {
  let count = 0;
  for (const adjPos of graph[pos[0]][pos[1]]) {
    const h = hash(adjPos, graph[0].length);
    if (memo[h]) {
      count += memo[h];
      continue;
    }
    count += DFS(adjPos, graph);
  }
  memo[hash(pos, graph[0].length)] = count;
  return count;
}

let sol2 = 0;
for (const zero of zeros) {
  sol2 += DFS(zero, graph);
}

console.log("Solution 2:", sol2);
