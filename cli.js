import commander from 'commander';

export default () => {
  const { Command } = commander;
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');
  program.parse();

  const options = program.opts();
  if (options.help) {
    program.help();
  }
};
