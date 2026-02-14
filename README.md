# ShipGuard

ShipGuard is a CLI tool designed to audit Node.js Express backend projects and evaluate their production readiness.

## Installation

You can install ShipGuard globally or run it via `npx` (once published). For local development:

```bash
git clone https://github.com/Neeraj-Singh-Codes/shipguard-cli.git
cd shipguard
npm install
npm link
```

## Usage

Navigate to your Express project root and run:

```bash
shipguard check
```

## Checks Implemented

ShipGuard performs the following checks:

| Category | Check | Description |
| :--- | :--- | :--- |
| **Security** | **Helmet** | Checks if `helmet` is installed. |
| **Security** | **Rate Limiting** | Checks if `express-rate-limit` is installed. |
| **Config** | **.env File** | Verifies `.env` exists and is included in `.gitignore`. |
| **Ops** | **Dockerfile** | Checks for the existence of a `Dockerfile`. |
| **Ops** | **GitHub Actions** | Checks for workflows in `.github/workflows`. |
| **Code** | **Tests** | Checks for a `tests/`, `test/`, or `__tests__/` directory. |
| **Code** | **Error Handling** | Scans for centralized error middleware signature `(err, req, res, next)`. |

## Example Output

```text
🚢 ShipGuard - Production Readiness Audit

✔ Audit complete
✅ Security: Helmet
✅ Security: Rate Limiting
✅ Config: .env Security
✅ Ops: Dockerfile
✅ Ops: GitHub Actions
✅ Code: Tests
✅ Code: Error Handling

----------------------------------------
Score: 10/10
----------------------------------------
```

## Future Expansion

- **Support for other frameworks**: Add checks for NestJS or Fastify.
- **Deep code analysis**: Use AST parsing (e.g., with `babel` or `ts-morph`) for more accurate code checks instead of regex/glob.
- **Custom Config**: Allow users to configure which checks to run via a `.shipguardrc` file.
- **CI Integration**: Add a flag `--fail-on-error` to use ShipGuard in CI pipelines.
