const text = await Deno.readTextFile("./09/input");
// const text = await Deno.readTextFile("./09/example");

type NR<T extends string, P extends string = ""> = Record<T, number> &
  Partial<Record<P, number>>;
const filesAndSpaces: NR<"l" | "p", "id">[] = [];

let p = 0;

for (let i = 0; i < text.length; i += 2) {
  const file = Number(text[i]);
  filesAndSpaces.push({ l: file, p, id: i / 2 });
  p += file;
  if (i + 1 === text.length) break;
  const space = Number(text[i + 1]);
  filesAndSpaces.push({ l: space, p });
  p += space;
}
// console.log(
//   ...filesAndSpaces.map((f) =>
//     Array(f.l)
//       .fill(f.id ?? ".")
//       .join("")
//   )
// );

let firstSpace = 1;

for (let i = Math.floor(text.length / 2) * 2; i > firstSpace; i--) {
  const file = filesAndSpaces[i];
  if (file.id == null) continue;
  for (let j = firstSpace; j < i; j++) {
    const space = filesAndSpaces[j];
    if (space.id != null) continue;
    if (space.l === file.l) {
      space.id = file.id;
      file.id = undefined;
      if (j === firstSpace) {
        j++;
        let sp = filesAndSpaces[j];
        while (sp.id != null) {
          sp = filesAndSpaces[++j];
        }
        firstSpace = j;
      }
      break;
    }
    if (space.l > file.l) {
      space.l -= file.l;
      file.p = space.p;
      space.p += file.l;
      filesAndSpaces.splice(i, 1);
      filesAndSpaces.splice(j, 0, file);
      break;
    }
  }
}
// console.log(
//   ...filesAndSpaces.map((f) =>
//     Array(f.l)
//       .fill(f.id ?? ".")
//       .join("")
//   )
// );

let sol2 = 0;

for (const file of filesAndSpaces) {
  let l = file.l;
  while (l && file.id) {
    sol2 += file.p++ * file.id;
    l--;
  }
}

console.log("Solution 2:", sol2);
