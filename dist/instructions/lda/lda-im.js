"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LdaImInstruction = {
    opCode: 0x0,
    execute: (cpu, cycles) => {
        const data = cpu.fetchByte(cycles);
        cpu.setA(data);
    },
};
exports.default = LdaImInstruction;
//# sourceMappingURL=lda-im.js.map