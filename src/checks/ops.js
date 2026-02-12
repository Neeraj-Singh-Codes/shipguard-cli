import { fileExists, isDir } from '../utils/fs.js';
import path from 'path';

export const checkDockerfile = async () => {
    const exists = await fileExists(path.join(process.cwd(), 'Dockerfile'));
    return {
        name: 'Ops: Dockerfile',
        status: exists ? 'pass' : 'warning',
        message: exists ? 'Dockerfile found.' : 'No Dockerfile found. Consider containerizing your app.'
    };
};

export const checkGithubActions = async () => {
    const workflowsDir = path.join(process.cwd(), '.github', 'workflows');
    const exists = await isDir(workflowsDir);
    return {
        name: 'Ops: GitHub Actions',
        status: exists ? 'pass' : 'warning',
        message: exists ? 'GitHub Actions workflows found.' : 'No GitHub Actions workflows found in .github/workflows.'
    };
};
