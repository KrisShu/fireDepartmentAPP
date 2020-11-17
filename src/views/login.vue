<template>
  <div class="login">
      <!--    头部title-->
      <base-nav title="登录" :show-left="false"></base-nav>
      <!--  主体  -->
      <div class="login-main">
        <div class="login-main-logo">
            <img class="logo_img" src="../assets/images/logo1.png" alt="">
            <div class="login_tip">
                <p>智慧消防</p>
                <p>辖区监管端</p>
            </div>
        </div>
        <!-- form表单 -->
        <van-cell-group>
            <van-field v-model="loginForm.account" clearable  placeholder="请输入手机号码">
                <img class="left-icon" slot="left-icon" src="../assets/images/load_img_02.png" alt="">
            </van-field>
            <van-field v-model="loginForm.password" clearable type="password"  placeholder="请输入密码">
                <img class="left-icon2" slot="left-icon" src="../assets/images/load_img_03.png" alt="">
            </van-field>
        </van-cell-group>
        <div class="login-main-pass">
          <van-checkbox v-model="loginForm.isPersistent">自动登录</van-checkbox>
        </div>
        <div class="login-main-btn">
          <van-button type="info" @click="login" size="large">登录</van-button>
        </div>
        
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loginForm:{
        account: "",
        password: "",
        isPersistent: true,
      },
       area:'',
       timeOut:'',
    }
  },
  created(){},
  mounted(){},
  methods:{
      //模糊查询区域
      querySearchAsync(queryString, callback){
          let result =[];
          if(!queryString){
            return
          }
          this.$axios.get(this.$api.GetAreasByName,{params:{areaName:queryString}}).then(res=>{
            for(let item of  res.result) {
              result.push({
                value:item.areaName,
                id:item.areaId
              })
            }
            clearTimeout(this.timeout);
            this.timeOut = setTimeout(()=>{
              callback(result)
            })
          })
      },
    //登录
    login(){
      let f = this.loginForm;
      if(!f.account || !f.password){
        this.$toast("请输入账号密码和区域！");
        return;
      }
      this.$axios.post(this.$api.LoginForMobile,f).then(res=>{
        console.log("登录成功",res)
        if(res.result.success){//登录成功
          let r = res.result;
          r.accountnum = f.account;
          localStorage.setItem('changeLogin',1);
          localStorage.setItem("setUserInfo", JSON.stringify(r));
          this.$store.commit("setUserInfo", r);
          this.$router.push({
            name:"unit"
          })
        }else{
          this.$toast(res.result.failCause)
        }
      }).catch(err=>{
        // console.log("登录失败",err)
        this.$toast(err.error.message)
      })
     
    }
  }
}
</script>

<style lang="less">
@maincolor:#0385FD;
  .login{
    &-main{
      margin-top: 40px;
      .login-main-logo{
        display: flex;
        align-items: center;
        justify-content: center;
        .logo_img{
          width: 90px;

        }
      }
      .login_tip{
        font-size: 30px;
        line-height: 1.2;
        color: black;
        font-family: 'lishu';
        margin-left: 6px;
      }
      .van-cell-group{
        margin-top: 50px;
        
        .van-cell{
          border: none !important;
        }
        input{
            font-size: 14px;
            height: 30px;
        }
        .van-field__left-icon{
          display: flex;
          align-items: center;
        }
        .left-icon{
            width: 14px;
        }
        .left-icon2{
            width: 16px;
        }
        .location_icon{
          width: 20px;
        }
        .el-input{
            input{
                border:none;
                padding: 0;
                padding-left: 6px;
            }
        }
      }
      .login-main-pass{
        padding: 20px;
        .van-checkbox__icon--checked .van-icon{
          background-color: @maincolor;
          border-color:@maincolor;
        }
      }
      .login-main-btn{
        margin-top: 20px;
        padding: 20px;
        
        .van-button--info{
          background: @maincolor;
        }
      }
    }
  }
</style>