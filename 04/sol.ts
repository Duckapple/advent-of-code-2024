const text = await Deno.readTextFile("./04/input");
// const text = await Deno.readTextFile("./04/example");

let sol1 = 0;
const lines1 = `   ${text}   `.replaceAll("\n", "   \n   ").split("\n");
lines1.unshift(...Array(3).fill(lines1[0].replaceAll(/./g, " ")));
lines1.push(...Array(3).fill(lines1[0]));

for (let i = 0; i < lines1.length; i++) {
  const line = lines1[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "X") {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) continue;
          const M = lines1[i + x][j + y],
            A = lines1[i + 2 * x][j + 2 * y],
            S = lines1[i + 3 * x][j + 3 * y];

          if (M === "M" && A === "A" && S === "S") {
            sol1++;
          }
        }
      }
    }
  }
}

console.log("Solution 1:", sol1);

// lines1.forEach((x) => console.log(x));

let sol2 = 0;
for (let i = 0; i < lines1.length; i++) {
  const line = lines1[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "A") {
      const TL = lines1[i - 1][j - 1],
        BL = lines1[i + 1][j - 1],
        TR = lines1[i - 1][j + 1],
        BR = lines1[i + 1][j + 1];

      if ((TL === "S" && BR === "M") || (TL === "M" && BR === "S")) {
        if ((TR === "S" && BL === "M") || (TR === "M" && BL === "S")) {
          //   console.log(lines1[i - 1].slice(j - 1, j + 2));
          //   console.log(lines1[i].slice(j - 1, j + 2));
          //   console.log(lines1[i + 1].slice(j - 1, j + 2));
          //   console.log(i - 3, j - 3);
          //   console.log("================");
          sol2++;
        }
      }
    }
  }
}

console.log("Solution 2:", sol2);
