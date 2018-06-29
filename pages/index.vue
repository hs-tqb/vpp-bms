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
    <div class="coin panel">
      <h2>币价期权-订单</h2>
      <el-table :data="coinTodayCount" style="width:100%">
        <el-table-column prop="targetId" label="币种" width="180"></el-table-column>
        <el-table-column prop="cnt" label="日订单数"></el-table-column>
        <!-- <el-table-column prop="amount" label="总额"></el-table-column> -->
        <el-table-column label="日总额">
            <template slot-scope="scope">
              <span class="text-success">+{{scope.row.amount}}</span>
            </template>          
        </el-table-column>
      </el-table>
      <el-table :data="coinTotalCount" style="width:100%">
        <el-table-column prop="targetId" label="币种" width="180"></el-table-column>
        <el-table-column prop="cnt" label="历史订单数"></el-table-column>
        <!-- <el-table-column prop="amount" label="总额"></el-table-column> -->
        <el-table-column label="历史总额">
            <template slot-scope="scope">
              <span class="text-success">+{{scope.row.amount}}</span>
            </template>          
        </el-table-column>
      </el-table>
    </div>
    <!-- 总赔付 -->
    <div class="payout panel">
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
  computed: {
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
    })
  }
}
</script>

