const text = await Deno.readTextFile("./05/input");
// const text = await Deno.readTextFile("./05/example");
const [rulesText, prints] = text.split("\n\n");

const rules = Array.from({ length: 100 }, () => new Set<number>());
for (const x of rulesText.split("\n")) {
  const [before, after] = x.split("|").map(Number);
  rules[before].add(after);
}

let sol2 = 0;
let sol1 = 0;

printLoop: for (const printText of prints.split("\n")) {
  const print = printText.split(",").map(Number);

  const mid = print[Math.floor(print.length / 2)];
  for (let i = 0; i < print.length - 1; i++) {
    for (let j = i + 1; j < print.length; j++) {
      if (rules[print[j]].has(print[i])) {
        print.sort((a, b) => {
          if (rules[a].has(b)) return -1;
          if (rules[b].has(a)) return 1;
          return 0;
        });
        const mid = print[Math.floor(print.length / 2)];
        sol2 += mid;
        continue printLoop;
      }
    }
  }
  sol1 += mid;
}

console.log("Solution 1:", sol1);
console.log("Solution 2:", sol2);
