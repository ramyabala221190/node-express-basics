module.exports = {
  apps : [{
    name:'deploy-node-docker-demo',// instead of default "app", we are giving a different name
    script: './src/app.js', //the script to start the application
    watch: './src', //restarts the node process if any changes in this directory,
    env:{
      NODE_ENV:'production'
    },
    env_development:{
      PORT:3004,
      APP_ENV:'development'
    },
    env_production:{
      PORT:8084,
      APP_ENV:'production'
    },
     node_args:''
  }],  
};
