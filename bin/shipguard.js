#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { handleCheck } from '../src/commands/check.js';
import { handleExplain } from '../src/commands/explain.js';
import { handleScore } from '../src/commands/score.js';
import { handleSuggest } from '../src/commands/suggest.js';
import { handleDoctor } from '../src/commands/doctor.js';
import { handleInitDocker, handleInitCi } from '../src/commands/init.js';
import { printBanner, getVersion } from '../src/utils/banner.js';
import '../src/checks/index.js';

const program = new Command();

const main = async () => {
    const version = await getVersion();

    program
        .name('shipguard')
        .version(`ShipGuard v${version}`, '-v, --version')
        .option('-q, --quiet', 'Suppress the banner header')
        .configureHelp({
            sortSubcommands: false,
            sortOptions: false,
        })
        .addHelpText('before', `
  ${chalk.bold(`ShipGuard v${version}`)}
`)
        .addHelpText('after', `
${chalk.bold('Examples:')}
  ${chalk.dim('$')} shipguard check              Run a full audit
  ${chalk.dim('$')} shipguard check --json       Output as JSON
  ${chalk.dim('$')} shipguard doctor             Full diagnostic
  ${chalk.dim('$')} shipguard score              Quick score for CI
  ${chalk.dim('$')} shipguard score --fail-under 70
  ${chalk.dim('$')} shipguard suggest            Fix suggestions
  ${chalk.dim('$')} shipguard explain Helmet     Learn about a check
  ${chalk.dim('$')} shipguard init docker        Generate Dockerfile
  ${chalk.dim('$')} shipguard init ci            Generate CI workflow

${chalk.dim('Run')} shipguard <command> --help ${chalk.dim('for details on a specific command.')}
`);

    // Core Commands

    program
        .command('check')
        .description('Run production readiness audit')
        .option('--json', 'Output structured JSON instead of the visual report')
        .action(async (opts) => {
            await printBanner(program.opts().quiet || opts.json);
            await handleCheck(opts);
        });

    program
        .command('doctor')
        .description('Full diagnostic report with verdict')
        .action(async () => {
            await printBanner(program.opts().quiet);
            await handleDoctor();
        });

    program
        .command('score')
        .description('Print numeric score (designed for CI pipelines)')
        .option('--fail-under <threshold>', 'Exit code 1 if below this percentage')
        .action(async (opts) => {
            await printBanner(program.opts().quiet);
            await handleScore(opts);
        });

    program
        .command('suggest')
        .description('Show grouped improvement suggestions')
        .action(async () => {
            await printBanner(program.opts().quiet);
            await handleSuggest();
        });

    program
        .command('explain <check-name>')
        .description('Explain why a check matters and how to fix it')
        .addHelpText('after', `
${chalk.bold('Available checks:')}
  Helmet, Rate Limiting, CORS, NODE_ENV,
  Dockerfile, GitHub Actions, Tests,
  Error Handling, Environment Config
`)
        .action(async (checkName) => {
            await printBanner(program.opts().quiet);
            await handleExplain(checkName);
        });

    // Init Commands

    const initCmd = program
        .command('init')
        .description('Generate production-ready config files')
        .addHelpText('after', `
${chalk.bold('Generators:')}
  docker    Multi-stage Dockerfile + .dockerignore
  ci        GitHub Actions workflow with ShipGuard gate
`);

    initCmd
        .command('docker')
        .description('Generate a production-ready Dockerfile + .dockerignore')
        .action(async () => {
            await printBanner(program.opts().quiet);
            await handleInitDocker();
        });

    initCmd
        .command('ci')
        .description('Generate a GitHub Actions CI workflow')
        .action(async () => {
            await printBanner(program.opts().quiet);
            await handleInitCi();
        });

    program.parse(process.argv);
};

main();
