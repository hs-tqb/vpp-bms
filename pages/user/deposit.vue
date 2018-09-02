<style lang="less">
  .el-table {
    tbody tr:odd { background-color:#fafafa; }
  }
  .manually-box { 
    position: absolute; width: 100%; height: 100%; z-index: 2000; background: rgba(250,250,250,.7);
    
  }
  #manually { 
    display:flex; margin:15px 0; width: 300px; flex-direction: column; height: 200px; width: 320px; padding: 15px 20px; border: 1px solid #dddddd; border-radius: 5px;
    .el-input { margin:10px 0; width: 280px; height: 40px; }
    #withdrawBtn { width: 120px; margin:0 auto; }
    .close { 
      position:absolute; right:8px; top:8px; 
      width:12px; height:12px; border-radius:6px; 
      background:pink; cursor:pointer;
      transition-duration:400ms;
      &:hover { background:#f56c6c; }
    }
  }
  #search {
    display:flex; margin:15px 0; width: 100%;
    .el-input { margin-right:10px; }
    #withdrawBtn { position: absolute; left: 300px; }
  }
  #page-customer-depositList {
    position: relative;
  }
  #manually {
    position: absolute;
    background: #fafafa;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 2001;
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
    
    <div class="manually-box" v-show="isShow">
      <div id="manually" >
        <i class="close" @click="close"></i>
        <el-input placeholder="手机号" v-model="manual.mobile" type="tel"></el-input>
        <el-input placeholder="金额" v-model="manual.amount" type="number" min=1></el-input>
        <el-button type="primary" id="withdrawBtn" @click="doWithdrawByManually">确定</el-button>
      </div>
    </div>
    <div id="search">
      <el-input placeholder="客户ID" v-model="searchData.customerId" type="number"></el-input>
      <el-button type="primary" @click="searchByCustomerId">查找</el-button>
      <el-button type="primary" id="withdrawBtn" @click="showWithdraw">手动充值</el-button>
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
      },
      manual: {
        mobile:'',
        amount:''
      },
      isShow: false
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    showWithdraw() {  
      this.isShow = true
    },
    doWithdrawByManually() {
      let { mobile,amount,text } = this.manual
      if ( !mobile ) {
      //   text = '手机号不能为空'
      // } else if ( !/^((\+|0{1,2})\d{2,4} *)?1[3456789]\d{9}$/.test(mobile) ) {
      //   text = '手机号码错误'
      } else if ( +amount<=0 ) {
        text = '金额必须大于0'
      }
      if ( text ) {
        this.$message.closeAll()
        this.$message.error(text)
        return;
      }
      this.$http.get('doRemit', {params:{mobile,amount}})
      .then(resp=>{
        if ( resp.state!==1 ) return;
        this.isShow = false
        this.$message.success('打款成功')
      })
    },
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

