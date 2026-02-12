import { registry } from './registry.js';
import { getPackageJson } from '../utils/npm.js';

export const runEngine = async (options = {}) => {
    const pkg = await getPackageJson();
    const checks = registry.getChecks();
    const results = [];

    let totalWeight = 0;
    let earnedWeight = 0;

    for (const check of checks) {
        const result = await check.fn(pkg);
        const weight = check.weight || 1;
        totalWeight += weight;

        const passed = result.status === 'pass';
        if (passed) {
            earnedWeight += weight;
        }

        results.push({
            ...result,
            category: check.category,
            weight
        });
    }

    const percentage = totalWeight > 0 ? (earnedWeight / totalWeight) * 100 : 0;
    const score = (percentage / 10).toFixed(1);

    let status = 'High Risk';
    if (percentage >= 80) status = 'Production Ready';
    else if (percentage >= 50) status = 'Needs Improvement';

    return {
        score: parseFloat(score),
        percentage: Math.round(percentage),
        status,
        results,
        metadata: {
            projectName: pkg?.name || 'unknown',
            nodeVersion: process.version,
            timestamp: new Date().toISOString()
        }
    };
};
