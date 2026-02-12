import chalk from 'chalk';
import { runEngine } from '../core/engine.js';
import { reportToConsole } from '../reporters/console.js';

export const handleDoctor = async () => {
    const report = await runEngine();

    // Reuse existing console report
    reportToConsole(report);

    // Status badge
    const { percentage, status } = report;
    let badge;
    if (percentage >= 80) {
        badge = chalk.bgGreen.black.bold(' 🟢 Production Ready ');
    } else if (percentage >= 50) {
        badge = chalk.bgYellow.black.bold(' 🟡 Needs Improvement ');
    } else {
        badge = chalk.bgRed.white.bold(' 🔴 High Risk ');
    }

    console.log(chalk.bold('Final Verdict:'));
    console.log(`\n  ${badge}\n`);
};
