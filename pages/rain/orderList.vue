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
      <el-table-column prop="innerOrderId" label="订单号"></el-table-column>
      <el-table-column prop="title" label="标题" width="120"></el-table-column>
      <el-table-column prop="gmtCreate" label="购买时间"></el-table-column>
      <el-table-column prop="content" label="触发标准" width="140"></el-table-column>
      <el-table-column prop="amount" label="支付" width="80"></el-table-column>
      <el-table-column prop="payout" label="赔付" width="80"></el-table-column>
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
      this.$http('getRainOrderList', { 
        params:{ pageSize, currentPage } 
      })
      .then(resp=>{
        this.dataReady = true
        if ( resp.state !== 1 ) return;

        let rows = resp.data.rows.map((item,temp)=>{
          temp = item.amount.split('-');
          item.title  = item.title.replace(/(\d)/,' $1');
          item.amount = temp[0]
          item.payout = temp[1]
          return item;
        });

        this.tableData = { ...resp.data, rows };
      })
      .catch(err=>{ this.dataReady = true })
    }
  },
  mounted() {
    this.loadTableData();
  }
}
</script>

