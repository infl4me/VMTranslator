import { promises as fs } from 'fs';
import path from 'path';
import { parse } from '../src';

test('translate (SimpleFunction)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'SimpleFunction'), 'utf-8');

  expect(parse(input)).toMatchInlineSnapshot(`
    Array [
      Object {
        "args": Array [
          "SimpleFunction.test",
          "2",
        ],
        "command": "function",
        "type": "C_FUNCTION",
      },
      Object {
        "command": "push",
        "segment": "local",
        "type": "C_PUSH",
        "value": "0",
      },
      Object {
        "command": "push",
        "segment": "local",
        "type": "C_PUSH",
        "value": "1",
      },
      Object {
        "command": "add",
        "type": "C_ARITHMETIC",
      },
      Object {
        "command": "not",
        "type": "C_ARITHMETIC",
      },
      Object {
        "command": "push",
        "segment": "argument",
        "type": "C_PUSH",
        "value": "0",
      },
      Object {
        "command": "add",
        "type": "C_ARITHMETIC",
      },
      Object {
        "command": "push",
        "segment": "argument",
        "type": "C_PUSH",
        "value": "1",
      },
      Object {
        "command": "sub",
        "type": "C_ARITHMETIC",
      },
      Object {
        "args": Array [],
        "command": "return",
        "type": "C_RETURN",
      },
    ]
  `);
});
