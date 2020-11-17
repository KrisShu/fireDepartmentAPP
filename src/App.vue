<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted(){
    localStorage.setItem('version','消防监管1.0')
  }
}
</script>
<style lang="less">

</style>
