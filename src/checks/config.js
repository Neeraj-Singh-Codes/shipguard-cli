import { fileExists, readFile } from '../utils/fs.js';
import path from 'path';

export const checkEnv = async () => {
    const envExists = await fileExists(path.join(process.cwd(), '.env'));
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    const gitignoreExists = await fileExists(gitignorePath);
    
    if (!envExists) {
        return {
            name: 'Config: .env File',
            status: 'warning',
            message: '.env file not found. Ensure you have environment variables configured.'
        };
    }

    if (!gitignoreExists) {
        return {
            name: 'Config: .gitignore',
            status: 'fail',
            message: '.gitignore file missing. .env might be committed!'
        };
    }

    const gitignoreContent = await readFile(gitignorePath);
    if (!gitignoreContent.includes('.env')) {
        return {
            name: 'Config: .env Security',
            status: 'fail',
            message: '.env is NOT in .gitignore! This is a severe security risk.'
        };
    }

    return {
        name: 'Config: .env Security',
        status: 'pass',
        message: '.env exists and is ignored.'
    };
};
