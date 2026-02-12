import { hasDependency } from '../utils/npm.js';
import { glob } from 'glob';
import { readFile } from '../utils/fs.js';
import path from 'path';

const scanForUsage = async (regex) => {
    const files = await glob('**/*.{js,ts,mjs,cjs}', {
        ignore: ['node_modules/**', 'dist/**', 'test/**', 'tests/**'],
        cwd: process.cwd()
    });

    for (const file of files) {
        const content = await readFile(path.join(process.cwd(), file));
        if (regex.test(content)) return true;
    }
    return false;
};

export const checkHelmet = async (pkg) => {
    const installed = hasDependency(pkg, 'helmet');
    if (!installed) {
        return {
            name: 'Helmet',
            status: 'fail',
            message: 'Helmet is not installed. Run `npm install helmet`.'
        };
    }

    const used = await scanForUsage(/app\.use\(\s*helmet\s*\(\s*\)\s*\)/);
    return {
        name: 'Helmet',
        status: used ? 'pass' : 'warning',
        message: used ? 'Helmet is installed and used.' : 'Helmet is installed but not detected in your express middleware. Ensure you use `app.use(helmet())`.'
    };
};

export const checkRateLimit = async (pkg) => {
    const installed = hasDependency(pkg, 'express-rate-limit');
    if (!installed) {
        return {
            name: 'Rate Limiting',
            status: 'fail',
            message: 'express-rate-limit is not installed. Run `npm install express-rate-limit`.'
        };
    }

    const used = await scanForUsage(/app\.use\s*\(.*rateLimit/);
    return {
        name: 'Rate Limiting',
        status: used ? 'pass' : 'warning',
        message: used ? 'Rate limiter detected in middleware.' : 'Rate limiter installed but global usage not detected.'
    };
};

export const checkCORS = async (pkg) => {
    const installed = hasDependency(pkg, 'cors');
    const used = await scanForUsage(/app\.use\(\s*cors\s*\(/);
    
    if (installed && used) {
        return {
            name: 'CORS',
            status: 'pass',
            message: 'CORS is configured.'
        };
    }

    return {
        name: 'CORS',
        status: 'warning',
        message: !installed ? 'cors package not installed.' : 'cors installed but usage not detected.'
    };
};

export const checkNodeEnv = async () => {
    const used = await scanForUsage(/NODE_ENV\s*===\s*['"]production['"]/);
    return {
        name: 'NODE_ENV',
        status: used ? 'pass' : 'warning',
        message: used ? 'NODE_ENV production check detected.' : 'No NODE_ENV === "production" check detected in your code.'
    };
};
