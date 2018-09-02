<style lang="less">
@barHeight: 50px;
// @barHeight: 0;
.text-info    { color:#909399; }
.text-warning { color:#E6A23C; }
.text-primary { color:#409EFF; }
.text-success { color:#67c23a; }
.text-failure { color:#f56c6c; }
.bg-primary { background:#409eff; color:#fff; }

.el-message { z-index: 20001!important; }
.el-table {
  text-align:center;
  th { text-align:inherit; }
}
.el-pagination { padding:20px 0; text-align:center; }

.dialog-container { 
  position:fixed; top:0; left:0; z-index:20000; width:100vw; height:100vh; 
  display:flex; justify-content:center; align-items:center;
  background-color: rgba(0,0,0,.7);
  transition-duration:300ms;
  pointer-events:none; opacity:0;
  &.show { pointer-events:auto; opacity:1; }
}
.ellipsis {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
#__default {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow:hidden;
  #layout-right {
    flex: 1;
    height: 100vh;
    overflow: hidden;
    //background: #f5f5f5;
    #topbar,
    #footbar {
      height: @barHeight;
    }
    #layout-main {
      @padding:15px;
      padding:@padding; 
      height: calc(~"100vh" - @barHeight);
      background-color:#fdfdfd;
      // flex:1;
      overflow: auto;
      .page-container {
        // border-left:@padding solid #fdfdfd;
        // border-right:@padding solid #fdfdfd;
        min-height:calc(~"100vh" - @barHeight - @padding * 2);
        // background-color:#f0f0f0;
      }
      .panel {
        padding:@padding;
        &:not(:last-child) { border-bottom:1px solid #e5e5e5; }
        &.left { border-left:1px solid #e5e5e5; }
        &.right { border-right:1px solid #e5e5e5; }
      }
    }
  }
}
</style>

<template>
  <div>
    <div id="loginDialog" v-if="$store.state.showLoginDialog === 1">
      <login/>
    </div>
    <div id="__default" class="page-root" :data-page="$route.name" v-else-if="$store.state.showLoginDialog === 2">
        <div id="layout-left">
          <sidebar/>
        </div>
        <div id="layout-right">
          <topbar/> 
          <div id="layout-main">
            <nuxt class="page-container"/>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from "~/plugins/axios";
import util from "~/util";
Vue.prototype.$http = axios
Vue.prototype.$util = util

import sidebar from "~/components/sidebar.vue";
import topbar from "~/components/topbar.vue";
import footbar from "~/components/footbar.vue";
import login from "~/components/login.vue"

export default {
  components: {
    sidebar,
    topbar,
    footbar,
    login
  },
  mounted() {
    if(!!util.getToken()) {
      this.$store.commit('setLoginDialog',{isShow: 2})
    }else {
      this.$store.commit('setLoginDialog',{isShow: 1})
    }
  }
};
</script>
