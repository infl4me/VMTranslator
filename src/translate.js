import { COMMAND_TYPES, INSTRUCTION_TYPES } from './map';

const SEGMENT_ARG_TO_VARIABLE_MAP = {
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
  temp: 'TEMP',
};

const writeStaticPop = (address, namespace) => {
  return `@SP
M=M-1
A=M
D=M
@${namespace}.${address}
M=D`;
};

const writeStaticPush = (address, namespace) => {
  return `@${namespace}.${address}
D=M
@SP
A=M
M=D
@SP
M=M+1`;
};

const writePointerPop = (command) => {
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

const writePointerPush = (command) => {
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

const writePush = (segment, address) => {
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

const writeTempPush = (i) => {
  return `@R${5 + i}
D=M
@SP
A=M
M=D
@SP
M=M+1`;
};

const writeConstantPush = (value) => {
  return `@${value}
D=A
@SP
A=M
M=D
@SP
M=M+1`;
};

const writePop = (segment, address) => {
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

const writeTempPop = (i) => {
  return `@SP
M=M-1
A=M
D=M
@R${5 + i}
M=D`;
};

const writeArithmetic = (command) => {
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
let writeBoolCallsCount = 0;
const writeBool = (operation) => {
  writeBoolCallsCount += 1;

  return `@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@SET_TRUE${writeBoolCallsCount}
D;${BOOL_OPERATIONS_TO_JMP_FLAG_MAP[operation]}
@SP
A=M
M=0
@END${writeBoolCallsCount}
0;JMP
(SET_TRUE${writeBoolCallsCount})
@SP
A=M
M=-1
(END${writeBoolCallsCount})
@SP
M=M+1`;
};

const writeUnary = (command) => {
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

const writeFunction = (args) => {
  const [fnName, rawLocalVarCount = 0] = args;
  const localVarCount = Number(rawLocalVarCount);
  if (!fnName) {
    throw new Error('[writeFunction] No fnName provided');
  }

  if (Number.isNaN(localVarCount) || localVarCount < 0) {
    throw new Error(`[writeFunction] Invalid localVarCount: "${localVarCount}"`);
  }

  const initializingLocalsToZero = Array.from({ length: localVarCount }, (_, idx) => idx)
    .map((localAddress) => {
      const pushingZeroToStack = writeConstantPush(0);
      const initialazingLocalToZero = writePop('local', localAddress);

      return [pushingZeroToStack, initialazingLocalToZero].join('\n');
    })
    .join('\n');

  return [`(${fnName})`, initializingLocalsToZero].filter(Boolean).join('\n');
};

const writeReturn = () => {
  // {adress} = *(FRAME - {shift})
  const writeFrameExtraction = (shift, address) => `@${shift}
D=A
@R15
A=M-D
D=M
@${address}
M=D`;

  return `@LCL
D=M
@R15
M=D // save frame address to R15

${writeFrameExtraction(5, 'R14')} // put return address (frame - 5) to R14

${writePop('argument', 0)} // put last value to arg0

@ARG
D=M
@SP
M=D+1 // set SP to ARG+1

${writeFrameExtraction(1, 'THAT')}
${writeFrameExtraction(2, 'THIS')}
${writeFrameExtraction(3, 'ARG')}
${writeFrameExtraction(4, 'LCL')} // restore special registers

@R14
A=M
0;JMP // go to return address`;
};

const writeLabel = (args) => {
  const [label] = args;
  if (!label) {
    throw new Error(`[writeLabel] No label provided`);
  }

  return `(${label})`;
};

const writeIfGoto = (args) => {
  const [label] = args;
  if (!label) {
    throw new Error(`[writeIfGoto] No label provided`);
  }

  return `@SP
M=M-1
A=M
D=M
@${label}
D;JNE`;
};

const writeGoto = (args) => {
  const [label] = args;
  if (!label) {
    throw new Error(`[writeGoto] No label provided`);
  }

  return `@${label}
0;JMP`;
};

let functionIdCount = 1;
const genFunctionLabel = (namespace, fnName) => {
  const label = `${namespace}.${fnName}$ret.${functionIdCount}`;
  functionIdCount += 1;
  return label;
};
const writeCall = (args, namespace) => {
  const [fnName, rawArgsCount = 0] = args;
  const argsCount = Number(rawArgsCount);
  if (!fnName) {
    throw new Error('[writeCall] No fnName provided');
  }

  if (Number.isNaN(argsCount) || argsCount < 0) {
    throw new Error(`[writeCall] Invalid argsCount: "${argsCount}"`);
  }

  // pushes the value of the given address
  const writePushOnToStack = (address) => {
    return `@${address}
D=M
@SP
A=M
M=D
@SP
M=M+1`;
  };

  const label = genFunctionLabel(namespace, fnName);
  return `@${label}
D=A
@SP
A=M
M=D
@SP
M=M+1 // push return-address ()ROM

${writePushOnToStack(SEGMENT_ARG_TO_VARIABLE_MAP.local)}
${writePushOnToStack(SEGMENT_ARG_TO_VARIABLE_MAP.argument)}
${writePushOnToStack(SEGMENT_ARG_TO_VARIABLE_MAP.this)}
${writePushOnToStack(SEGMENT_ARG_TO_VARIABLE_MAP.that)}

@${5 + argsCount}
D=A
@SP
D=M-D
@ARG
M=D // Reposition ARG

@SP
D=M
@LCL
M=D // Reposition LCL

@${fnName}
0;JMP // jump to calling function

(${label}) // return label after function execution is done`;
};

const writeInit = () => {
  return `@256
D=A
@SP
M=D // init SP to 256

${writeCall(['Sys.init'])}`;
};

export const concat = (data = []) => {
  if (data.length === 0) {
    return '';
  }

  return [writeInit(), ...data].join('\n');
};

export const translate = (instructions, namespace) => {
  const writedInstructions = instructions.map((instruction) => {
    switch (instruction.type) {
      case INSTRUCTION_TYPES.C_PUSH:
        if (instruction.segment === 'constant') {
          return writeConstantPush(instruction.value);
        }
        if (instruction.segment === 'temp') {
          return writeTempPush(Number(instruction.value));
        }
        if (instruction.segment === 'pointer') {
          return writePointerPush(instruction.value);
        }
        if (instruction.segment === 'static') {
          return writeStaticPush(instruction.value, namespace);
        }

        return writePush(instruction.segment, instruction.value);
      case INSTRUCTION_TYPES.C_POP:
        if (instruction.segment === 'temp') {
          return writeTempPop(Number(instruction.value));
        }
        if (instruction.segment === 'pointer') {
          return writePointerPop(instruction.value);
        }
        if (instruction.segment === 'static') {
          return writeStaticPop(instruction.value, namespace);
        }

        return writePop(instruction.segment, instruction.value);
      case INSTRUCTION_TYPES.C_ARITHMETIC: {
        if ([COMMAND_TYPES.neg, COMMAND_TYPES.not].includes(instruction.command)) {
          return writeUnary(instruction.command);
        }

        const boolOperations = [COMMAND_TYPES.eq, COMMAND_TYPES.gt, COMMAND_TYPES.lt];
        if (boolOperations.includes(instruction.command)) {
          return writeBool(instruction.command);
        }

        return writeArithmetic(instruction.command);
      }
      case INSTRUCTION_TYPES.C_FUNCTION: {
        return writeFunction(instruction.args);
      }
      case INSTRUCTION_TYPES.C_RETURN: {
        return writeReturn();
      }
      case INSTRUCTION_TYPES.C_LABEL: {
        return writeLabel(instruction.args);
      }
      case INSTRUCTION_TYPES.C_IF: {
        return writeIfGoto(instruction.args);
      }
      case INSTRUCTION_TYPES.C_GOTO: {
        return writeGoto(instruction.args);
      }
      case INSTRUCTION_TYPES.C_CALL: {
        return writeCall(instruction.args, namespace);
      }

      default:
        throw new Error(`Unknown instruction type: "${instruction.type}"`);
    }
  });

  return writedInstructions.join('\n');
};
