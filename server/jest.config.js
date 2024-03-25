module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/test'],
    testMatch: ['**/test/**/*.spec.ts'], // Pattern to match test files
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1", // Adjust if using aliases
        "^@test/(.*)$": "<rootDir>/test/$1" // Adjust if using aliases
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest" // Transform TypeScript files
    },
    coveragePathIgnorePatterns: ["/node_modules/"], // Ignore node_modules for coverage
    coverageReporters: ["json", "lcov", "text", "clover"], // Reporting for code coverage
    coverageThreshold: { // (Optional) Set coverage thresholds to enforce minimum coverage
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
