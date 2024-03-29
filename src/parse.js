import { COMMAND_TYPES, INSTRUCTION_TYPES } from './map';

const mapCommand2Type = (command) => {
  switch (command) {
    case COMMAND_TYPES.add:
    case COMMAND_TYPES.sub:
    case COMMAND_TYPES.eq:
    case COMMAND_TYPES.lt:
    case COMMAND_TYPES.gt:
    case COMMAND_TYPES.or:
    case COMMAND_TYPES.and:
    case COMMAND_TYPES.neg:
    case COMMAND_TYPES.not:
      return INSTRUCTION_TYPES.C_ARITHMETIC;
    case COMMAND_TYPES.pop:
      return INSTRUCTION_TYPES.C_POP;
    case COMMAND_TYPES.push:
      return INSTRUCTION_TYPES.C_PUSH;
    case COMMAND_TYPES.function:
      return INSTRUCTION_TYPES.C_FUNCTION;
    case COMMAND_TYPES.return:
      return INSTRUCTION_TYPES.C_RETURN;
    case COMMAND_TYPES.label:
      return INSTRUCTION_TYPES.C_LABEL;
    case COMMAND_TYPES['if-goto']:
      return INSTRUCTION_TYPES.C_IF;
    case COMMAND_TYPES.goto:
      return INSTRUCTION_TYPES.C_GOTO;
    case COMMAND_TYPES.call:
      return INSTRUCTION_TYPES.C_CALL;

    default:
      return null;
  }
};

export const parse = (input) => {
  const instructions = input.split('\n');

  return instructions
    .map((instruction) => {
      const [command, ...args] = instruction.trim().split(' ');

      if (!command) {
        return null;
      }

      if (command === '//') {
        return null;
      }

      const type = mapCommand2Type(command);
      if (!type) {
        throw new Error(`Unknown command: "${command}"`);
      }

      if (type === INSTRUCTION_TYPES.C_ARITHMETIC) {
        return { type: INSTRUCTION_TYPES.C_ARITHMETIC, command };
      }

      if (type === INSTRUCTION_TYPES.C_POP || type === INSTRUCTION_TYPES.C_PUSH) {
        const [segment, value] = args;
        if (!segment) {
          throw new Error(`Unknown segment: "${segment}"`);
        }
        if (!value) {
          throw new Error(`Unknown value: "${value}"`);
        }

        return {
          type,
          command,
          segment,
          value,
        };
      }

      return {
        type,
        command,
        args,
      };
    })
    .filter(Boolean);
};
