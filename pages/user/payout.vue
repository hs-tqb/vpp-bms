<style lang="less">
#search {
    display:flex; margin:15px 0; width: 285px;
    .el-input { margin-right:10px; }
}
</style>

<template>
  <div id="page-customer-payoutList" v-loading="!dataReady">
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
      <el-table-column prop="innerOrderId" label="订单号"></el-table-column>
      <el-table-column label="赔付状态">
        <template slot-scope="scope">
          <span class="text-success" v-if="scope.row.payoutState===1">已赔付</span>
          <span class="text-failure" v-else>未赔付</span>
        </template>
      </el-table-column>
      <el-table-column prop="payoutFee" label="应赔付"></el-table-column>
      <el-table-column prop="realPayoutFee" label="实际赔付"></el-table-column>
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
      this.$http('getPayoutList', { 
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
      this.$http('getPayoutList', { 
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

