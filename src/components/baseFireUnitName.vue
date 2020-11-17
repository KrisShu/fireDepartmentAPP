<template>
    <div class="fireUnitNameBox">
        <el-autocomplete
            clearable
            v-model="value"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入防火单位名称进行查询"
            @select="handleSelect"
        >
        </el-autocomplete>
    </div>
    
</template>

<script>
export default {
    props:{
        fireUnitName:{
            type:String,
            default:''
        }
    },
    watch:{
        fireUnitName(val,old){
            this.value = val
        }   
    },
    data(){
        return{
            value:this.fireUnitName,
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
        inputchange(item){
            console.log("inputchange",item)
            this.$emit('update:fireUnitName', item)
        },
        handleSelect(item){
            this.$emit('update:fireUnitName', this.fireUnitName)
            this.$emit('getfireUnitId',item.id)
        },
    }
}
</script>

<style lang="less">
    .fireUnitNameBox{
        padding: 0 10px;
        .el-autocomplete{
            width: 100%;
            border-bottom: 1px solid rgb(250, 250, 250);
            .el-input__inner{
                border: none;
            }
        }
    }
</style>