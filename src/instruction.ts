import CpuInterface from './cpu-interface';
import CyclesCounter from './cycles-counter';
import { Byte } from './types';

export default interface Instruction {
  opCode: Byte,
  execute(cpu: CpuInterface, cycles: CyclesCounter): void;
}
