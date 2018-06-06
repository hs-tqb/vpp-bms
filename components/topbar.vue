<style lang="less" scoped>
  .fl { height:100%; float:left; }
  .fr { height:100%; float:right; }
  #topbar { 
    background:#373d41;
    button { margin:0; height:100%; border:0 none; background:transparent; }
    .avatar {
      position: relative; color:#fff;
      i { 
        display:inline-block; vertical-align:middle;
        width:26px; height:26px; 
        // background:url('~/static/img/logo.png') no-repeat center; 
        border-radius:50%;
      }
    }
    #dialog-login {
      background:transparent;
      .inner-wrapper {
        position:relative;
        .close { 
          position:absolute; right:8px; top:8px; 
          width:12px; height:12px; border-radius:6px; 
          background:pink; cursor:pointer;
          transition-duration:400ms;
          &:hover { background:#f56c6c; }
        }
        padding:20px; width:400px; 
        background:#fff;
        border-radius:7px;
        box-shadow:0 2px 7px 3px #ddd;
        input { 
          display:block; 
          margin:20px 0; padding:0 10px; width:calc(400px - 40px - 2px); 
          line-height:3;
          border:1px solid #ddd;
          border-radius:4px;
        }
        input[type=button] { cursor:pointer; }
      }
    }
  }
</style>

<template>
  <div id="topbar">
    <div class="fl">
      <el-button @click="toggleSidebarCollapse">
        <i :class="`el-icon-d-arrow-${isSidebarCollapsed?'right':'left'}`"></i>
      </el-button>
    </div>
    <div class="fr">
      <!-- <el-button>
        <el-badge value="10" class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
      </el-button> -->
      <el-button class="avatar" @click="toggleLoginState">
        <i></i> {{hasToken?'注销':'登录'}}
      </el-button>
    </div>
    <div id="dialog-login" class="dialog-container" :class="showLoginDialog?'show':''">
      <div class="inner-wrapper">
        <i class="close" @click="close"></i>
        <input type="text" v-model="loginDialog.userName" placeholder="用户名">
        <input type="text" v-model="loginDialog.password" placeholder="密码">
        <input type="button" class="bg-primary" value="登录" @click="login">
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// import store from '~/store/index.js'

export default {
  data() {
    return {
      loginDialog: {
        userName:'',
        password:'',
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    hasToken() {
      return !!this.$util.getToken()
    },
    isSidebarCollapsed() {
      return this.$store.state.isSidebarCollapsed
    },
    showLoginDialog() {
      return this.$store.state.showLoginDialog
    }
  },
  methods: {
    toggleSidebarCollapse(e) {
      this.$store.commit('setSidebarCollapseState', !this.isSidebarCollapsed);
    },
    close() {
      console.log(this.loginDialog)
      // this.loginDialog.show = !this.loginDialog.show;
      this.$store.commit('toggleLoginDialog')
    },
    toggleLoginState() {
      // this.loginDialog.show = this.hasToken
      if ( this.hasToken ) {
        this.$util.setToken('');
        location.reload();
      } else {
        // this.loginDialog.show = true
        this.$store.commit('toggleLoginDialog')
      }
    },
    login() {
      let { userName, password } = this.loginDialog;
      if ( !userName || !password ) {
        this.$message.closeAll();
        return this.$message.error('用户名和密码不能为空');
      }

      console.log( this.$util.getToken() )
      this.$http.get('login', {params:{ username:userName,password }})
      .then(resp=>{
        if ( resp.state === 0 ) return;
        this.$util.setToken(resp.data.token)
        // this.loginDialog.show = false;
        this.$store.commit('toggleLoginDialog')
        location.reload();
      })
    }
  }
}
</script>
