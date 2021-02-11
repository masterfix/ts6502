import Cpu from './cpu';
import Ram from './ram';

const RAM_SIZE = 1024 * 64;

const ram = new Ram(RAM_SIZE);
const cpu = new Cpu(ram);

cpu.reset();

cpu.execute(2);

cpu.printStatus();
