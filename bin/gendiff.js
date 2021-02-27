#!/usr/bin/env node

import commander from 'commander';
import makeDiff from '../src/index.js';

const runCLI = () => {
  const { program } = commander;

  program
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .action((filepath1, filepath2, options) => {
      console.log(
        makeDiff(filepath1, filepath2, options.format),
      );
    });

  program.parse();
};
runCLI();
