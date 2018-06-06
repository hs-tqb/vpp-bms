const env = { 
  development: {
    baseURL:'localhost:5555'
  },
  test: {
    baseURL:'http://112.74.26.159:8205'
  },
  joint: {
    baseURL:'http://112.74.26.159:8205'
  },
  production: {
    baseURL:'localhost:5555'
  }
};

// console.log( process.env.PROCESS_ENV || process.env.NODE_ENV )


export default env[process.env.ENV_NAME || process.env.NODE_ENV]
