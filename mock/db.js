const auth = require('./auth');
const dashboard = require('./dashboard');

module.exports = function () {
  return {
    auth: auth(),
    dashboard: dashboard(),
  };
}
