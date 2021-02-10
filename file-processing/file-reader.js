import * as fs from 'fs';
import * as path from 'path';

export default (filepath) => {
  let content;
  try {
    content = fs.readFileSync(filepath, 'utf-8').trim();
  } catch (err) {
    throw new Error('Can not read file.\nPlease, check that path to file is correct');
  }
  const extension = path.parse(filepath).ext.slice(1);
  return { content, extension };
};
