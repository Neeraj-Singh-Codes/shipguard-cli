import chalk from 'chalk';
import { runEngine } from '../core/engine.js';

export const handleSuggest = async () => {
    const report = await runEngine();
    const failing = report.results.filter(r => r.status !== 'pass');

    if (failing.length === 0) {
        console.log(chalk.green('\n🎉 All checks passed! No suggestions needed.\n'));
        return;
    }

    console.log(chalk.bold.dim('  ── Improvement Suggestions ──────────────'));
    console.log('');

    const categories = [...new Set(failing.map(r => r.category))];

    for (const cat of categories) {
        console.log(chalk.bold.cyan(`  ${cat.toUpperCase()}`));
        const items = failing.filter(r => r.category === cat);
        for (const item of items) {
            const icon = item.status === 'fail' ? '❌' : '⚠️ ';
            console.log(`  ${icon} ${chalk.bold(item.name)}`);
            console.log(`     ${chalk.dim(item.message)}`);
        }
        console.log('');
    }

    console.log(chalk.dim('=========================================='));
    console.log(chalk.dim(`${failing.length} suggestion(s) across ${categories.length} category(ies)\n`));
};
