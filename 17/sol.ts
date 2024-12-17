import { setTimeout } from "node:timers/promises";

const text = (await Deno.readTextFile("./17/input")).trim();
// const text = (await Deno.readTextFile("./17/example")).trim();
const [regs, rawProgram] = text.split("\n\n");
const program = rawProgram
  .split(": ")[1]
  .split(",")
  .map((x) => Number(x));
let [regA, regB, regC] = regs.split("\n").map((x) => Number(x.split(": ")[1]));

let ip = 0;

console.log({ ip, regA, regB, regC, program });

const output: number[] = [];

function valueOf(comboOperand: number) {
  if (comboOperand === 6) return regC;
  if (comboOperand === 5) return regB;
  if (comboOperand === 4) return regA;
  return comboOperand;
}

function adv(combo: number) {
  regA = Math.floor(regA / Math.pow(2, valueOf(combo)));
}

function bxl(literal: number) {
  regB = regB ^ literal;
}

function bst(combo: number) {
  regB = valueOf(combo) % 8;
}

function jnz(literal: number) {
  if (regA === 0) return;
  ip = literal;
  return true; // did jump
}

function bxc(ignore: number) {
  regB = regB ^ regC;
}

function out(combo: number) {
  output.push(valueOf(combo) % 8);
}

function bdv(combo: number) {
  regB = Math.floor(regA / Math.pow(2, valueOf(combo)));
}

function cdv(combo: number) {
  regC = Math.floor(regA / Math.pow(2, valueOf(combo)));
}

const instructions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

while (ip < program.length) {
  const instr = instructions[program[ip]];
  const operand = program[ip + 1];
  const didJump: unknown = instr(operand);
  !didJump && (ip += 2);
}

console.log("Solution 1:", output.join(","));

let sol2 = 0;

console.log("Solution 2:", sol2);
