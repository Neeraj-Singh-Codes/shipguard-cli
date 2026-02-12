import chalk from 'chalk';
import { explanations } from '../checks/definitions/explanations.js';

export const handleExplain = (checkName) => {
    // Try to find by exact name or case-insensitive
    const key = Object.keys(explanations).find(k => k.toLowerCase() === checkName.toLowerCase());
    const info = explanations[key];

    if (!info) {
        console.log(chalk.red(`\n❌ No explanation found for "${checkName}"`));
        console.log(chalk.dim('Available checks: ' + Object.keys(explanations).join(', ') + '\n'));
        return;
    }

    console.log(chalk.bold.blue(`\n🔍 Explain: ${key}`));
    console.log(chalk.bold.dim('=========================================='));
    
    console.log(`\n${chalk.bold.red('⚠️ THE RISK:')}`);
    console.log(info.risk);

    console.log(`\n${chalk.bold.green('🛡️  WHAT IT MITIGATES:')}`);
    console.log(info.benefit);

    console.log(`\n${chalk.bold.yellow('🛠️  HOW TO FIX:')}`);
    console.log(info.fix);
    
    console.log(chalk.bold.dim('\n==========================================\n'));
};
