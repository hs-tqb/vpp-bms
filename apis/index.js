export default {
  // 获取实时数据
  getRealtimeData: '/xxx/xxx',
  getCustomerList:'/mg/customer/findLimit',
  getRainOrderList:'/mg/rain/getOrderList',
  getTempOrderList:'/mg/temp/getOrderList',
  // 用户
  getWithdrawList:"/mg/withdrawal/findLimit",
  getDepositList:"/mg/deposit/findLimit",
  getPayoutList:"/mg/payout/findLimit",
  // 登录
  login:'/mg/login/login',
  // 提现
  withdraw:'/mg/withdrawal/transfer',
  denyWithdrawing:'/mg/withdrawal/reject',
}
