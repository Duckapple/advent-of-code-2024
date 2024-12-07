const text = await Deno.readTextFile("./07/input");
// const text = await Deno.readTextFile("./07/example");
const lines = text.split("\n").map((x) => x.split(": ")) as [string, string][];
const input = lines.map(
  ([x, ns]) => [Number(x), ns.split(" ").map(Number)] as const
);

let sol1 = 0;

function solve(result: number, ns: number[], acc: number): number {
  if (ns.length === 0) return acc;
  const s1 = solve(result, ns.slice(1), acc + ns[0]);
  if (s1 === result) return s1;
  const s2 = solve(result, ns.slice(1), acc * ns[0]);
  return s2;
}

for (const [result, ns] of input) {
  const res = solve(result, ns.slice(1), ns[0]);
  if (res === result) sol1 += res;
}

console.log("Solution 1:", sol1);

let sol2 = 0;

function solve2(result: number, ns: number[], acc: number): number {
  if (ns.length === 0) return acc;
  const s1 = solve2(result, ns.slice(1), acc + ns[0]);
  if (s1 === result) return s1;
  const s2 = solve2(result, ns.slice(1), acc * ns[0]);
  if (s2 === result) return s2;
  const s3 = solve2(result, ns.slice(1), Number(acc + "" + ns[0]));
  return s3;
}

for (const [result, ns] of input) {
  const res = solve2(result, ns.slice(1), ns[0]);
  if (res === result) sol2 += res;
}

console.log("Solution 2:", sol2);
