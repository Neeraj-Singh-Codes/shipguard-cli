import { runEngine } from '../core/engine.js';
import { reportToConsole } from '../reporters/console.js';
import { reportToJson } from '../reporters/json.js';

export const handleCheck = async (options) => {
    const report = await runEngine(options);

    if (options.json) {
        reportToJson(report);
    } else {
        reportToConsole(report);
    }
    
    // Exit with code 1 if status is High Risk?
    // Maybe let user decide. For now just exit 0.
};
