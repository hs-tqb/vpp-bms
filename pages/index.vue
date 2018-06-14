<style lang="less">
  #page-home { 
    #test {
      width:3000px;
      height:3000px;
      background:#ddd;
    }
  }
</style>

<template>
  <div id="page-home">
    sdfsdf
    <div id="test" style="width:3000px;">123123</div>
  </div>
</template>

<script>

export default {
  asyncData(ctx) {
    ctx.redirect('/transactionList');
  },
  data () {
    return {
      
    }
  },
  created() {
  },
  mounted () {
    this.$http.get('https://api.huobipro.com/market/detail/merged', {params:{symbol:'ethusdt'}})
    .then(resp=>{
      console.log('___________________')
      console.log( resp );
      console.log('___________________')
    })
  }
}
</script>

