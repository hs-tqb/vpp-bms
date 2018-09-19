<style lang="less">
#page-home {
  .panel { 
    margin:15px 0; background:#f1f1f1; border-radius:4px; border-bottom:0 none!important; 
    .innerWrapper { display:flex; flex-direction:row; background:#fff; }
    h2 { margin-bottom:5px; }
  }
  #userCount {
    .innerWrapper {
      padding:10px;
      div { flex:1; }
    }
  }
  .el-table thead {
    tr,th { background-color:#f1f1f1; }
    .cell { color:#000; }
  }
  .charts {
    position: relative;
    width: 100%;
  }
  .title-left {
    position: absolute;
    left: 28%;
    bottom: 40px;
    margin-left: -28px;
    color: #333;
  }
  .title-right {
    position: absolute;
    left: 72%;
    bottom: 40px;
    margin-left: -21px;
    color: #333;
  }
  .no-data {
    position: absolute;
    left: 72%;
    top: 50%;
    margin-left: -42px;
    color: #333;
  }
  .charts-box {
    width: 100%;
    height: 400px;
  }
}
</style>

<template>
  <div id="page-home" v-loading="!dataReady">
    <!-- {{coinTotalCount}} -->
    <div id="userCount" class="panel">
      <h2>用户</h2>
      <div class="innerWrapper">
        <div>
          <h3>日新增</h3>
          <p>{{customerTodayCount}}</p>
        </div>
        <div>
          <h3>用户总数</h3>
          <p>{{customerTotalCount}}</p>
        </div>
      </div>
    </div>
    <!-- 盈亏 -->
    <div id="pnl" class="panel">
      <h2>币价期权-盈亏</h2>
      <div>
        <el-table :data="pnlToday" style="width:100%">
          <el-table-column prop="targetId" label="币种" width="180"></el-table-column>
          <el-table-column label="日盈亏">
            <template slot-scope="scope">
              <span :class="`text-${scope.row.amount<0?'danger':'success'}`">
                {{scope.row.amount>0?'+':''}} {{scope.row.amount}}
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="历史">
            <template slot-scope="scope">
              <span :class="`text-${scope.row.total<0?'danger':'success'}`">{{scope.row.total}}</span>
            </template>
          </el-table-column> -->
        </el-table>
        <el-table :data="pnlTotal" style="width:100%">
          <el-table-column prop="targetId" label="币种" width="180"></el-table-column>
          <el-table-column label="历史盈亏">
            <template slot-scope="scope">
              <span :class="`text-${scope.row.amount<0?'danger':'success'}`">
                {{scope.row.amount>0?'+':''}} {{scope.row.amount}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 今日 -->
    <!-- <div class="coin panel">
      <h2>币价期权-订单</h2>
      <el-table :data="coinTodayCount" style="width:100%">
        <el-table-column prop="targetId" label="币种" width="180"></el-table-column>
        <el-table-column prop="cnt" label="日订单数"></el-table-column> -->
        <!-- <el-table-column prop="amount" label="总额"></el-table-column>  无-->  
        <!-- <el-table-column label="日总额">
            <template slot-scope="scope">
              <span class="text-success">+{{scope.row.amount}}</span>
            </template>          
        </el-table-column>
      </el-table>
      <el-table :data="coinTotalCount" style="width:100%">
        <el-table-column prop="targetId" label="币种" width="180"></el-table-column>
        <el-table-column prop="cnt" label="历史订单数"></el-table-column> -->
        <!-- <el-table-column prop="amount" label="总额"></el-table-column>  无-->
        <!-- <el-table-column label="历史总额">
            <template slot-scope="scope">
              <span class="text-success">+{{scope.row.amount}}</span>
            </template>          
        </el-table-column>
      </el-table>
    </div> -->
    <!-- 总赔付 -->
    <!-- <div class="payout panel">
      <h2>币价期权-赔付</h2>
      <el-table :data="coinTodayPayout" style="width:100%">
        <el-table-column prop="targetId" label="币种" width="180"></el-table-column>
        <el-table-column label="日总额">
            <template slot-scope="scope">
              <span class="text-failure">-{{scope.row.payout}}</span>
            </template>          
        </el-table-column>
      </el-table>
      <el-table :data="coinTotalPayout" style="width:100%">
        <el-table-column prop="targetId" label="币种" width="180"></el-table-column>
        <el-table-column label="历史总额">
            <template slot-scope="scope">
              <span class="text-failure">-{{scope.row.payout}}</span>
            </template>          
        </el-table-column>
      </el-table>
    </div> -->
    <div class="charts" >
      <div class="charts-box" ref="mychart1">
        
      </div>
      <div class="title-left">历史赔付</div>
      <div class="title-right">日赔付</div>
      <div class="no-data" v-show="!coinTodayPayout.length">今日暂无数据</div>
    </div>
    <div class="charts" >
      <div class="charts-box" ref="mychart2">

      </div>
      <div class="title-left">历史总额</div>
      <div class="title-right">日总额</div>
      <div class="no-data" v-show="!coinTodayCount.length">今日暂无数据</div>
    </div>
    <div class="charts" >
      <div class="charts-box" ref="mychart3">

      </div>
      <div class="title-left">历史订单数</div>
      <div class="title-right">日订单数</div>
      <div class="no-data" v-show="!coinTodayCount.length">今日暂无数据</div>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      coinTodayCount:[],
      coinTotalCount:[],
      coinTodayPayout:[],
      coinTotalPayout:[],
      customerTodayCount:0,
      customerTotalCount:0,
      dataReady:false
    }
  },
  methods: {
    test() {
      console.log(this.coinTotalPayout)
      console.log(this.chartsArr(this.coinTotalPayout))
    },
    chartsArrPayout(arr) {
      let newArr = []
      for(let i=0;i<arr.length;i++) {
        let item = {name: arr[i].targetId, value: arr[i].payout}
        newArr.push(item)
      }
      return newArr
    },
    chartsArrAmount (arr) {
      let newArr = []
      for(let i=0;i<arr.length;i++) {
        let item = {name: arr[i].targetId, value: arr[i].amount}
        newArr.push(item)
      }
      return newArr
    },
    chartsArrCnt (arr) {
      let newArr = []
      for(let i=0;i<arr.length;i++) {
        let item = {name: arr[i].targetId, value: arr[i].cnt}
        newArr.push(item)
      }
      return newArr
    },
    setEchart() {
        let dom1 = this.$refs.mychart1
        this.myChart1 = echarts.init(dom1)
        this.myChart1.setOption(this.chartsOpt.objA)
        let dom2 = this.$refs.mychart2
        this.myChart2 = echarts.init(dom2)
        this.myChart2.setOption(this.chartsOpt.objB)
        let dom3 = this.$refs.mychart3
        this.myChart3 = echarts.init(dom3)
        this.myChart3.setOption(this.chartsOpt.objC)
    },
  },
  computed: {
    chartsOpt() {
      let totalPayoutData = this.chartsArrPayout(this.coinTotalPayout)
      let todayPayoutData = this.chartsArrPayout(this.coinTodayPayout)
      let totalAmountData = this.chartsArrAmount(this.coinTotalCount)
      let todayAmountData = this.chartsArrAmount(this.coinTodayCount)
      let totalCntData = this.chartsArrCnt(this.coinTotalCount)
      let todayCntData = this.chartsArrCnt(this.coinTodayCount)
      let objA = {
        title : [{
          text: '币价期权-赔付',
          // subtext: '左为日总额,右为历史总额',
          x:'center',
          top: '20px'
        }],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : -{c} ({d}%)"
        },
        // legend: {
        //   top: '40px',
        //   left: '20px',
        //   orient: 'vertical',
        //   left: 'left',
        //   data: ['历史赔付','每日赔付']
        //  },
         series : [
          {
            name: '历史赔付',
            type: 'pie',
            radius : '45%',
            center: ['28%', '53%'],
            label: {
              formatter: function(params) {
                let val = params.value.toFixed(0)/1000
                return params.name + ': -' + val + 'k'
              }
            },
            data: totalPayoutData,
            itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },{
            name: '每日赔付',
            type: 'pie',
            radius : '45%',
            center: ['72%', '53%'],
            label: {
              formatter: function(params) {
                let val = params.value.toFixed(0)/1000
                return params.name + ': -' + val + 'k'
              }
            },
            data: todayPayoutData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }
        ]
      }
      let objB = {
        title : [{
          text: '币价期权-订单总额',
          // subtext: '左为日总额,右为历史总额',
          x:'center',
          top: '20px'
        }],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   top: '40px',
        //   left: '20px',
        //   orient: 'vertical',
        //   left: 'left',
        //   data: ['日总额','历史总额']
        //  },
         series : [
          {
              name: '历史总额',
              type: 'pie',
              radius : '45%',
              center: ['28%', '53%'],
              label: {
                formatter: function(params) {
                  let val = params.value.toFixed(0)/1000
                  return params.name + ': -' + val + 'k'
                }
              },
              data: totalAmountData,
              itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
          },{
            name: '日总额',
            type: 'pie',
            radius : '45%',
            center: ['72%', '53%'],
            label: {
              formatter: function(params) {
                let val = params.value.toFixed(0)/1000
                return params.name + ': -' + val + 'k'
              }
            },
            data: todayAmountData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }
        ]
      }
      let objC = {
        color:  [
          '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
          '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
          '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
        ],
        title : [{
          text: '币价期权-订单数',
          // subtext: '左为日总额,右为历史总额',
          x:'center',
          top: '20px'
        }],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   top: '40px',
        //   left: '20px',
        //   orient: 'vertical',
        //   left: 'left',
        //   data: ['日总额','历史总额']
        //  },
         series : [
          {
              name: '历史订单数',
              type: 'pie',
              radius : '45%',
              center: ['28%', '53%'],
              label: {
                formatter: function(params) {
                  // if(params.value > 10000) {
                  //   let val = (params.value.toFixed(0) + '').slice(0,-4)
                  //   return params.name + ': ' + val + '万'
                  // }else {
                  //   let val = params.value.toFixed(0)
                  //   return params.name + ': ' + val
                  // }
                  let val = params.value.toFixed(0)
                  return params.name + ': ' + val
                }
              },
              data: totalCntData,
              itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
          },{
            name: '日订单数',
            type: 'pie',
            radius : '45%',
            center: ['72%', '53%'],
            label: {
              formatter: function(params) {
                // if(params.value > 10000) {
                //   let val = (params.value.toFixed(0) + '').slice(0,-4)
                //   return params.name + ': ' + val + '万'
                // }else {
                //   let val = params.value.toFixed(0)
                //   return params.name + ': ' + val
                // }
                let val = params.value.toFixed(0)
                return params.name + ': ' + val
              }
            },
            data: todayCntData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }
        ]
      }
      return {objA,objB,objC}
    },
    pnlToday() {
      return this.coinTodayPayout.map(p=>{
        return {
          targetId:p.targetId,
          // amount:this.customerTodayCount - p.payout
          amount:this.coinTodayCount.filter(c=>c.targetId===p.targetId)[0].amount - p.payout
        }
      });
    },
    pnlTotal() {
      return this.coinTotalPayout.map(p=>{
        return {
          targetId:p.targetId,
          // amount:this.customerTotalCount - p.payout
          amount:this.coinTotalCount.filter(c=>c.targetId===p.targetId)[0].amount - p.payout
        }
      });
    },
    // pnlData() {
    //   let todayPayout = this.coinTodayPayout;
    //   let totalPayout = this.coinTotalPayout;
    //   let arr  = [];
    //   let temp = new Array(this.coinTodayPayout.length)
    //   if ( !temp.length ) return [];

    //   arr = [1,2,3].map((n,i)=>{
    //     console.log(i)
    //     let todayTarget = todayPayout[i]
    //     let totalTarget = totalPayout[i]
    //     totalTarget = totalTarget.targetId === todayTarget.targetId?
    //       totalTarget:
    //       totalPayout.filter(t=>t.targetId===todayTarget.targetId)[0];
    //     if ( !totalTarget ) { return {}; }
    //     return { 
    //       targetId:totalTarget.targetId, 
    //       today:this.customerTodayCount -todayTarget.payout, 
    //       total:this.customerTotalCount -totalTarget.payout 
    //     };
    //   })

    //   return arr;
    // }
  },
  mounted() {

    this.$http.get('getStatistics', 
      // {params:{
      //   startDate:'2018-05-05'
      // }}
    )
    .then(resp=>{
      console.log( resp.data )
      if ( resp.state !== 1 ) return;
      for ( let p in resp.data ) {
        this[p] = resp.data[p];
      }
      this.dataReady = true;
      this.setEchart()
    })
  }
}
</script>

