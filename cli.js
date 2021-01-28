import commander from 'commander';

export default () => {
  const { program } = commander;

  program
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
      .action((filepath1, filepath2, options) => {
        console.log(options);
        console.log(`filepath: ${filepath1}`);
        console.log(`filepath: ${filepath2}`);
      });

  program.parse();
};
