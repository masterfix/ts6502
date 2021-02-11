import CyclesCounter from './cycles-counter';
import { Byte, Word } from './types';

export default interface CpuInterface {

  getPC(): Word;
  setPC(value: Word): void;

  getSP(): Word;
  setSP(value: Word): void;

  getA(): Byte;
  setA(value: Byte): void;

  getX(): Byte;
  setX(value: Byte): void;

  getY(): Byte;
  setY(value: Byte): void;

  fetchByte(cycles: CyclesCounter): Byte;

}
