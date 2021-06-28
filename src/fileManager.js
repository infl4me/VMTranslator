import { promises as fs } from 'fs';
import path from 'path';
import { parse } from './parse';
import { translate, concat } from './translate';

const parseSingleFile = async (srcpath) => {
  const vm = await fs.readFile(srcpath, { encoding: 'utf8' });
  const filename = path.basename(srcpath, '.vm');
  const asm = translate(parse(vm), filename);
  return asm;
};

const main = async () => {
  const pathArgv = process.argv.find((item) => item.split('=')[0] === 'PATH');
  if (!pathArgv) {
    throw new Error(`No path provided`);
  }
  const srcpath = path.join(pathArgv.split('=')[1]);

  const stats = await fs.lstat(srcpath);

  if (stats.isFile()) {
    if (path.extname(srcpath) !== '.vm') {
      throw new Error(`Invalid ext provided: "${path.extname(srcpath)}"`);
    }

    const asm = await parseSingleFile(srcpath);

    const filename = path.basename(srcpath, '.vm');
    const destpath = path.join(path.dirname(srcpath), `${filename}.asm`);
    await fs.writeFile(destpath, asm);
    return;
  }

  const filepaths = (await fs.readdir(srcpath))
    .filter((filename) => path.extname(filename) === '.vm')
    .map((filename) => path.join(srcpath, filename));
  if (filepaths.length === 0) {
    throw new Error('No .vm files found');
  }

  const data = await Promise.all(filepaths.map((filepath) => parseSingleFile(filepath)));
  const destpath = path.join(srcpath, `${path.basename(srcpath)}.asm`);
  await fs.writeFile(destpath, concat(data));
};

main();
