Mobile app for Government DAO on React Native (Expo)

## Prerequisites

### Node.js
- Recommended version: `18.19.0`
- Use nvm to install:
```bash
nvm install 18.19.0
nvm use 18.19.0
```

### iOS Development (macOS)
1. Install Xcode from Mac App Store
2. Install Xcode Command Line Tools:
```bash
xcode-select --install
```
3. Set up Xcode path:
```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```
4. Accept Xcode license:
```bash
sudo xcodebuild -license accept
```
5. Install iOS Simulator:
   - Open Xcode
   - Go to Preferences/Settings -> Components
   - Download iOS Simulator


### Installation
```bash
cd mobile
npm install
```

### Running the App
```bash
npm run start
```

### Run on iOS simulator
```bash
npm run ios
```

### Run on android simulator
```bash
npm run android
```

# Git Workflow

## Branching Strategy

We use a feature branch workflow:

### Main Branches
- `master`: Main branch, contains production-ready code
- `feature/*`: Feature branches for new development

### Branch Naming
- Features: `feature/wallet-connection`
- Fixes: `fix/navigation-bug`

### Workflow
1. Create a new branch from master:
```bash
git checkout master
git pull
git checkout -b feature/your-feature-name
```

2. Make changes and commit using conventional commits
3. Push your branch:
```bash
git push origin feature/your-feature-name
```
4. When feature is complete and tested:
   - Pull latest master
   - Resolve any conflicts
   - Test again
   - Create Pull Request to master

5. After review and approval:
   - Squash and merge to master
   - Delete feature branch

## Commit Convention
We use conventional commits to maintain clear git history. Each commit message should be structured as follows:

type: description

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `revert`: Reverting changes
- `ci`: CI/CD changes

### Examples
feat: add wallet connection
fix: resolve navigation bug
style: update button styling
docs: update installation guide

## Pre-commit Hooks
The project uses Husky and lint-staged for automated code quality checks:

1. **Prettier** runs automatically on staged files before commit
2. **Commit message** is checked against conventional commit format

### Setup
The hooks are installed automatically when you run `npm install` in the mobile directory.

### Manual Format
To manually format code:
```bash
npm run format:check # Check formatting
npm run format # Format code
```

### Skip Hooks
In rare cases, to skip hooks (not recommended):
```bash
git commit -m "feat: something" --no-verify
```

### Key Directories

- `features/`: Feature-based modules, each containing its own screens, components, hooks, and services
- `components/`: Reusable components shared across features
- `navigation/`: Navigation setup and configuration
- `services/`: Global services for API calls and blockchain interactions
- `hooks/`: Shared custom React hooks
- `utils/`: Helper functions and utilities
- `constants/`: Global constants and configuration
- `theme/`: UI theme settings (colors, typography, spacing)

### Feature Module Structure

Each feature module follows the same structure:
- `screens/`: Main screen components
- `components/`: Feature-specific components
- `hooks/`: Feature-specific custom hooks
- `services/`: Feature-specific services

### Best Practices

1. Keep feature-specific code within its feature directory
2. Use shared components for common UI elements
3. Place business logic in services
4. Use hooks for reusable logic
5. Keep screens focused on layout and composition