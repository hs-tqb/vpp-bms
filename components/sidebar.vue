<style lang="less">
@bg: #333744;
@cl: #ccc;
@hoverBg: skyblue;
@hoverCl: #fff;
@activeBg: skyblue;
@activeCl: #fff;
// @logoSize:48px;

#sidebar {
  height: 100%;
  .el-menu-vertical-demo {
    height: 100%;
    border: 0 none;
    color: @cl;
    background: @bg;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
    .el-submenu__title,
    .el-menu-item {
      height:50px; line-height:50px; color: @cl;
      background: @bg;
      &.is-active {
        color: @activeCl;
        background: @activeBg;
      }
      &:focus,
      &:hover {
        background: @hoverBg;
        color: @hoverCl;
      }
      i {
        color: inherit;
      }
    }
    .el-menu-item-group__title {
      display: none;
    }
  }
}
</style>

<template>
  <div id="sidebar">
    <el-menu 
      :router="true"
      class="el-menu-vertical-demo" 
      :collapse="isSidebarCollapsed"
      :default-active="computedActived.item"
      :default-openeds="computedActived.list"
    >
      <template v-for="(item,i) in navs">
        <!-- 导航组 -->
        <el-submenu
          v-if="item.children && item.children.length"
          :key="`nav-${i}`"
          :index="`${i+1}`"
        >
          <template slot="title" @click="navTo(item.url)">
            <!-- {{item.link.indexOf($router.path)===0}} -->
            {{$router.path}}
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item 
              v-for="(sItem,j) in item.children" 
              :key="`nav-${i}-${j}`" 
              :index="sItem.url"
              :class="$route.path===sItem.url?'is-active':''"
            >
              <i :class="`el-icon-${sItem.icon}`"></i>
              <span slot="title">{{sItem.name}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 导航 -->
        <el-menu-item 
          v-else
          :key="`nav-${i}`"
          :index="item.url"
          :class="$route.path===item.url?'is-active':''"
          @click="navTo(item.url)"
        >
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>


<script>
// import axios from "~/plugins/axios";
import navs from '~/options/navs'
export default {
  data() {
    return {
      navs: navs
    };
  },
  computed: {
    isSidebarCollapsed() {
      return this.$store.state.isSidebarCollapsed;
    },
    computedActived() {
      let config = {list:[], item:''}, idx = [], path = this.$route.path;

      navs.forEach((n,i)=>{
        // 取当前item
        n.url===path? 
          config.item=String(i):
          Array.isArray(n.children) && 
          n.children.length && 
          n.children.some((s,j)=>{
            return s.url===path && ( config.item=`${i}-${j}`, true );
          }) && !n.opened && ( config.list.push(String(i+1)) );

        // 取带opened配置的列表
        n.opened && config.list.push(String(i+1));
      })
      // return { list:['1'], item:'0' }
      return config;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navTo(link) {
      console.log(link);
    },
    loadData() {
      // let opt = {};
      // // 获取导航列表
      // this.$http("sellerCity/getResource", {
      //   params: opt
      // })
      // .then(resp => {          
      //   this.navs = resp.data.data;
      //   console.log('+++++++++++++++++++++++++++');
      //   console.log(resp.data.data);
      //   console.log('+++++++++++++++++++++++++++');
      // });


      // this.$http("http://192.168.1.170:8008/payout/statisticalList", {
      //   params:opt
      // })
      // .then(resp=>{
      //   console.log('__________________');
      //   console.log(resp)
      //   console.log('__________________');
      // })
      // ;

      // Promise.all([
      //   this.$http('sellerCity/getResource', {params: opt}),
      //   this.$http('sellerCity/getResource', {params: opt})
      // ])
      // .then(resps=>{
      //   console.log( resp[0] );
      //   console.log( resp[1] );
      // })
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
