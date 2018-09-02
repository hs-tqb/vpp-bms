const env = { 
  development: {
    baseURL:'localhost:5555'
  },
  test: {
    // baseURL:'http://112.74.26.159:8205'
    // baseURL:'http://47.89.11.105:8205'
    baseURL: 'http://139.199.85.231:8081'
  },
  joint: {
    // baseURL:'http://112.74.26.159:8205'
    baseURL:'http://192.168.1.170:8008'
  },
  production: {
    baseURL:'http://mg.valp.io'
  }
};

// console.log( env[process.env.ENV_NAME || process.env.NODE_ENV] )


export default env[process.env.ENV_NAME || process.env.NODE_ENV]
