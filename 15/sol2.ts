import { setTimeout } from "node:timers/promises";
import { add, hash, Vec2 } from "../common/array.ts";

const text = (await Deno.readTextFile("./15/input")).trim();
// const text = (await Deno.readTextFile("./15/example")).trim();
// const text = (await Deno.readTextFile("./15/example2")).trim();
// const text = (await Deno.readTextFile("./15/small1")).trim();
const [rawMaze, rawMoves] = text.split("\n\n");
const maze = rawMaze.split("\n").map((x) =>
  [...x].flatMap((x) => {
    switch (x) {
      case ".":
        return [".", "."];
      case "@":
        return ["@", "."];
      case "O":
        return ["[", "]"];
      case "#":
        return ["#", "#"];
    }
  })
);
const moves = rawMoves.replaceAll("\n", "");

let initialColumn = -1;
const initialRow = maze.findIndex((x) => {
  const y = x.indexOf("@");
  if (y > initialColumn) initialColumn = y;
  return y > -1;
});
let pos = [initialRow, initialColumn] as Vec2;

function adjOfChar(char: string): Vec2 {
  switch (char) {
    case ">":
      return [0, 1];
    case "^":
      return [-1, 0];
    case "<":
      return [0, -1];
    case "v":
      return [1, 0];
  }
  throw new Error("Bad instruction " + char);
}

function hashOfPos(pos: Vec2) {
  return hash(pos, maze[0].length);
}

function tryMoveRockY(
  pos: Vec2,
  adj: Vec2
): false | ((cache: Set<number>) => void) {
  const char = maze[pos[0]][pos[1]];
  const next = add(pos, adj);
  const nextChar = maze[next[0]][next[1]];
  if (nextChar === "#") return false;
  if (nextChar === ".") {
    return (cache) => {
      const h = hashOfPos(pos);
      if (cache.has(h)) return;
      maze[pos[0]][pos[1]] = ".";
      maze[next[0]][next[1]] = char;
      cache.add(h);
    };
  }
  const other =
    nextChar === "[" ? add(next, [0, 1] as Vec2) : add(next, [0, -1] as Vec2);

  const resses =
    nextChar === char
      ? [tryMoveRockY(next, adj)]
      : [tryMoveRockY(next, adj), tryMoveRockY(other, adj)];
  if (resses.every((x) => typeof x === "function")) {
    return (cache) => {
      for (const x of resses) {
        x(cache);
      }
      const h = hashOfPos(pos);
      if (cache.has(h)) return;
      maze[pos[0]][pos[1]] = ".";
      maze[next[0]][next[1]] = char;
      cache.add(h);
    };
  }
  return false;
}

function tryMoveRockX(pos: Vec2, adj: Vec2): boolean {
  const char = maze[pos[0]][pos[1]];
  const next = add(pos, adj);
  const nextChar = maze[next[0]][next[1]];
  if (nextChar === "#") return false;
  if (nextChar === ".") {
    maze[pos[0]][pos[1]] = ".";
    maze[next[0]][next[1]] = char;
    return true;
  }
  if (tryMoveRockX(next, adj)) {
    maze[pos[0]][pos[1]] = ".";
    maze[next[0]][next[1]] = char;
    return true;
  }
  return false;
}

function tryMoveMe(pos: Vec2, adj: Vec2): Vec2 {
  const next = add(pos, adj);
  const nextChar = maze[next[0]][next[1]];
  if (nextChar === "#") return pos;
  if (nextChar === ".") {
    maze[pos[0]][pos[1]] = ".";
    maze[next[0]][next[1]] = "@";
    return next;
  }
  if (adj[1]) {
    if (tryMoveRockX(next, adj)) {
      maze[pos[0]][pos[1]] = ".";
      maze[next[0]][next[1]] = "@";
      return next;
    }
    return pos;
  }
  const other =
    nextChar === "[" ? add(next, [0, 1] as Vec2) : add(next, [0, -1] as Vec2);
  const [res1, res2] = [tryMoveRockY(next, adj), tryMoveRockY(other, adj)];
  if (res1 && res2) {
    const cache = new Set<number>();
    res1(cache);
    res2(cache);
    maze[pos[0]][pos[1]] = ".";
    maze[next[0]][next[1]] = "@";
    return next;
  }
  return pos;
}

let i = 0;
for (const move of moves) {
  // maze.forEach((x) => console.log(...x));
  const adj = adjOfChar(move);
  pos = tryMoveMe(pos, adj);
  // await setTimeout(50);
  // console.log(move, i);
  i++;
}

maze.forEach((x) => console.log(...x));

let sol2 = 0;

for (let i = 0; i < maze.length; i++) {
  const line = maze[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "[") {
      sol2 += 100 * i + j;
    }
  }
}

console.log("Solution 2:", sol2);
