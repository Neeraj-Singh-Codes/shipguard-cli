import chalk from 'chalk';

const icons = {
    pass: chalk.green('[PASS]'),
    fail: chalk.red('[FAIL]'),
    warning: chalk.yellow('[WARN]'),
};

const colors = {
    pass: chalk.green,
    fail: chalk.red,
    warning: chalk.yellow,
    header: chalk.bold,
    label: chalk.dim,
};

export const reportToConsole = (report, options = {}) => {
    const { score, percentage, status, results, metadata } = report;
    const { verbose = false, envInfo = null } = options;

    console.log(chalk.dim('  ────────────────────────────────────────'));

    // Project Metadata
    console.log(`\n  ${colors.header('PROJECT')}`);
    console.log(`  ${colors.label('Name:')}           ${metadata.projectName}`);
    console.log(`  ${colors.label('Node Version:')}   ${metadata.nodeVersion}`);
    console.log(`  ${colors.label('Scan Time:')}      ${metadata.timestamp}`);

    // Environment Health (if provided)
    if (envInfo) {
        console.log(`\n  ${colors.header('ENVIRONMENT HEALTH')}`);
        for (const [key, val] of Object.entries(envInfo)) {
            const icon = val.ok ? chalk.green('✓') : chalk.red('✗');
            console.log(`  ${icon} ${colors.label(key + ':')} ${val.message}`);
        }
    }

    // Results by Category
    const categories = [...new Set(results.map(r => r.category))];

    for (const category of categories) {
        console.log(`\n  ${colors.header(category.toUpperCase())}`);
        const categoryResults = results.filter(r => r.category === category);

        for (const res of categoryResults) {
            const icon = icons[res.status] || icons.warning;
            console.log(`  ${icon} ${res.name}`);
            if (res.message && res.status !== 'pass') {
                console.log(`         ${chalk.dim(res.message)}`);
            }
        }
    }

    // Overall Score
    console.log(chalk.dim('\n  ────────────────────────────────────────'));

    let scoreColor = chalk.red;
    if (percentage >= 80) scoreColor = chalk.green;
    else if (percentage >= 50) scoreColor = chalk.yellow;

    console.log(`  ${chalk.bold('STATUS:')}      ${scoreColor(status.toUpperCase())}`);
    console.log(`  ${chalk.bold('SCORE:')}       ${scoreColor(score)} / 10`);
    console.log(`  ${chalk.bold('PERCENTAGE:')}  ${scoreColor(percentage + '%')}`);
    console.log(chalk.dim('  ────────────────────────────────────────\n'));

    // Suggestions (only in doctor/verbose or if there are failures)
    const failing = results.filter(r => r.status !== 'pass');
    if (failing.length > 0 && (verbose || percentage < 100)) {
        console.log(`  ${chalk.bold('SUGGESTIONS')}`);
        failing.forEach(r => {
            console.log(`  ${chalk.yellow('-')} ${chalk.bold(r.name)}: ${r.message}`);
        });
        console.log('');
    }
};
