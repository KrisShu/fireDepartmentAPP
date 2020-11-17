<template>
    <div class="topSearhAdd display">
        <div class="display"> 
            <el-autocomplete
            clearable
            v-model="value"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入防火单位名称进行查询"
            @select="handleSelect"
            >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
            <van-button @click="search" type="info" size="small">查询</van-button>
        </div>
        <van-button @click="add" type="primary" size="small">新增</van-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value:'',
            timeOut:''
        }
    },
    methods:{
        querySearchAsync(queryString, callback){
            if(!queryString){
                return
            }
            let result =[];
            this.$axios.get(this.$api.GetFireUnitListByArea,
                {params:{FireUnitName:queryString,AreaId:this.$store.state.userInfo.areaId}}
            ).then(res=>{
                // console.log("qqqq",res)
                for(let item of  res.result.items) {
                result.push({
                    value:item.fireUnitName,
                    id:item.fireUnitId
                })
                }
                clearTimeout(this.timeout);
                this.timeOut = setTimeout(()=>{
                callback(result)
                })
            })
        },
        handleSelect(){

        },
        search(){
            this.$emit('search',this.value)
        },
        add(){
            this.$emit('add')
        }

    }
}
</script>

<style lang="less">
    .topSearhAdd{
        padding-right: 6px;
        .el-autocomplete{
            padding: 6px;
            width: 78%;
            .el-input__inner{
                border:none;
                background: #F7F8FA;
            }
        }
        .van-button--small{
            min-width: 0%;
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