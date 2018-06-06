import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.fetch() 的 Polyfill
// require('whatwg-fetch')

const store = () => new Vuex.Store({
  state: {
    isSidebarCollapsed: false,
    showLoginDialog:false,
  },

  mutations: {
    setSidebarCollapseState (state, flag) {
      state.isSidebarCollapsed = flag;
    },
    toggleLoginDialog(state) {
      state.showLoginDialog = !state.showLoginDialog;
    }
  },

  actions: {
    // ...
  }

})

export default store
