const now = new Date();
const year = now.getFullYear(),
  day = Number(Deno.args[0]) ?? now.getDate();
const url = `https://adventofcode.com/${year}/day/${day}`;

const dir = `./${day < 10 ? "0" + day : day}`;

const folderSetup = Deno.mkdir(dir).then(() => {
  return Promise.all([
    Deno.writeTextFile(dir + "/example", ""),
    Deno.writeTextFile(
      dir + "/sol.ts",
      `
let sol1 = 0;

console.log('Solution 1:', sol1);



let sol2 = 0;

console.log('Solution 2:', sol2);
`
    ),
  ]).then(() =>
    new Deno.Command("code", { args: ["-r", dir + "/sol.ts"] }).spawn()
  );
});

// Borrowed from https://github.com/skoshx/deno-open/blob/master/index.ts
new Deno.Command("xdg-open", { args: [url] }).spawn();

const inputRes = await fetch(url + "/input", {
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    Cookie: Deno.readTextFileSync("./.env"),
  },
});
const inputText = await inputRes.text();
await Promise.all([folderSetup, Deno.writeTextFile(dir + "/input", inputText)]);
