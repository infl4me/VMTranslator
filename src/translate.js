import { COMMAND_TYPES, INSTRUCTION_TYPES } from './map';

const SEGMENT_ARG_TO_VARIABLE_MAP = {
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
  temp: 'TEMP',
};

const translateStaticPop = (namespace, address) => {
  return `@SP
M=M-1
A=M
D=M
@${namespace}.${address}
M=D`;
};

const translateStaticPush = (namespace, address) => {
  return `@${namespace}.${address}
D=M
@SP
A=M
M=D
@SP
M=M+1`;
};

const translatePointerPop = (command) => {
  const map = {
    0: 'THIS',
    1: 'THAT',
  };

  return `@SP
M=M-1
A=M
D=M
@${map[command]}
M=D`;
};

const translatePointerPush = (command) => {
  const map = {
    0: 'THIS',
    1: 'THAT',
  };

  return `@${map[command]}
D=M
@SP
A=M
M=D
@SP
M=M+1`;
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
M=M+1`;
};

const translateTempPush = (i) => {
  return `@R${5 + i}
D=M
@SP
A=M
M=D
@SP
M=M+1`;
};

const translateConstantPush = (address) => {
  return `@${address}
D=A
@SP
A=M
M=D
@SP
M=M+1`;
};

const translatePop = (segment, address) => {
  return `@${address}
D=A
@${SEGMENT_ARG_TO_VARIABLE_MAP[segment]}
D=D+M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
A=M
M=D`;
};

const translateTempPop = (i) => {
  return `@SP
M=M-1
A=M
D=M
@R${5 + i}
M=D`;
};

const translateArithmetic = (command) => {
  const map = {
    [COMMAND_TYPES.add]: '+',
    [COMMAND_TYPES.sub]: '-',
    [COMMAND_TYPES.and]: '&',
    [COMMAND_TYPES.or]: '|',
  };

  return `@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M${map[command]}D
@SP
M=M+1`;
};

const BOOL_OPERATIONS_TO_JMP_FLAG_MAP = {
  eq: 'JEQ',
  lt: 'JLT',
  gt: 'JGT',
};
let translateBoolCallsCount = 0;
const translateBool = (operation) => {
  translateBoolCallsCount += 1;

  return `@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@SET_TRUE${translateBoolCallsCount}
D;${BOOL_OPERATIONS_TO_JMP_FLAG_MAP[operation]}
@SP
A=M
M=0
@END${translateBoolCallsCount}
0;JMP
(SET_TRUE${translateBoolCallsCount})
  @SP
  A=M
  M=-1
(END${translateBoolCallsCount})
@SP
M=M+1`;
};

const translateUnary = (command) => {
  const map = {
    [COMMAND_TYPES.neg]: '-',
    [COMMAND_TYPES.not]: '!',
  };

  return `@SP
M=M-1
A=M
M=${map[command]}M
@SP
M=M+1`;
};

export const translate = (instructions) => {
  const translatedInstructions = instructions.map((instruction) => {
    switch (instruction.type) {
      case INSTRUCTION_TYPES.C_PUSH:
        if (instruction.segment === 'constant') {
          return translateConstantPush(instruction.value);
        }
        if (instruction.segment === 'temp') {
          return translateTempPush(Number(instruction.value));
        }
        if (instruction.segment === 'pointer') {
          return translatePointerPush(instruction.value);
        }
        if (instruction.segment === 'static') {
          // eslint-disable-next-line no-undef
          return translateStaticPush(__MOCK_FILENAME__, instruction.value);
        }

        return translatePush(instruction.segment, instruction.value);
      case INSTRUCTION_TYPES.C_POP:
        if (instruction.segment === 'temp') {
          return translateTempPop(Number(instruction.value));
        }
        if (instruction.segment === 'pointer') {
          return translatePointerPop(instruction.value);
        }
        if (instruction.segment === 'static') {
          // eslint-disable-next-line no-undef
          return translateStaticPop(__MOCK_FILENAME__, instruction.value);
        }

        return translatePop(instruction.segment, instruction.value);
      case INSTRUCTION_TYPES.C_ARITHMETIC: {
        if ([COMMAND_TYPES.neg, COMMAND_TYPES.not].includes(instruction.command)) {
          return translateUnary(instruction.command);
        }

        const boolOperations = [COMMAND_TYPES.eq, COMMAND_TYPES.gt, COMMAND_TYPES.lt];
        if (boolOperations.includes(instruction.command)) {
          return translateBool(instruction.command);
        }

        return translateArithmetic(instruction.command);
      }

      default:
        break;
    }
  });

  return translatedInstructions.join('\n');
};
