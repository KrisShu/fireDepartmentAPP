<template>
  <div class="base-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据啦"
            @load="onLoad"
        >
            <slot>
                <van-cell-group>
                    <van-cell v-for="(item, index) in tableList" :key="index">
                        <slot name="content" :item="item"></slot>
                    </van-cell>
                </van-cell-group>
            </slot>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>

export default {
    props: {
        tableList: {
            type: Array,
            default() {
                return [];
            }
        },
    },
    data(){
        return{
            // isRefresh:true,
            // isLoading:false,
            // loading:false,
            // finished:false,
            loading: false,
            finished: false,
            refreshing: false,

        }
    },
    methods:{
        //刷新数据
        onRefresh(){
            let that = this;
            this.loading = true;
            this.finished = false;
            this.$emit("onRefresh", function success( size,total = 5, page = {}) {
                page.SkipCount = size;
                that.loading = false;
                if (size >= total ) {
                    that.finished = true;
                }
            });
        },
        //加载数据
        onLoad(){
            let that = this;
            this.$emit("onLoad", function success(size, total = 5, page = {}) {
                page.SkipCount = size;
                that.loading = false;
                if (size >= total ) {
                    that.finished = true;
                }
            });
        }
    }
}
</script>

<style lang="less">
    .van-cell-group{
        padding: 0 4px;
        .van-cell{
            border: 1px solid rgb(236, 236, 236);
            border-radius: 8px;
            margin: 4px 0px;
        }
    }
</style>
