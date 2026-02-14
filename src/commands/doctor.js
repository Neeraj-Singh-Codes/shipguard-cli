import chalk from 'chalk';
import { runEngine } from '../core/engine.js';
import { reportToConsole } from '../reporters/console.js';
import { fileExists, isDir } from '../utils/fs.js';
import path from 'path';

export const handleDoctor = async () => {
    // 1. Environment Health Checks
    const envInfo = {
        'Git Repository': {
            ok: await isDir(path.join(process.cwd(), '.git')),
            message: await isDir(path.join(process.cwd(), '.git')) ? 'Initialized' : 'Not found (recommend git init)'
        },
        'Node Modules': {
            ok: await isDir(path.join(process.cwd(), 'node_modules')),
            message: await isDir(path.join(process.cwd(), 'node_modules')) ? 'Installed' : 'Missing (run npm install)'
        },
        'Package Lock': {
            ok: await fileExists(path.join(process.cwd(), 'package-lock.json')),
            message: await fileExists(path.join(process.cwd(), 'package-lock.json')) ? 'Found' : 'Missing (recommend npm install)'
        }
    };

    // 2. Run standard audit
    const report = await runEngine();

    // 3. Report with verbose mode and env info
    reportToConsole(report, { verbose: true, envInfo });

    const { percentage } = report;
    let badge;
    if (percentage >= 80) {
        badge = chalk.green.bold('PRODUCTION READY');
    } else if (percentage >= 50) {
        badge = chalk.yellow.bold('NEEDS IMPROVEMENT');
    } else {
        badge = chalk.red.bold('HIGH RISK');
    }

    console.log(`  ${chalk.bold('VERDICT:')}     ${badge}\n`);
};
