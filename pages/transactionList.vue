<style lang="less">
  #search {
    display:flex; margin:15px 0; width: 285px;
    .el-input { margin-right:10px; }
  }
</style>

<template>
  <div id="page-transactionList" v-loading="!dataReady">
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
      <el-table-column prop="customerId" label="用户ID"></el-table-column>
      <el-table-column prop="amount" label="额度(vpp)"></el-table-column>
      <el-table-column prop="balance" label="余额(vpp)"></el-table-column>
      <el-table-column label="流水类型" width="120">
        <template slot-scope="scope">
          {{parseType(scope.row.amountType)}}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="备注"></el-table-column>
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
        pageSize:100,
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
      this.$http('getTrasactionList', { 
        params:{ pageSize, currentPage } 
      })
      .then(resp=>{
        this.dataReady = true
        if ( resp.state !== 1 ) return;
        console.log( resp )
        console.log( resp.data.rows[0].amount )
        this.tableData = { ...resp.data };
      })
      .catch(err=>{ this.dataReady = true })
    },
    searchByCustomerId() {
      this.dataReady = false
      let { pageSize,currentPage} = this.tableData
      let { customerId } = this.searchData
      this.$http('getTrasactionList', { 
        params:{ pageSize, currentPage, customerId } 
      })
      .then(resp=>{
        this.dataReady = true
        if ( resp.state !== 1 ) return;
        console.log( resp )
        console.log( resp.data.rows[0].amount )
        this.tableData = { ...resp.data };
      })
      .catch(err=>{ this.dataReady = true })
    },
    parseType(t) {
      // console.log(t)
      // return 1;
      let text = '';
      switch(t) {
        case 1: text='充值'; break;
        case 2: text='提现'; break;
        case 3: text='产品支付'; break;
        case 4: text='产品赔付'; break;
        case 5: text='邀请赠送'; break;
        case 6: text='注册用户赠送'; break;
        case 7: text='提现拒绝'; break;
        case 8: text='打款失败'; break;
        case 9: text='收入'; break;
        case 10: text='支出'; break;
        default: text='未知:'+t;
      }
      return text;
    }
  },
  mounted() {
    this.loadTableData();
  }
}
</script>

