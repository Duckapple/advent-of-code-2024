const text = await Deno.readTextFile("./02/input");

function isGood(ns: number[]) {
  const [n1, n2] = ns;
  ns.shift();
  let prev = n1;
  if (n1 > n2) {
    for (const n of ns) {
      if (prev <= n || prev - n > 3) {
        return false;
      }
      prev = n;
    }
  } else {
    for (const n of ns) {
      if (prev >= n || n - prev > 3) {
        return false;
      }
      prev = n;
    }
  }
  return true;
}

let sol1 = 0;

for (const list of text.split("\n")) {
  const ns = list.split(" ").map(Number);
  if (isGood(ns)) sol1++;
}

console.log("Solution 1:", sol1);

let sol2 = 0;
for (const list of text.split("\n")) {
  const ns = list.split(" ").map(Number);
  if (isGood([...ns])) {
    sol2++;
    continue;
  }
  for (let i = 0; i < ns.length; i++) {
    const x = ns.toSpliced(i, 1);
    if (isGood([...x])) {
      sol2++;
      break;
    }
  }
}

console.log("Solution 2:", sol2);
