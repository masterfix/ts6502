export default class CyclesCounter {
  private cyclesValue: number;

  constructor(cycles: number) {
    this.cyclesValue = cycles;
  }

  get cycles(): number {
    return this.cyclesValue;
  }

  decrement(cycles = 1): void {
    this.cyclesValue -= cycles;
  }

  printCycles(): void {
    console.log('cycles counter:', this.cyclesValue);
  }
}
