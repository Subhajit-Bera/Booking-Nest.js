module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: './coverage',
    testRegex: ['\\.spec\\.ts$'], 
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1', 
        '^src/(.*)/': '<rootDir>/src/$1/', 
    },
    moduleDirectories: ['node_modules', 'src'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};
