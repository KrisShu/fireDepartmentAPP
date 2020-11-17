<template>
    <div class="screenBox">
        <div @click="screen(item.text)" class="screenBtn" :class="item.color" v-for="(item,index) in screenbtnArr" :key="index">
            <van-icon v-if="screenSign == item.text" name="star-o" />
            <div class="text_num">
                <p>{{item.text}}</p>
                <p>{{item.num}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        screenbtnArr:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    data(){
        return{
            screenSign:'全部'
        }
    },
    methods:{
        screen(text){
            this.screenSign = text;
            this.$emit('screen',text)
        }
    }
}
</script>

<style lang="less">
    .screenBox{
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      .screenBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        // background: wheat;
        padding: 6px;
        min-width: 0;
        border-radius: 6px;
        color: white;
        &.lightblue{
          background: rgb(40, 168, 253);
        }
        &.green{
          background: rgb(83, 200, 83);
        }
        &.yellow{
          background: rgb(236, 203, 57);
        }
        &.orange{
          background: rgb(247, 152, 75);
        }
        &.Olivegreen{
          background: rgb(158, 158, 44);
        }
        &.gary{
          background: rgb(197, 197, 197);
        }
        .van-icon{
            margin-right: 6px;
        }
        .text_num{
          text-align: center;
        }
      }
    }
</style>