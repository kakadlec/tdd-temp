module.exports = {
  roots: ['<rootDir>/server'],
  collectCoverageFrom: [
    '<rootDir>/**/*.js',
    '!**/test/**',
    '!**/server.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel'
}
