export class CheckRegistry {
    constructor() {
        this.checks = [];
    }

    register(check) {
        // check: { name, category, weight, fn, description }
        this.checks.push(check);
    }

    getChecks() {
        return this.checks;
    }

    getCheckByName(name) {
        return this.checks.find(c => c.name.toLowerCase() === name.toLowerCase());
    }
}

export const registry = new CheckRegistry();
