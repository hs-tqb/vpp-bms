module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'background-management-system',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel:'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // elementui 的样式直接用cdn外链引入, 不输出到页面
      // { rel:'stylesheet', href:"https://unpkg.com/element-ui@1.4/lib/theme-default/index.css"},
      { rel:'stylesheet', href:"https://unpkg.com/element-ui@2.0.11/lib/theme-chalk/index.css" },
      {rel:"stylesheet", href:"https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"},
      // { rel:'stylesheet', href:"//at.alicdn.com/t/font_1473762766_7074292.css" },
      // { rel:'stylesheet', href:"http://element-cn.eleme.io/1.4/docs.4fd6ff0.css" }
    ],
    script:[
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.1.0/echarts.common.js'},
      // { src:'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js' }
    ]
  },
  css: [
    { src: '~assets/css/main.css' }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  env: {
    ENV_NAME:process.env.ENV_NAME
  },
  plugins:[
    { src: '~plugins/element-ui' }
  ],
  build: {
    vendor: ['axios', 'element-ui'],
  }
}
