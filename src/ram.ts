import { Byte, Word } from './types';

export default class Ram {
  private readonly data: Uint8Array;

  constructor(size: Word) {
    this.data = new Uint8Array(size);
  }

  init(): void {
    for (let i = this.data.length; i >= 0; i -= 1) {
      this.data[i] = 0;
    }
  }

  read(address: Word): Byte {
    return this.data[address];
  }
}
