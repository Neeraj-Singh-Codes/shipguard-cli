import chalk from 'chalk';
import { readJson } from './fs.js';
import path from 'path';

let cachedVersion = null;

export const getVersion = async () => {
    if (cachedVersion) return cachedVersion;
    const pkg = await readJson(path.join(import.meta.url.replace('file://', ''), '..', '..', '..', 'package.json'));
    cachedVersion = pkg?.version || '1.0.0';
    return cachedVersion;
};

export const printBanner = async (quiet = false) => {
    if (quiet) return;
    const version = await getVersion();
    console.log('');
    console.log(chalk.bold(`  ShipGuard v${version}`));
    console.log('');
};
