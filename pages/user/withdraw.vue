<style lang="less">
  
  #search {
    display:flex; margin:15px 0; width: 285px;
    .el-input { margin-right:10px; }
  }
</style>

<template>
  <div id="page-orderList" v-loading="!dataReady">
    <!-- <h3>打款</h3>
    <div id="manually">
      <el-input placeholder="手机号" v-model="manual.mobile" type="tel"></el-input>
      <el-input placeholder="金额" v-model="manual.amount" type="number" min=1></el-input>
      <el-button type="primary" @click="doWithdrawByManually">确定</el-button>
    </div> -->
    <div id="search">
      <el-input placeholder="客户ID" v-model="searchData.customerId" type="number"></el-input>
      <el-button type="primary" @click="searchByCustomerId">查找</el-button>
    </div>
    <el-table 
      :data="tableData.rows" 
      style="width:100%" 
      v-if="dataReady"
      stripe
    >
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="customerId" label="ID" width="40"></el-table-column>
      <el-table-column prop="vpp" label="提现金额" width="100"></el-table-column>
      <el-table-column prop="gas" label="手续费" width="100"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="100"></el-table-column>
      <el-table-column prop="gmtModified" label="最后操作时间" width="110"></el-table-column>
      <!-- <el-table-column label="提现状态" width="100">
        <template slot-scope="scope">
          {{
            scope.row.state===1?'待处理':
            (scope.row.state===2?'已执行打款':'处理成功')
          }}
        </template>
      </el-table-column> -->
      <el-table-column prop="payeeAddress" label="提现地址">
        <template slot-scope="scope">
          <a :href="`https://etherscan.io/address/${scope.row.cashNo}`" target="_blank">
            {{scope.row.payeeAddress}}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="打款" width="170">
        <template slot-scope="scope">
          <template v-if="scope.row.state===1">
            <el-button type="primary" @click="doWithdraw(scope.row)">打款</el-button>
            <el-button type="danger"  @click="deny(scope.row)">拒绝</el-button>
          </template>
          <template v-else-if="scope.row.state===2">
            <span class="text-primary">打款执行中</span>
            <el-button type="danger"  @click="rollback(scope.row)">回滚打款</el-button>
          </template>
          <template v-else-if="scope.row.state===3">
            <span class="text-success">打款成功</span>
          </template>
          <template v-else-if="scope.row.state===4">
            <span class="text-failure">已拒绝打款</span>
          </template>
          <template v-else-if="scope.row.state===5">
            <span class="text-failure">打款失败</span>
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="description" label="描述"></el-table-column> -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tableData.currentPage"
      :page-sizes="[15,30,50,100]"
      :page-size="tableData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataReady:false,
      tableData:{
        pageSize:15,
        currentPage:1,
        total:0,
        rows:[]
      },
      // manual: {
      //   mobile:'',
      //   amount:''
      // },
      searchData: {
        customerId: ''
      }
    }
  },
  methods: {
    handleSizeChange(len) {
      this.tableData.pageSize = len;
      this.loadTableData();
    },
    handleCurrentChange(idx) {
      this.tableData.currentPage = idx;
      if(!this.searchData.customerId){
        this.loadTableData();
      }else{
        this.searchByCustomerId()
      }
    },
    loadTableData() {
      this.dataReady = false
      let { pageSize,currentPage } = this.tableData
      this.$http('getWithdrawList', { 
        params:{ pageSize, currentPage } 
      })
      .then(resp=>{
        this.dataReady = true
        if ( resp.state !== 1 ) return;
        console.log( resp )
        this.tableData = { ...resp.data };
      })
      .catch(err=>{ this.dataReady = true })
    },
    doWithdraw(obj) {
      // console.log(id)
      this.$http.get('withdraw', {params:{id:obj.id}})
      .then(resp=>{
        if ( resp.state === 0 ) return;
        this.$message.success('提现申请成功')
        obj.state = 2;
      })
    },
    // doWithdrawByManually() {
    //   let { mobile,amount,text } = this.manual
    //   if ( !mobile ) {
    //   //   text = '手机号不能为空'
    //   // } else if ( !/^((\+|0{1,2})\d{2,4} *)?1[3456789]\d{9}$/.test(mobile) ) {
    //   //   text = '手机号码错误'
    //   } else if ( +amount<=0 ) {
    //     text = '金额必须大于0'
    //   }
    //   if ( text ) {
    //     this.$message.closeAll()
    //     this.$message.error(text)
    //     return;
    //   }
    //   this.$http.get('doRemit', {params:{mobile,amount}})
    //   .then(resp=>{
    //     if ( resp.state!==1 ) return;
    //     this.$message.success('打款成功')
    //   })
    // },
    deny(obj) {
      this.$http.get('denyWithdrawing', {params:{id:obj.id}})
      .then(resp=>{
        if ( resp.state !== 1 ) return;
        obj.state = 4;
      })
    },
    rollback(obj) {
      this.$http.get('rollbackWithdraw', {params:{id:obj.id}})
      .then(resp=>{
        if ( resp.state !== 1 ) return;
        obj.state = 5;
      })
    },
    searchByCustomerId() {
      this.dataReady = false
      let { pageSize,currentPage} = this.tableData
      let { customerId } = this.searchData
      this.$http('getWithdrawList', { 
        params:{ pageSize, currentPage, customerId } 
      })
      .then(resp=>{
        this.dataReady = true
        if ( resp.state !== 1 ) return;
        console.log( resp )
        this.tableData = { ...resp.data };
      })
      .catch(err=>{ this.dataReady = true })
    }
  },
  mounted() {
    this.loadTableData();
  }
}
</script>

