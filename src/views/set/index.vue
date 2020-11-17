<template>
  <div class="set">
      
      <van-cell @click="goUpdate" title="修改密码" is-link >
          <template #icon>
            <img  class="left_icon" src="../../assets/images/site_img_03.png" alt="">
          </template>
      </van-cell>
      <van-cell   @click="update_system" title="系统更新" is-link >
          <template #icon>
            <img  class="left_icon" src="../../assets/images/update.png" alt="">
          </template>
          <template v-if="dotshow" #default>
            <img class="dot_iocn" src="../../assets/images/dot.png" alt="">
          </template>
      </van-cell>
      <van-cell  @click="logout" title="注销登录" is-link >
          <template #icon>
            <img  class="left_icon" src="../../assets/images/site_img_05.png" alt="">
          </template>
      </van-cell>
     
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  data(){
    return{
      dotshow:false
    }
  },
  created(){
    this.checkVersion();
  },
  methods:{
    goUpdate(){
      this.$router.push({
        name:'updatePassword'
      })
    },
    //注销登录
    logout(){
      Dialog.confirm({
        title: '注销登录',
        message: '确定注销登录吗？',
      }).then(() => {
          this.$axios.post(this.$api.UserLogout).then(res=>{
            console.log("注销登录",res)
            localStorage.clear();
            this.$router.push({
              name:'login'
            })
          })
          
      })
        .catch(() => {
          // on cancel
        });
    },
    //更新系统
    update_system(){
      this.$router.push({
        name:'updateSystem'
      })
    },
    checkVersion(){
        this.$axios.get(this.$api.GetNewestVersion,{params:{AppType:3}}).then(res=>{
            console.log("res",res)
            let version =  localStorage.getItem('version');
            if(version !== res.result.versionNo){
              this.dotshow = true
            }
        })
    },
  }
}
</script>

<style lang="less">
  .set{
    .left_icon{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .dot_iocn{
      width: 14px;
    }
  }
</style>