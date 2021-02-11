"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cycles_counter_1 = __importDefault(require("./cycles-counter"));
const lda_im_1 = __importDefault(require("./instructions/lda/lda-im"));
var WordTypes;
(function (WordTypes) {
    WordTypes[WordTypes["PC"] = 0] = "PC";
    WordTypes[WordTypes["SP"] = 1] = "SP";
})(WordTypes || (WordTypes = {}));
var Registers;
(function (Registers) {
    Registers[Registers["A"] = 0] = "A";
    Registers[Registers["X"] = 1] = "X";
    Registers[Registers["Y"] = 2] = "Y";
})(Registers || (Registers = {}));
const INSTRUCTIONS = [
    lda_im_1.default,
];
class Cpu {
    constructor(ram) {
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
        this.instructionsMap = new Map();
        INSTRUCTIONS.forEach((instruction) => {
            this.instructionsMap.set(instruction.opCode, instruction);
        });
    }
    getPC() {
        return this.wordArray[WordTypes.PC];
    }
    setPC(value) {
        this.wordArray[WordTypes.PC] = value;
    }
    getSP() {
        return this.wordArray[WordTypes.SP];
    }
    setSP(value) {
        this.wordArray[WordTypes.SP] = value;
    }
    getX() {
        return this.registersArray[Registers.X];
    }
    setX(value) {
        this.registersArray[Registers.X] = value;
    }
    getY() {
        return this.registersArray[Registers.Y];
    }
    setY(value) {
        this.registersArray[Registers.Y] = value;
    }
    getA() {
        return this.registersArray[Registers.A];
    }
    setA(value) {
        this.registersArray[Registers.A] = value;
    }
    reset() {
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
    execute(cycles) {
        const cyclesCounter = new cycles_counter_1.default(cycles);
        while (cyclesCounter.cycles > 0) {
            const instruction = this.fetchByte(cyclesCounter);
            const instructionImplementation = this.instructionsMap.get(instruction);
            if (instructionImplementation) {
                instructionImplementation.execute(this, cyclesCounter);
            }
            else {
                console.log(`unhandled instruction: ${Cpu.formatByte(instruction)}`);
            }
        }
    }
    fetchByte(cycles) {
        const data = this.ram.read(this.getPC());
        this.setPC(this.getPC() + 1);
        cycles.decrement();
        return data;
    }
    printStatus() {
        this.printStatusTable();
        console.log();
        this.printFlags();
    }
    printStatusTable() {
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
    printFlags() {
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
    static printByte(name, value) {
        console.log(`${name}: ${Cpu.formatByte(value)}`);
    }
    static printWord(name, value) {
        console.log(`${name}: ${Cpu.formatWord(value)}`);
    }
    static formatByte(value) {
        return `0x${value.toString(16).toUpperCase().padStart(2, '0')} (${value.toString().padStart(3)})`;
    }
    static formatWord(value) {
        return `0x${value.toString(16).toUpperCase().padStart(4, '0')} (${value.toString().padStart(5)})`;
    }
}
exports.default = Cpu;
//# sourceMappingURL=cpu.js.map