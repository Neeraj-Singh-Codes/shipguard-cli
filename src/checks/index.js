import { registry } from '../core/registry.js';
import * as security from './security.js';
import * as config from './config.js';
import * as ops from './ops.js';
import * as code from './code.js';

// Categories: Security (2), Ops (1), Code (1), Config (1)

// Security
registry.register({ name: 'Helmet', category: 'Security', weight: 2, fn: security.checkHelmet });
registry.register({ name: 'Rate Limiting', category: 'Security', weight: 2, fn: security.checkRateLimit });
registry.register({ name: 'CORS', category: 'Security', weight: 2, fn: security.checkCORS });
registry.register({ name: 'NODE_ENV', category: 'Security', weight: 2, fn: security.checkNodeEnv });

// Config
registry.register({ name: 'Environment Config', category: 'Config', weight: 1, fn: config.checkEnv });

// Ops
registry.register({ name: 'Dockerfile', category: 'Ops', weight: 1, fn: ops.checkDockerfile });
registry.register({ name: 'GitHub Actions', category: 'Ops', weight: 1, fn: ops.checkGithubActions });

// Code
registry.register({ name: 'Tests', category: 'Code', weight: 1, fn: code.checkTests });
registry.register({ name: 'Error Handling', category: 'Code', weight: 1, fn: code.checkErrorMiddleware });

export { registry };
