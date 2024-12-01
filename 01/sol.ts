import { zip } from "../common.ts";

const text = await Deno.readTextFile("./01/input");

const splitPairs = text.split("\n").map((l) => l.split("   "));
const arr1: number[] = [],
  arr2: number[] = [];
for (const [e1, e2] of splitPairs) {
  if (e1 === "") break;

  arr1.push(Number(e1));
  arr2.push(Number(e2));
}

arr1.sort();
arr2.sort();

let sum = 0;
for (const [e1, e2] of zip(arr1, arr2)) {
  sum += Math.abs(e1 - e2);
}

console.log("solution 1:", sum);

let simScore = 0;
for (const e1 of arr1) {
  for (const e2 of arr2) {
    if (e2 > e1) break;
    if (e2 === e1) simScore += e1;
  }
}

console.log("solution 2:", simScore);
