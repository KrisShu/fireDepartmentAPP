<template>
  <div class="home">
    <van-sticky>
      <div class="topNav">
          <div class="left">
            <img class="name_icon" src="../assets/images/ssgz_img_01.png" alt="">
            <span>{{$store.state.userInfo.name}}</span>
          </div>
          <p class="right_text">{{$store.state.userInfo.areaName}}</p>
      </div>
    </van-sticky>
    <router-view></router-view>
    <van-tabbar v-model="active" >
      <van-tabbar-item
        v-for="(item,index) in tabBars"
        :key="index"
        replace
        :to="item.router"
      >
        <span>{{ item.label }}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.inactive"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
   
  },
  data(){
    return{
      active:0,
      tabBars:[
        {
          label:"防火单位",
          active:require("../assets/images/unit1.png"),
          inactive:require("../assets/images/unit2.png"),
          router:'unit'

        },
         {
          label:"物联终端",
          active:require("../assets/images/zhongduan1.png"),
          inactive:require("../assets/images/zhongduan2.png"),
          router:'terminal'
        },
        {
          label:"系统设置",
          active:require("../assets/images/set1.png"),
          inactive:require("../assets/images/set2.png"),
          router:'set'
        }
      ]
    }
  },
  watch:{
      '$route'(to){
          this.active=to.meta.active
      }
  },
  created(){
    this.active = this.$route.meta.active;
  }
}
</script>

<style lang="less">
  .home{
    .topNav{
      height: 46px; 
      background: #0385fe;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 10px;
      color: white;
      .left{
        color: white;
        display: flex;
        align-items:flex-end;
        .name_icon{
          width: 18px;
        }
        span{
          font-size: 14px;
          margin-left: 6px;
        }
       
      }
      .right_text{
        font-size: 14px;
      }
    }
  }
</style>
