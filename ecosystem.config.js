module.exports = {
  apps : [
    {
      name      : 'warit',
      script    : 'index.js',
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],
};
