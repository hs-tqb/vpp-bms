export default [
  // {icon:'menu',   name:'首页', url:'/'},
  // {icon:'goods',  name:'下单', url:'/addorder'},
  // {icon:'search', name:'查询订单', url:'/query',children:[]},
  // {icon:'date',   name:'我的账户', url:'/test', children:[
  //   {icon:'date', name:'测试',     url:'/test'},
  //   {icon:'date', name:'测试子页', url:'/test/zzz'},
  //   {icon:'date', name:'测试子页', url:'/test/333'}
  // ]}
  // {name:'用户列表', url:'/'},
  // {name:'订单列表', url:'/orderList'},
  // {name:'触发列表', url:'/triggerList'},
  // {name:'赔付列表', url:'/payoutList'},

  {
    name:'交易流水', url:'/transactionList' 
  },
  {
    name:'用户', url:'/user', opened:true, children:[
      {name:'提现', url:'/user/withdraw'},
      {name:'赔付', url:'/user/payout'},
      {name:'充值', url:'/user/deposit'},
    ]
  },
  {name:'高温', url:'/temp', opened:true, children:[
    {name:'订单列表', url:'/temp/orderList'},
    // {name:'触发列表', url:'/temp/triggerList'},
    // {name:'赔付列表', url:'/temp/payoutList'},
  ]},
  {name:'降雨', url:'/rain', opened:true, children:[
    {name:'订单列表', url:'/rain/orderList'},
    // {name:'触发列表', url:'/rain/triggerList'},
    // {name:'赔付列表', url:'/rain/payoutList'},
  ]},
]
