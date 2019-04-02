const dashboard = require('./dashboard');

module.exports = function() {
  return {
    dashboard: dashboard(),
  };
}
