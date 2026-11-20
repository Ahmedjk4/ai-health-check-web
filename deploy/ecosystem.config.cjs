module.exports = {
  apps: [{
    name: 'health-check-web',
    script: './server.js',
    interpreter: process.env.HEALTHCHECK_NODE || 'node',
    node_args: '--env-file=.env',
    cwd: __dirname + '/..',
    instances: 1,
    autorestart: true,
    max_memory_restart: '256M',
    time: true,
  }],
};
