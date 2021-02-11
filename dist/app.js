"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cpu_1 = __importDefault(require("./cpu"));
const ram_1 = __importDefault(require("./ram"));
const RAM_SIZE = 1024 * 64;
const ram = new ram_1.default(RAM_SIZE);
const cpu = new cpu_1.default(ram);
cpu.reset();
cpu.execute(2);
cpu.printStatus();
//# sourceMappingURL=app.js.map