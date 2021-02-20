import commander from 'commander';
import makeDiff from '../index.js';

export default () => {
  const { program } = commander;

  program
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .action((filepath1, filepath2, options) => {
      const difference = makeDiff(filepath1, filepath2, options.format);
      if (difference === null) {
        console.log('File is empty, or files is equal, or they don\'t have common keys');
      }
      console.log(difference);
    });

  program.parse();
};
