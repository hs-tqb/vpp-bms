<style lang="less">
  .el-table {
    tbody tr:odd { background-color:#fafafa; }
  }
  .el-pagination { padding:20px 0; text-align:center; }
</style>

<template>
  <div id="page-orderList" v-loading="!dataReady">
    <el-table 
      :data="tableData.rows" 
      style="width:100%" 
      v-if="dataReady"
      stripe
    >
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="vpp" label="vpp数量" width="100"></el-table-column>
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
          <a :href="`https://etherscan.io/address/${scope.row.payeeAddress}`" target="_blank">
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
          </template>
          <template v-else-if="scope.row.state===3">
            <span class="text-success">打款成功</span>
          </template>
          <template v-else-if="scope.row.state===4">
            <span class="text-failure">已拒绝打款</span>
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
      this.loadTableData();
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
    deny(obj) {
      this.$http.get('denyWithdrawing', {params:{id:obj.id}})
      .then(resp=>{
        if ( resp.state !== 1 ) return;
        obj.state = 4;
      })
    }
  },
  mounted() {
    this.loadTableData();
  }
}
</script>

