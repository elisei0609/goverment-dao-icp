module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'ci',
      ],
    ],
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower'],
    'subject-full-stop': [2, 'never', '.'],
  },
};