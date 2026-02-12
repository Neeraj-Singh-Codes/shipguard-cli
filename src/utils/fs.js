import fs from 'fs-extra';
import path from 'path';

export const fileExists = async (filePath) => {
  return fs.pathExists(filePath);
};

export const readJson = async (filePath) => {
  try {
    return await fs.readJson(filePath);
  } catch (error) {
    return null;
  }
};

export const readFile = async (filePath) => {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        return null;
    }
}

export const isDir = async (dirPath) => {
    try {
        const stats = await fs.stat(dirPath);
        return stats.isDirectory();
    } catch {
        return false;
    }
}
