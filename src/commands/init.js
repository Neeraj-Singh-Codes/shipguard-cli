import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, '..', 'init', 'templates');

const writeIfMissing = async (filePath, content, label) => {
    if (await fs.pathExists(filePath)) {
        console.log(chalk.yellow(`⚠️  ${label} already exists — skipping.`));
        return false;
    }
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content);
    console.log(chalk.green(`✅ ${label} created.`));
    return true;
};

export const handleInitDocker = async () => {
    const cwd = process.cwd();
    console.log(chalk.bold.blue('\n🐳 ShipGuard — Init Docker\n'));

    const tpl = await fs.readFile(path.join(templatesDir, 'Dockerfile.tpl'), 'utf-8');
    await writeIfMissing(path.join(cwd, 'Dockerfile'), tpl, 'Dockerfile');

    const dockerignore = `node_modules\nnpm-debug.log\n.env\n.git\n`;
    await writeIfMissing(path.join(cwd, '.dockerignore'), dockerignore, '.dockerignore');

    console.log(chalk.dim('\nDone. Review the generated files before building.\n'));
};

export const handleInitCi = async () => {
    const cwd = process.cwd();
    console.log(chalk.bold.blue('\n⚙️  ShipGuard — Init CI\n'));

    const tpl = await fs.readFile(path.join(templatesDir, 'ci.yml.tpl'), 'utf-8');
    const dest = path.join(cwd, '.github', 'workflows', 'ci.yml');
    await writeIfMissing(dest, tpl, '.github/workflows/ci.yml');

    console.log(chalk.dim('\nDone. Commit and push to activate the workflow.\n'));
};
