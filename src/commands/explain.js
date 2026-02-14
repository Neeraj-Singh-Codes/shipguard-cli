import chalk from 'chalk';
import { explanations } from '../checks/definitions/explanations.js';

export const handleExplain = (checkName) => {
    const key = Object.keys(explanations).find(k => k.toLowerCase() === checkName.toLowerCase());
    const info = explanations[key];

    if (!info) {
        console.log(chalk.red(`\n  Error: no explanation found for "${checkName}"`));
        console.log(chalk.dim('  Available: ' + Object.keys(explanations).join(', ') + '\n'));
        return;
    }

    console.log(`\n  ${chalk.bold(key)}`);
    console.log(chalk.dim('  ────────────────────────────────────────'));

    console.log(`\n  ${chalk.bold('RISK:')}`);
    console.log(`  ${info.risk}`);

    console.log(`\n  ${chalk.bold('MITIGATES:')}`);
    console.log(`  ${info.benefit}`);

    console.log(`\n  ${chalk.bold('FIX:')}`);
    console.log(`  ${info.fix}`);

    console.log(chalk.dim('\n  ────────────────────────────────────────\n'));
};
