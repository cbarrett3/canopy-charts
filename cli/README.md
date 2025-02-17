# Canopy Charts CLI

> This is the CLI development documentation for Canopy Charts.
>
> **Purpose**: Development setup, testing, and contribution guidelines for the CLI tool  
> **App Developer?** For using Canopy Charts in your app, see our [main documentation](../README.md)

## Development Setup

```bash
# Clone the repo
git clone https://github.com/cbarrett3/canopy-charts.git

# Install dependencies
cd canopy-charts/cli
npm install

# Install test dependencies
npm install ts-jest @types/jest jest typescript --save-dev

# Run tests to verify setup
npm test
```

## Project Structure

```
cli/
├── src/
│   ├── commands/     # CLI commands (init, add, etc.)
│   │   ├── init.ts   # Project initialization
│   │   └── add.ts    # Add chart components
│   ├── utils/        # Shared utilities
│   │   ├── framework-validator.ts
│   │   └── template-manager.ts
│   └── test/         # Test helpers
├── __tests__/        # Test files
└── dist/            # Compiled output
```

## Development Workflow

1. **Select an Issue**
   - Browse [open issues](https://github.com/cbarrett3/canopy-charts/issues)
   - Filter by `good first issue` or `cli` labels
   - Comment to claim an issue

2. **Development**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name

   # Start development mode
   npm run watch
   ```

3. **Testing**
   ```bash
   # Run test suite
   npm test                 # Full test suite with coverage
   npm run test:watch      # Development mode with auto-rerun
   npm run test:coverage   # Detailed coverage report
   ```

   Our tests:
   - Use Jest with TypeScript support
   - Require 80% coverage for branches, functions, and lines
   - Run automatically on pull requests
   - Include unit and integration tests

4. **Code Quality**
   ```bash
   # Lint code
   npm run lint           # Check for issues
   npm run lint:fix      # Auto-fix issues
   ```

5. **Build**
   ```bash
   # Production build
   npm run build
   npm run clean       # Clean build artifacts
   ```

## Testing Guidelines

- Write tests for all new features
- Maintain >80% coverage (branches, functions, lines)
- Run full test suite before submitting PR
- Use meaningful test descriptions
- Place tests in `__tests__` directories or with `.test.ts` suffix

## Code Style

- Follow TypeScript best practices
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Support

- [Open an Issue](https://github.com/cbarrett3/canopy-charts/issues)
- [GitHub Discussions](https://github.com/cbarrett3/canopy-charts/discussions)

## Available Scripts

| Script | Description |
|--------|-------------|
| `build` | Production build |
| `watch` | Development mode |
| `test` | Run test suite with coverage |
| `test:watch` | Run tests in watch mode |
| `test:coverage` | Generate detailed coverage report |
| `lint` | Check code style |
| `clean` | Clean build files |
