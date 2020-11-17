<template>
    <div class="topSearhAdd display">
        <div class="display"> 
            <van-search v-model="value" placeholder="请输入防火单位名称" />
            <van-button @click="search" type="info" size="small">查询</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value:'',
        }
    },
    methods:{
        search(){
            this.$emit('search',this.value)
        }

    }
}
</script>

<style lang="less">
    .topSearhAdd{
        padding-right: 6px;
        .van-search{
            width: 80%;
        }
        .van-button--small{
            min-width: 0%;
            width: 54px;
        }
    }
    .display{
        display: flex;
        align-items: center;
        &:nth-of-type(1){
            flex: 2 0 auto;
        }
    }
</style>