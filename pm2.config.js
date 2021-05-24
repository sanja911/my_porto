const env = require('./environment.json');

module.exports = {
  apps: [
    {
      name: 'base',
      script: 'index.js',
      pmx: false,
      env: env.dev,
      env_test: env.test,
    },
  ],

  deploy: {
    production: {
      // This is example from pm2, I left it here for now
      // In case we want to use it later
      // user : 'node',
      // host : '212.83.163.1',
      // ref  : 'origin/master',
      // repo : 'git@github.com:repo.git',
      // path : '/var/www/production',
      // 'post-deploy' : 'npm install && pm2 reload pm2.config.js --env production'
    },
  },
};
