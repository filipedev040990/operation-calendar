module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/contracts/*.ts',
    '!<rootDir>/src/**/app.ts',
    '!<rootDir>/src/**/infra.ts',
    '!<rootDir>/src/**/server.ts',
    '!<rootDir>/src/**/prisma-client.ts',
    '!<rootDir>/src/**/config.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/src/(.*)': '<rootDir>/src/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
