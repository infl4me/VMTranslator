import { promises as fs } from 'fs';
import path from 'path';
import { translate, parse } from '../src';
import { concat } from '../src/translate';

test('translate (BasicTest)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'BasicTest'), 'utf-8');

  expect(translate(parse(input))).toMatchInlineSnapshot(`
    "@10
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @0
    D=A
    @LCL
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @21
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @22
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @2
    D=A
    @ARG
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @1
    D=A
    @ARG
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @36
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @6
    D=A
    @THIS
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @42
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @45
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @5
    D=A
    @THAT
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @2
    D=A
    @THAT
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @510
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @R11
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
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
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
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
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
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @R11
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1"
  `);
});

test('translate (SimpleAdd)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'SimpleAdd'), 'utf-8');

  expect(translate(parse(input))).toMatchInlineSnapshot(`
    "@7
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @8
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1"
  `);
});

test('translate (StackTest)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'StackTest'), 'utf-8');

  expect(translate(parse(input))).toMatchInlineSnapshot(`
    "@17
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @17
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE1
    D;JEQ
    @SP
    A=M
    M=0
    @END1
    0;JMP
    (SET_TRUE1)
    @SP
    A=M
    M=-1
    (END1)
    @SP
    M=M+1
    @17
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @16
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE2
    D;JEQ
    @SP
    A=M
    M=0
    @END2
    0;JMP
    (SET_TRUE2)
    @SP
    A=M
    M=-1
    (END2)
    @SP
    M=M+1
    @16
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @17
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE3
    D;JEQ
    @SP
    A=M
    M=0
    @END3
    0;JMP
    (SET_TRUE3)
    @SP
    A=M
    M=-1
    (END3)
    @SP
    M=M+1
    @892
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @891
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE4
    D;JLT
    @SP
    A=M
    M=0
    @END4
    0;JMP
    (SET_TRUE4)
    @SP
    A=M
    M=-1
    (END4)
    @SP
    M=M+1
    @891
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @892
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE5
    D;JLT
    @SP
    A=M
    M=0
    @END5
    0;JMP
    (SET_TRUE5)
    @SP
    A=M
    M=-1
    (END5)
    @SP
    M=M+1
    @891
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @891
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE6
    D;JLT
    @SP
    A=M
    M=0
    @END6
    0;JMP
    (SET_TRUE6)
    @SP
    A=M
    M=-1
    (END6)
    @SP
    M=M+1
    @32767
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @32766
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE7
    D;JGT
    @SP
    A=M
    M=0
    @END7
    0;JMP
    (SET_TRUE7)
    @SP
    A=M
    M=-1
    (END7)
    @SP
    M=M+1
    @32766
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @32767
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE8
    D;JGT
    @SP
    A=M
    M=0
    @END8
    0;JMP
    (SET_TRUE8)
    @SP
    A=M
    M=-1
    (END8)
    @SP
    M=M+1
    @32766
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @32766
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE9
    D;JGT
    @SP
    A=M
    M=0
    @END9
    0;JMP
    (SET_TRUE9)
    @SP
    A=M
    M=-1
    (END9)
    @SP
    M=M+1
    @57
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @31
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @53
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1
    @112
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    M=-M
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M&D
    @SP
    M=M+1
    @82
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M|D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    M=!M
    @SP
    M=M+1"
  `);
});

test('translate (PointerTest)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'PointerTest'), 'utf-8');

  expect(translate(parse(input))).toMatchInlineSnapshot(`
    "@3030
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @THIS
    M=D
    @3040
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @THAT
    M=D
    @32
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @2
    D=A
    @THIS
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @46
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @6
    D=A
    @THAT
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1
    @2
    D=A
    @THIS
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @6
    D=A
    @THAT
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1"
  `);
});

test('translate (StaticTest)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'StaticTest'), 'utf-8');
  expect(translate(parse(input), 'StaticTest')).toMatchInlineSnapshot(`
    "@111
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @333
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @888
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @StaticTest.8
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @StaticTest.3
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @StaticTest.1
    M=D
    @StaticTest.3
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @StaticTest.1
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @StaticTest.8
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1"
  `);
});

test('translate (SimpleFunction)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'SimpleFunction'), 'utf-8');

  expect(translate(parse(input))).toMatchInlineSnapshot(`
    "(SimpleFunction.test)
    @0
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @0
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
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
    M=M+1
    @1
    D=A
    @LCL
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    M=!M
    @SP
    M=M+1
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
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
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @LCL
    D=M
    @R15
    M=D // save frame address to R15

    @5
    D=A
    @R15
    A=M-D
    D=M
    @R14
    M=D // put return address (frame - 5) to R14

    @0
    D=A
    @ARG
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D // put last value to arg0

    @ARG
    D=M
    @SP
    M=D+1 // set SP to ARG+1

    @1
    D=A
    @R15
    A=M-D
    D=M
    @THAT
    M=D
    @2
    D=A
    @R15
    A=M-D
    D=M
    @THIS
    M=D
    @3
    D=A
    @R15
    A=M-D
    D=M
    @ARG
    M=D
    @4
    D=A
    @R15
    A=M-D
    D=M
    @LCL
    M=D // restore special registers

    @R14
    A=M
    0;JMP // go to return address"
  `);
});

test('translate (BasicLoop)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'BasicLoop'), 'utf-8');
  expect(translate(parse(input))).toMatchInlineSnapshot(`
    "@0
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @0
    D=A
    @LCL
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    (LOOP_START)
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
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
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1
    @0	
    D=A
    @LCL
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @0
    D=A
    @ARG
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @LOOP_START
    D;JNE
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
    M=M+1"
  `);
});

test('translate (FibonacciSeries)', async () => {
  const input = await fs.readFile(path.join(__dirname, '__fixtures__', 'input', 'FibonacciSeries'), 'utf-8');
  expect(translate(parse(input))).toMatchInlineSnapshot(`
    "@1
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @THAT
    M=D
    @0
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @0
    D=A
    @THAT
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @THAT
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @2
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @0
    D=A
    @ARG
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    (MAIN_LOOP_START)
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @COMPUTE_ELEMENT
    D;JNE
    @END_PROGRAM
    0;JMP
    (COMPUTE_ELEMENT)
    @0
    D=A
    @THAT
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @THAT
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1
    @2
    D=A
    @THAT
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @THAT
    M=D
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @0
    D=A
    @ARG
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D
    @MAIN_LOOP_START
    0;JMP
    (END_PROGRAM)"
  `);
});

test('translate (FibonacciElement)', async () => {
  const input1 = await fs.readFile(
    path.join(__dirname, '__fixtures__', 'input', 'FibonacciElement', 'Main.vm'),
    'utf-8',
  );
  const input2 = await fs.readFile(
    path.join(__dirname, '__fixtures__', 'input', 'FibonacciElement', 'Sys.vm'),
    'utf-8',
  );
  const result = concat([translate(parse(input1), 'FibonacciElement'), translate(parse(input2), 'FibonacciElement')]);
  expect(result).toMatchInlineSnapshot(`
    "@256
    D=A
    @SP
    M=D // init SP to 256

    @Sys.init$ret.4
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1 // push return-address ()ROM

    @LCL
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @ARG
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1

    @5
    D=A
    @SP
    D=M-D
    @ARG
    M=D // Reposition ARG

    @SP
    D=M
    @LCL
    M=D // Reposition LCL

    @Sys.init
    0;JMP // jump to calling function

    (Sys.init$ret.4) // return label after function execution is done
    (Main.fibonacci)
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @2
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    D=M-D
    @SET_TRUE10
    D;JLT
    @SP
    A=M
    M=0
    @END10
    0;JMP
    (SET_TRUE10)
    @SP
    A=M
    M=-1
    (END10)
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @IF_TRUE
    D;JNE
    @IF_FALSE
    0;JMP
    (IF_TRUE)
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @LCL
    D=M
    @R15
    M=D // save frame address to R15

    @5
    D=A
    @R15
    A=M-D
    D=M
    @R14
    M=D // put return address (frame - 5) to R14

    @0
    D=A
    @ARG
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D // put last value to arg0

    @ARG
    D=M
    @SP
    M=D+1 // set SP to ARG+1

    @1
    D=A
    @R15
    A=M-D
    D=M
    @THAT
    M=D
    @2
    D=A
    @R15
    A=M-D
    D=M
    @THIS
    M=D
    @3
    D=A
    @R15
    A=M-D
    D=M
    @ARG
    M=D
    @4
    D=A
    @R15
    A=M-D
    D=M
    @LCL
    M=D // restore special registers

    @R14
    A=M
    0;JMP // go to return address
    (IF_FALSE)
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @2
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @Main.fibonacci$ret.1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1 // push return-address ()ROM

    @LCL
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @ARG
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1

    @6
    D=A
    @SP
    D=M-D
    @ARG
    M=D // Reposition ARG

    @SP
    D=M
    @LCL
    M=D // Reposition LCL

    @Main.fibonacci
    0;JMP // jump to calling function

    (Main.fibonacci$ret.1) // return label after function execution is done
    @0
    D=A
    @ARG
    D=D+M
    A=D
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @1
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M-D
    @SP
    M=M+1
    @Main.fibonacci$ret.2
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1 // push return-address ()ROM

    @LCL
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @ARG
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1

    @6
    D=A
    @SP
    D=M-D
    @ARG
    M=D // Reposition ARG

    @SP
    D=M
    @LCL
    M=D // Reposition LCL

    @Main.fibonacci
    0;JMP // jump to calling function

    (Main.fibonacci$ret.2) // return label after function execution is done
    @SP
    M=M-1
    A=M
    D=M
    @SP
    M=M-1
    A=M
    M=M+D
    @SP
    M=M+1
    @LCL
    D=M
    @R15
    M=D // save frame address to R15

    @5
    D=A
    @R15
    A=M-D
    D=M
    @R14
    M=D // put return address (frame - 5) to R14

    @0
    D=A
    @ARG
    D=D+M
    @R13
    M=D
    @SP
    M=M-1
    A=M
    D=M
    @R13
    A=M
    M=D // put last value to arg0

    @ARG
    D=M
    @SP
    M=D+1 // set SP to ARG+1

    @1
    D=A
    @R15
    A=M-D
    D=M
    @THAT
    M=D
    @2
    D=A
    @R15
    A=M-D
    D=M
    @THIS
    M=D
    @3
    D=A
    @R15
    A=M-D
    D=M
    @ARG
    M=D
    @4
    D=A
    @R15
    A=M-D
    D=M
    @LCL
    M=D // restore special registers

    @R14
    A=M
    0;JMP // go to return address
    (Sys.init)
    @4
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @Main.fibonacci$ret.3
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1 // push return-address ()ROM

    @LCL
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @ARG
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THIS
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @THAT
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1

    @6
    D=A
    @SP
    D=M-D
    @ARG
    M=D // Reposition ARG

    @SP
    D=M
    @LCL
    M=D // Reposition LCL

    @Main.fibonacci
    0;JMP // jump to calling function

    (Main.fibonacci$ret.3) // return label after function execution is done
    (WHILE)
    @WHILE
    0;JMP"
  `);
});
