const isWin = process.platform === 'win32';
const commands = ['lint-staged', isWin ? 'npm run jest:win' : 'npm run jest'];

const tasks = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': tasks(commands),
  },
};
