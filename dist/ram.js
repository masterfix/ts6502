"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ram {
    constructor(size) {
        this.data = new Uint8Array(size);
    }
    init() {
        for (let i = this.data.length; i >= 0; i -= 1) {
            this.data[i] = 0;
        }
    }
    read(address) {
        return this.data[address];
    }
}
exports.default = Ram;
//# sourceMappingURL=ram.js.map