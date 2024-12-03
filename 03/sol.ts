const text = await Deno.readTextFile("./03/input");

let sol1 = 0;
let sol2 = 0;
const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
let search = regex.exec(text);
let enabled = true;
while (search) {
  const [word, n1, n2] = search;
  if (word === "do()") {
    if (!enabled) {
      enabled = true;
    }
  } else if (word === "don't()") {
    if (enabled) {
      enabled = false;
    }
  } else {
    sol1 += Number(n1) * Number(n2);
    if (enabled) sol2 += Number(n1) * Number(n2);
  }
  search = regex.exec(text);
}

console.log("Solution 1:", sol1);

console.log("Solution 2:", sol2);
