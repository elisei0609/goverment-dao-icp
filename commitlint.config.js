module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'chore',
      'revert',
      'ci'
    ]],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never']
  }
};
