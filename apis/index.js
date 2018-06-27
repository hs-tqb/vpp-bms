export default {
  // 获取实时数据
  getRealtimeData: '/xxx/xxx',
  getCustomerList:'/mg/customer/findLimit',
  getRainOrderList:'/mg/rain/getOrderList',
  getTempOrderList:'/mg/temp/getOrderList',
  getTrasactionList:'/mg/transactions/findLimit',
  // 用户
  getWithdrawList:"/mg/withdrawal/findLimit",
  getDepositList:"/mg/deposit/findLimit",
  getPayoutList:"/mg/payout/findLimit",
  // 登录
  login:'/mg/login/login',
  // 打款
  withdraw:'/mg/withdrawal/transfer',
  denyWithdrawing:'/mg/withdrawal/reject',
  rollbackWithdraw:'/mg/withdrawal/fail',
  doRemit:'/mg/deposit/add',
  // 统计
  getStatistics:'/mg/index/stata'
}
