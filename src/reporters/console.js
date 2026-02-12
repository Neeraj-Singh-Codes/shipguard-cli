import chalk from 'chalk';

const icons = {
    pass: '✅',
    fail: '❌',
    warning: '⚠️ ',
    info: 'ℹ️ '
};

const colors = {
    pass: chalk.green,
    fail: chalk.red,
    warning: chalk.yellow,
    info: chalk.blue,
    header: chalk.bold.cyan,
    label: chalk.dim
};

export const reportToConsole = (report) => {
    const { score, percentage, status, results, metadata } = report;

    console.log(chalk.bold.dim('  ── Audit Report ─────────────────────────'));
    
    // Project Metadata
    console.log(`\n${colors.header('PROJECT METADATA')}`);
    console.log(`${colors.label('Name:')}          ${metadata.projectName}`);
    console.log(`${colors.label('Node Version:')}  ${metadata.nodeVersion}`);
    console.log(`${colors.label('Scan Time:')}     ${metadata.timestamp}`);

    // Results by Category
    const categories = [...new Set(results.map(r => r.category))];
    
    for (const category of categories) {
        console.log(`\n${colors.header(category.toUpperCase())}`);
        const categoryResults = results.filter(r => r.category === category);
        
        for (const res of categoryResults) {
            const icon = icons[res.status] || icons.info;
            const color = colors[res.status] || chalk.white;
            console.log(`${icon} ${color(res.name)} ${colors.label(`(Weight: ${res.weight})`)}`);
            if (res.message) {
                console.log(`   ${chalk.dim(res.message)}`);
            }
        }
    }

    // Overall Score
    console.log(chalk.bold.dim('\n=========================================='));
    
    let scoreColor = chalk.red;
    if (percentage >= 80) scoreColor = chalk.green;
    else if (percentage >= 50) scoreColor = chalk.yellow;

    console.log(`${chalk.bold('Status:')}     ${scoreColor(status)}`);
    console.log(`${chalk.bold('Score:')}      ${scoreColor(score)} / 10`);
    console.log(`${chalk.bold('Percentage:')} ${scoreColor(percentage)}%`);
    console.log(chalk.bold.dim('==========================================\n'));

    if (percentage < 100) {
        console.log(chalk.yellow.bold('Actionable Suggestions:'));
        results.filter(r => r.status !== 'pass').forEach(r => {
            console.log(`${chalk.yellow('•')} ${chalk.bold(r.name)}: ${r.message}`);
        });
        console.log('');
    }
};
