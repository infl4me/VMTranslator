export const INSTRUCTION_TYPES = {
  C_ARITHMETIC: 'C_ARITHMETIC',
  C_PUSH: 'C_PUSH',
  C_POP: 'C_POP',
  C_LABEL: 'C_LABEL',
  C_GOTO: 'C_GOTO',
  C_IF: 'C_IF',
  C_RETURN: 'C_RETURN',
  C_CALL: 'C_CALL',
  C_FUNCTION: 'C_FUNCTION',
};

export const COMMAND_TYPES = {
  add: 'add',
  sub: 'sub',
  pop: 'pop',
  push: 'push',
  or: 'or',
  and: 'and',
  eq: 'eq',
  lt: 'lt',
  gt: 'gt',
  neg: 'neg',
  not: 'not',
  function: 'function',
  return: 'return',
};
