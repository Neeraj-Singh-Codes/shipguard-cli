import chalk from 'chalk';

export const printHeader = () => {
    console.log(chalk.bold.blue('\n🚢 ShipGuard - Production Readiness Audit\n'));
};

export const printResult = (result) => {
    const symbol = {
        pass: '✅',
        fail: '❌',
        warning: '⚠️ ',
    }[result.status];

    const color = {
        pass: chalk.green,
        fail: chalk.red,
        warning: chalk.yellow,
    }[result.status];

    console.log(`${symbol} ${color(result.name)}`);
    if (result.message) {
        console.log(chalk.dim(`   ${result.message}`));
    }
};

export const printScore = (results) => {
    const total = results.length;
    const passed = results.filter(r => r.status === 'pass').length;
    const score = Math.round((passed / total) * 10);
    
    let color = chalk.red;
    if (score >= 8) color = chalk.green;
    else if (score >= 5) color = chalk.yellow;

    console.log(chalk.bold('\n----------------------------------------'));
    console.log(chalk.bold(`Score: ${color(score)}/10`));
    console.log(chalk.bold('----------------------------------------\n'));

    if (score < 10) {
        console.log(chalk.yellow('Suggestions to improve your score:'));
        results.filter(r => r.status !== 'pass').forEach(r => {
             console.log(chalk.dim(`- Fix ${r.name}: ${r.message}`));
        });
        console.log('\n');
    }
};
