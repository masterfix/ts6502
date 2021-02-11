"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CyclesCounter {
    constructor(cycles) {
        this.cyclesValue = cycles;
    }
    get cycles() {
        return this.cyclesValue;
    }
    decrement(cycles = 1) {
        this.cyclesValue -= cycles;
    }
    printCycles() {
        console.log('cycles counter:', this.cyclesValue);
    }
}
exports.default = CyclesCounter;
//# sourceMappingURL=cycles-counter.js.map