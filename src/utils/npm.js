import { readJson } from '../utils/fs.js';
import path from 'path';

export const getPackageJson = async () => {
    return await readJson(path.join(process.cwd(), 'package.json'));
};

export const hasDependency = (pkg, depName) => {
    if (!pkg) return false;
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    return !!deps[depName];
};
