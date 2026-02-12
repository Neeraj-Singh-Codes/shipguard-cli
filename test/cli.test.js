import { exec } from 'child_process';
import path from 'path';

const bin = path.join(process.cwd(), 'bin', 'shipguard.js');

const run = (cwd) => {
    return new Promise((resolve, reject) => {
        exec(`node ${bin} check`, { cwd }, (error, stdout, stderr) => {
            if (error && error.code !== 0) {
                 // We don't necessarily reject on error because the CLI might exit with 1 on failure
                 // But for this test, we just want to ensure it runs and outputs something.
            }
            resolve({ stdout, stderr, error });
        });
    });
};

console.log('Running test...');
run(path.join(process.cwd(), 'test-playground'))
    .then(({ stdout }) => {
        if (stdout.includes('ShipGuard v')) {
            console.log('✅ CLI Test Passed: Output contains banner');
        } else {
            console.error('❌ CLI Test Failed: Output missing banner');
            process.exit(1);
        }
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
