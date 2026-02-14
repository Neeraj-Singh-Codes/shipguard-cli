import { isDir, readFile } from '../utils/fs.js';
import path from 'path';
import { glob } from 'glob';

export const checkTests = async () => {
    const testDirs = ['test', 'tests', '__tests__'];
    let found = false;
    for (const dir of testDirs) {
        if (await isDir(path.join(process.cwd(), dir))) {
            found = true;
            break;
        }
    }
    
    return {
        name: 'Code: Tests',
        status: found ? 'pass' : 'warning',
        message: found ? 'Test folder found.' : 'No test folder found (checked tests/, test/, __tests__).'
    };
};

export const checkErrorMiddleware = async () => {
    const files = await glob('**/*.{js,ts}', { 
        ignore: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
        cwd: process.cwd()
    });

    let found = false;
    // Regex for (err, req, res, next) pattern
    // Catches: function(err, req, res, next) or (err, req, res, next) =>
    const errorMiddlewareRegex = /\(\s*err\s*,\s*req\s*,\s*res\s*,\s*next\s*\)/;

    for (const file of files) {
        const content = await readFile(path.join(process.cwd(), file));
        if (errorMiddlewareRegex.test(content)) {
            found = true;
            break;
        }
    }

    return {
        name: 'Code: Error Handling',
        status: found ? 'pass' : 'warning',
        message: found ? 'Centralized error middleware detected.' : 'No centralized error middleware detected ((err, req, res, next) signature missing).'
    };
};
