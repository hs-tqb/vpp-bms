import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.fetch() 的 Polyfill
// require('whatwg-fetch')

const store = () => new Vuex.Store({
  state: {
    isSidebarCollapsed: false,
    showLoginDialog: 0,
  },

  mutations: {
    setSidebarCollapseState (state, flag) {
      state.isSidebarCollapsed = flag;
    },
    toggleLoginDialog(state) {
      if(state.showLoginDialog === 1){
        state.showLoginDialog = 2
      } else{
        state.showLoginDialog = 1
      }
    },
    setLoginDialog(state, setData) {
      state.showLoginDialog = setData.isShow
    }
  },

  actions: {
    // ...
  }

})

export default store
