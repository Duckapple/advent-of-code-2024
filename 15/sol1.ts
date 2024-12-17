import { add, Vec2 } from "../common/array.ts";

const text = (await Deno.readTextFile("./15/input")).trim();
// const text = (await Deno.readTextFile("./15/example")).trim();
const [rawMaze, rawMoves] = text.split("\n\n");
const maze = rawMaze.split("\n").map((x) => [...x]);
const moves = rawMoves.replaceAll("\n", "");

const initial = rawMaze.indexOf("@");
let pos = [
  Math.floor(initial / (maze[0].length + 1)),
  initial % (maze[0].length + 1),
] as Vec2;

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

function tryMoveRock(pos: Vec2, adj: Vec2): boolean {
  const next = add(pos, adj);
  const nextChar = maze[next[0]][next[1]];
  if (nextChar === "#") return false;
  if (nextChar === ".") {
    maze[pos[0]][pos[1]] = ".";
    maze[next[0]][next[1]] = "O";
    return true;
  }
  if (tryMoveRock(next, adj)) {
    maze[pos[0]][pos[1]] = ".";
    maze[next[0]][next[1]] = "O";
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
  if (tryMoveRock(next, adj)) {
    maze[pos[0]][pos[1]] = ".";
    maze[next[0]][next[1]] = "@";
    return next;
  }
  return pos;
}

for (const move of moves) {
  const adj = adjOfChar(move);
  pos = tryMoveMe(pos, adj);
}

maze.forEach((x) => console.log(...x));

let sol1 = 0;

for (let i = 0; i < maze.length; i++) {
  const line = maze[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "O") {
      sol1 += 100 * i + j;
    }
  }
}

console.log("Solution 1:", sol1);
