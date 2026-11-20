const path = require('node:path');
const appRoot = path.resolve(__dirname, '..');

module.exports = {
  apps: [{
    name: 'health-check-web',
    script: path.join(appRoot, 'deploy', 'start.mjs'),
    interpreter: process.env.HEALTHCHECK_NODE || 'node',
    node_args: ['--env-file=' + path.join(appRoot, '.env')],
    cwd: appRoot,
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    max_memory_restart: '256M',
    time: true,
  }],
};
