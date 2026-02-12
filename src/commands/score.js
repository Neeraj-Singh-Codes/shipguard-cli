import chalk from 'chalk';
import { runEngine } from '../core/engine.js';

export const handleScore = async (options) => {
    const report = await runEngine();
    const { percentage, status } = report;

    // Minimal output designed for CI
    console.log(`${percentage}% — ${status}`);

    if (options.failUnder) {
        const threshold = parseInt(options.failUnder, 10);
        if (percentage < threshold) {
            console.log(chalk.red(`\n✖ Score ${percentage}% is below threshold ${threshold}%`));
            process.exit(1);
        } else {
            console.log(chalk.green(`\n✔ Score ${percentage}% meets threshold ${threshold}%`));
        }
    }
};
