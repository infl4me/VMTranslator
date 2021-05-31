import { promises as fs } from 'fs';
import path from 'path';
import { translate, parse } from '../src';

test('translate (BasicTest)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'BasicTest'), 'utf-8');

  expect(translate(parse(input))).toMatchInlineSnapshot(`
    "@10
     D=A
     @undefined
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @0
     D=A
     @LCL
     D=D+M
     @address
     M=D
     @SP
     M=M-1
     A=M
     D=M
     @address
     A=M
     M=D
    @21
     D=A
     @undefined
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @22
     D=A
     @undefined
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @2
     D=A
     @ARG
     D=D+M
     @address
     M=D
     @SP
     M=M-1
     A=M
     D=M
     @address
     A=M
     M=D
    @1
     D=A
     @ARG
     D=D+M
     @address
     M=D
     @SP
     M=M-1
     A=M
     D=M
     @address
     A=M
     M=D
    @36
     D=A
     @undefined
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @6
     D=A
     @THIS
     D=D+M
     @address
     M=D
     @SP
     M=M-1
     A=M
     D=M
     @address
     A=M
     M=D
    @42
     D=A
     @undefined
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @45
     D=A
     @undefined
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @5
     D=A
     @THAT
     D=D+M
     @address
     M=D
     @SP
     M=M-1
     A=M
     D=M
     @address
     A=M
     M=D
    @2
     D=A
     @THAT
     D=D+M
     @address
     M=D
     @SP
     M=M-1
     A=M
     D=M
     @address
     A=M
     M=D
    @510
     D=A
     @undefined
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @6
     D=A
     @undefined
     D=D+M
     @address
     M=D
     @SP
     M=M-1
     A=M
     D=M
     @address
     A=M
     M=D
    @0
     D=A
     @LCL
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @5
     D=A
     @THAT
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1

    @1
     D=A
     @ARG
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1

    @6
     D=A
     @THIS
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    @6
     D=A
     @THIS
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1


    @6
     D=A
     @undefined
     D=D+M
     A=D
     D=M
     @SP
     A=M
     M=D
     @SP
     A=M
     M=M+1
    "
  `);
});