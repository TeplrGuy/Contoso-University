# Contributing to Contoso University

Thank you for your interest in contributing to the Contoso University Student Information System! This document provides guidelines and steps for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/contoso-university.git`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

## Development Workflow

1. Create a feature branch from `main`: `git checkout -b feature/your-feature`
2. Make your changes
3. Run the linter: `npm run lint`
4. Run tests: `npm test`
5. Commit using conventional commits (e.g., `feat: add student search`, `fix: correct course count`)
6. Push and open a Pull Request

## Pull Request Guidelines

- **Title**: Use a clear, descriptive title following conventional commit format
- **Description**: Explain what changes you made and why
- **Tests**: Include tests for new functionality
- **Documentation**: Update docs if your change affects user-facing behavior
- **Single Responsibility**: Each PR should address a single concern

## Code Style

- Use TypeScript for all source files
- Follow the existing code patterns and conventions
- Use Tailwind CSS utility classes for styling
- Components should be functional components with hooks

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `style:` — formatting, missing semicolons, etc.
- `refactor:` — code restructuring without behavior change
- `test:` — adding or updating tests
- `chore:` — maintenance tasks

## Reporting Issues

- Use GitHub Issues to report bugs or request features
- Include steps to reproduce for bug reports
- Check existing issues before creating a new one

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
