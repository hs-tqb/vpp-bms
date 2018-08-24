<style lang="less">
  #comp-login {
    background: #fff;
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
</style>

<template>
  <div id="comp-login" class="dialog-container" :class="showLoginDialog?'show':''">
    
      <div class="inner-wrapper" >
        <!-- <i class="close" @click="close"></i> -->
        <input type="text" v-model="loginDialog.userName" placeholder="用户名">
        <input type="text" v-model="loginDialog.password" placeholder="密码">
        <input type="button" class="bg-primary" value="登录" @click="login">
      </div>
    
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data() {
    return {
      loginDialog: {
        userName:'',
        password:'',
      },
    }
  },
  computed: {
    showLoginDialog() {
      return (this.$store.state.showLoginDialog === 1)
    }
  },
  methods: {
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
        // location.reload();
      })
    }
  }
}
</script>
