<template>
    <div class="updatePassword">
        <base-nav title="修改密码"></base-nav>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="formData.oldPassword"
                    name="原始密码"
                    placeholder="请输入原始密码"
                    :rules="[{ required: true}]"
                >
                    <template #left-icon>
                        <img class="one" src="../../assets/images/wjmm_img_02.png" alt="">
                    </template>
                </van-field>
                <van-field
                    v-model="formData.new"
                    type="password"
                    name="密码"
                    placeholder="请输入新密码"
                    :rules="[{ required: true }]"
                >
                    <template #left-icon>
                        <img class="two" src="../../assets/images/wjmm_img_03.png" alt="">
                    </template>
                </van-field>
                <van-field
                    v-model="formData.newPassword"
                    type="password"
                    name="密码"
                    placeholder="请再次输入新密码"
                    :rules="[{ required: true }]"
                >
                    <template #left-icon>
                        <img class="three" src="../../assets/images/wjmm_img_04.png" alt="">
                    </template>
                </van-field>
                <div class="btn" style="margin: 16px;">
                    <van-button  block type="info" native-type="submit">
                    提交
                    </van-button>
                </div>
            </van-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData:{
                account:this.$store.state.userInfo.accountnum,
                oldPassword:'',
                newPassword:'',
                new:'',
            }
        }
    },
    methods:{
        onSubmit(){
            if(this.formData.new !== this.formData.newPassword){
                this.$toast('两次密码输入不一致')
                return
            }
            this.$axios.post(this.$api.ChangePassword,this.formData).then(res=>{
                console.log("修改密码",res)
                if(res.result.success){
                    this.$toast('修改密码成功,请重新登录')
                    localStorage.clear();
                    this.$router.push({
                        name:'login'
                    })
                }else{
                    this.$toast(res.result.failCause)
                }
            })
        }
    }
}
</script>

<style lang="less">
    .updatePassword{
        .van-form{
            .van-field__left-icon{
                margin-right: 10px;
                .one{
                    width: 12px;
                }
                .two{
                    width: 14px;
                }
                .three{
                    width: 18px;
                }
            }

            .btn{
                position: fixed;
                bottom: 0;
                width: 96%;
            }
        }
    }
</style>