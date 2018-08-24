<style lang="less">
  .el-table {
    tbody tr:odd { background-color:#fafafa; }
  }
  #search {
    display:flex; margin:15px 0; width: 285px;
    .el-input { margin-right:10px; }
  }
  .el-pagination { padding:20px 0; text-align:center; }

  .text-info    { color:#909399; }
  .text-warning { color:#E6A23C; }
  .text-primary { color:#409EFF; }
  .text-success { color:#67c23a; }
  .text-failure { color:#f56c6c; }
</style>

<template>
  <div id="page-customer-depositList" v-loading="!dataReady">
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
      <el-table-column prop="vpp" label="vpp数量" width="100"></el-table-column>
      <el-table-column prop="payeeAddress" label="收款人">
        <template slot-scope="scope">
          <a :href="`https://etherscan.io/address/${scope.row.payee_address}`" target="_blank">
            {{scope.row.payee_address}}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="payeeAddress" label="付款人">
        <template slot-scope="scope">
          <a :href="`https://etherscan.io/address/${scope.row.payer_address}`" target="_blank">
            {{scope.row.payer_address}}
          </a>
        </template>
      </el-table-column>
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
      this.$http('getDepositList', { 
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
    searchByCustomerId() {
      this.dataReady = false
      let { pageSize,currentPage} = this.tableData
      let { customerId } = this.searchData
      this.$http('getDepositList', { 
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

