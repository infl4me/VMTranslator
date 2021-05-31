import { INSTRUCTION_TYPES } from './map';

const SEGMENT_ARG_TO_VARIABLE_MAP = {
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
};

const translatePush = (segment, address) => {
  return `@${address}
 D=A
 @${SEGMENT_ARG_TO_VARIABLE_MAP[segment]}
 D=D+M
 A=D
 D=M
 @SP
 A=M
 M=D
 @SP
 A=M
 M=M+1`;
};

const translatePop = (segment, address) => {
  return `@${address}
 D=A
 @${SEGMENT_ARG_TO_VARIABLE_MAP[segment]}
 D=D+M
 @address
 M=D
 @SP
 M=M-1
 A=M
 D=M
 @address
 A=M
 M=D`;
};

export const translate = (instructions) => {
  return instructions
    .map((instruction) => {
      switch (instruction.type) {
        case INSTRUCTION_TYPES.C_PUSH:
          return translatePush(instruction.segment, instruction.value);
        case INSTRUCTION_TYPES.C_POP:
          return translatePop(instruction.segment, instruction.value);
        default:
          break;
      }
    })
    .join('\n');
};
