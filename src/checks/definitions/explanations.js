export const explanations = {
    'Helmet': {
        risk: 'Lack of secure HTTP headers (e.g., XSS, Clickjacking, MIME-sniffing).',
        benefit: 'Automatically sets 15+ secure HTTP headers to protect your app from common web vulnerabilities.',
        fix: 'Install helmet (`npm install helmet`) and apply it globally: `app.use(helmet());`'
    },
    'Rate Limiting': {
        risk: 'Brute-force attacks and Denial of Service (DoS).',
        benefit: 'Restricts the number of requests a client can make in a given timeframe.',
        fix: 'Install express-rate-limit (`npm install express-rate-limit`) and apply to sensitive routes or globally.'
    },
    'CORS': {
        risk: 'Unauthorized cross-origin resource sharing, potentially leading to data theft.',
        benefit: 'Ensures only trusted origins can access your API.',
        fix: 'Install cors (`npm install cors`) and configure with specific origins: `app.use(cors({ origin: "https://yourdomain.com" }));`'
    },
    'Dockerfile': {
        risk: 'Environment drift and inconsistent deployments.',
        benefit: 'Ensures the app runs in an identical, isolated environment from dev to prod.',
        fix: 'Create a `Dockerfile` in the project root using a Node.js base image.'
    },
    'GitHub Actions': {
        risk: 'Manual deployments and lack of automated CI/CD pipelines.',
        benefit: 'Automates testing and deployment workflows for consistency and speed.',
        fix: 'Create `.github/workflows/ci.yml` to automate your testing and build process.'
    },
    'Tests': {
        risk: 'Regressions and broken features in production.',
        benefit: 'Verifies code correctness and prevents bugs from reaching users.',
        fix: 'Initialize a test framework (e.g., Vitest, Jest) and add tests for your endpoints.'
    },
    'Error Handling': {
        risk: 'Unhandled exceptions crashing the server or leaking stack traces.',
        benefit: 'Ensures consistent error responses and graceful failure handling.',
        fix: 'Implement a centralized error middleware: `app.use((err, req, res, next) => { ... });`'
    },
    'Environment Config': {
        risk: 'Hardcoded secrets and misconfigured environments.',
        benefit: 'Separates configuration from code, improving security and flexibility.',
        fix: 'Use `.env` files for secrets and ensure they are listed in `.gitignore`.'
    },
    'NODE_ENV': {
        risk: 'Running development-only tools or debugging in production, which leaks data.',
        benefit: 'Ensures the app optimizes performance and security for production.',
        fix: 'Ensure your startup script sets `NODE_ENV=production`.'
    }
};
