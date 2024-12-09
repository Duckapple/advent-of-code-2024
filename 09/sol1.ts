const text = await Deno.readTextFile("./09/input");
// const text = await Deno.readTextFile("./09/example");

let fp = 0;
let bp = Math.floor(text.length / 2);
let i = 0;
const backlog: number[] = [];

let sol1 = BigInt(0);

const vis = [];

while (fp <= bp) {
  let amount = Number(text[fp * 2]);
  while (amount--) {
    sol1 += BigInt(i++ * fp);
    vis.push(fp);
  }
  let space = Number(text[fp * 2 + 1]);
  while (space--) {
    let used = backlog.pop();
    while (!used) {
      amount = Number(text[bp * 2]);
      backlog.unshift(...Array<number>(amount).fill(bp));
      // console.log(bp, text[bp * 2], amount, backlog);
      used = backlog.pop();
      bp--;
    }
    sol1 += BigInt(i++ * used!);
    vis.push(used);
  }

  fp++;
}
while (backlog.length) {
  const used = backlog.pop();
  sol1 += BigInt(i++ * used!);
  vis.push(used);
}

// console.log(...vis);
console.log("Solution 1:", sol1);
