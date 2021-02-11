import CpuInterface from '../../cpu-interface';
import CyclesCounter from '../../cycles-counter';
import Instruction from '../../instruction';

const LdaImInstruction: Instruction = {

  opCode: 0x0,

  execute: (cpu: CpuInterface, cycles: CyclesCounter): void => {
    const data = cpu.fetchByte(cycles);
    cpu.setA(data);
  },

};

export default LdaImInstruction;
