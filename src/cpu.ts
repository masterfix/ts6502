import CpuInterface from './cpu-interface';
import CyclesCounter from './cycles-counter';
import Instruction from './instruction';
import LdaImInstruction from './instructions/lda/lda-im';
import Ram from './ram';
import { Byte, Word } from './types';

enum WordTypes {
  PC,
  SP,
}

enum Registers {
  A,
  X,
  Y,
}

interface StatusFlags {
  C: boolean;
  Z: boolean;
  I: boolean;
  D: boolean;
  B: boolean;
  O: boolean;
  N: boolean;
}

const INSTRUCTIONS: Instruction[] = [
  LdaImInstruction,
];

export default class Cpu implements CpuInterface {
  private readonly registersArray: Uint8Array;

  private readonly wordArray: Uint16Array;

  public readonly flags: StatusFlags;

  private readonly ram: Ram;

  private readonly instructionsMap: Map<Byte, Instruction>;

  constructor(ram: Ram) {
    this.ram = ram;
    this.registersArray = new Uint8Array(Object.values(Registers).length);
    this.wordArray = new Uint16Array(Object.values(WordTypes).length);
    this.flags = {
      C: false,
      Z: false,
      I: false,
      D: false,
      B: false,
      O: false,
      N: false,
    };
    this.instructionsMap = new Map<Byte, Instruction>();
    INSTRUCTIONS.forEach((instruction) => {
      this.instructionsMap.set(instruction.opCode, instruction);
    });
  }

  getPC(): Word {
    return this.wordArray[WordTypes.PC];
  }

  setPC(value: Word): void {
    this.wordArray[WordTypes.PC] = value;
  }

  getSP(): Word {
    return this.wordArray[WordTypes.SP];
  }

  setSP(value: Word): void {
    this.wordArray[WordTypes.SP] = value;
  }

  getX(): Byte {
    return this.registersArray[Registers.X];
  }

  setX(value: Byte): void {
    this.registersArray[Registers.X] = value;
  }

  getY(): Byte {
    return this.registersArray[Registers.Y];
  }

  setY(value: Byte): void {
    this.registersArray[Registers.Y] = value;
  }

  getA(): Byte {
    return this.registersArray[Registers.A];
  }

  setA(value: number): void {
    this.registersArray[Registers.A] = value;
  }

  reset(): void {
    this.setPC(0xFFFC);
    this.setSP(0x0100);
    this.setA(0);
    this.setX(0);
    this.setY(0);
    this.flags.C = false;
    this.flags.Z = false;
    this.flags.I = false;
    this.flags.D = false;
    this.flags.B = false;
    this.flags.O = false;
    this.flags.N = false;

    this.ram.init();
  }

  execute(cycles: number): void {
    const cyclesCounter = new CyclesCounter(cycles);
    while (cyclesCounter.cycles > 0) {
      const instruction = this.fetchByte(cyclesCounter);
      const instructionImplementation = this.instructionsMap.get(instruction);
      if (instructionImplementation) {
        instructionImplementation.execute(this, cyclesCounter);
      } else {
        console.log(`unhandled instruction: ${Cpu.formatByte(instruction)}`);
      }
    }
  }

  fetchByte(cycles: CyclesCounter): Byte {
    const data = this.ram.read(this.getPC());
    this.setPC(this.getPC() + 1);
    cycles.decrement();
    return data;
  }

  printStatus(): void {
    this.printStatusTable();
    console.log();
    this.printFlags();
  }

  private printStatusTable(): void {
    const PC = Cpu.formatWord(this.getPC());
    const SP = Cpu.formatWord(this.getSP());
    const A = Cpu.formatByte(this.getA());
    const X = Cpu.formatByte(this.getX());
    const Y = Cpu.formatByte(this.getY());
    console.log('+----------------+----------------+------------+------------+------------+');
    console.log('+ PC             | SP             | A          | X          | Y          |');
    console.log('+----------------+----------------+------------+------------+------------+');
    console.log(`+ ${PC} | ${SP} | ${A} | ${X} | ${Y} |`);
    console.log('+----------------+----------------+------------+------------+------------+');
  }

  private printFlags(): void {
    const C = this.flags.C ? '1' : '0';
    const Z = this.flags.Z ? '1' : '0';
    const I = this.flags.I ? '1' : '0';
    const D = this.flags.D ? '1' : '0';
    const B = this.flags.B ? '1' : '0';
    const O = this.flags.O ? '1' : '0';
    const N = this.flags.N ? '1' : '0';
    console.log('+---+---+---+---+---+---+---+');
    console.log('| C | Z | I | D | B | O | N |');
    console.log('+---+---+---+---+---+---+---+');
    console.log(`| ${C} | ${Z} | ${I} | ${D} | ${B} | ${O} | ${N} |`);
    console.log('+---+---+---+---+---+---+---+');
  }

  private static printByte(name: string, value: Byte): void {
    console.log(`${name}: ${Cpu.formatByte(value)}`);
  }

  private static printWord(name: string, value: Word): void {
    console.log(`${name}: ${Cpu.formatWord(value)}`);
  }

  private static formatByte(value: Byte): string {
    return `0x${value.toString(16).toUpperCase().padStart(2, '0')} (${value.toString().padStart(3)})`;
  }

  private static formatWord(value: Word): string {
    return `0x${value.toString(16).toUpperCase().padStart(4, '0')} (${value.toString().padStart(5)})`;
  }
}
