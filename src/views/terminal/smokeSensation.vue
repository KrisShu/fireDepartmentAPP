<template>
  <div class="smokeSensation">
    <top-searh-add @search="search" ></top-searh-add>
    <base-screen :screenbtnArr="screenbtnArr" @screen="screen"></base-screen>
    <base-list
      :tableList="tableList"
      ref="baseList"
      @onLoad="getList"
      @onRefresh="getList_refresh"
    >
        <div class="slot_content " slot-scope="scope" slot="content">
            <p> <span>防火单位：</span>{{scope.item.fireUnitName}}</p>
            <p> <span>设施编号：</span>{{scope.item.detectorSn}}</p>
            <p> <span>设施状态：</span>
                <span class="orange" v-if="scope.item.state == 2">故障</span>
                <span class="green" v-if="scope.item.state == 1">正常</span>
                <span class="gary" v-if="scope.item.state == -1">离线</span>
            </p>
            <p> <span>安装位置：</span>{{scope.item.location}}</p>
            <p> <span>电量：</span>{{scope.item.powerNum}}</p>
        </div>
    </base-list>
  </div>
</template>

<script>
export default {
    data(){
        return{
            screenSign:'全部',
            screenbtnArr:[
                {
                    text:'全部',
                    color:'lightblue'
                },
                {
                    text:'正常',
                    color:'green',
                    num:0
                },
                {
                    text:'故障',
                    color:'orange',
                    num:0
                },
                {
                    text:'离线',
                    color:'gary',
                    num:0
                }
            ],
            page:{
                AreaId:this.$store.state.userInfo.areaId,
                FireUnitName:'',
                DeviceState:'',
            },
            tableList:[],
        }
    },
    created(){
        this.GetAreaIndependentDetectorStateNum();
    },
    methods:{
        search(text){
            this.page.FireUnitName = text;
            this.GetAreaIndependentDetectorStateNum();
            this.getList();
        },
       
        //状态筛选
        screen(text){
            this.page.DeviceState = text;
            this.getList();
        },
        //获取
        GetAreaIndependentDetectorStateNum(){
            this.$axios.get(this.$api.GetAreaIndependentDetectorStateNum,{params:this.page}).then(res=>{
                console.log("GetAreaIndependentDetectorStateNum",res);
                this.screenbtnArr[1].num = res.result[0].value
                this.screenbtnArr[2].num = res.result[1].value
                this.screenbtnArr[3].num = res.result[2].value
            })
        },
        getList(success){
            let x = arguments[0] instanceof Object;
            let p = this.page;
            if (!x) {
                p.SkipCount = 0;
                this.tableList = [];
                this.$refs.baseList.loading = true
                this.$refs.baseList.finished = false
            }
            this.$axios.get(this.$api.GetAreaIndependentDetectorList, { params: p}).then(res=>{
                console.log("列表",res)
                if (res.result.items.length > 0) {
                    this.tableList = this.tableList.concat(res.result.items);
                }
                x ? success(this.tableList.length, res.result.totalCount, p) : this.changelist(this.tableList.length, res.result.totalCount, p);
            })
        },
        changelist(size, total = 5, page = {}){
            page.SkipCount = size;
            this.$refs.baseList.loading = false;
            if (size >= total ) {
                this.$refs.baseList.finished = true;
            }
        },
        getList_refresh(success){
            let p = this.page;
            if (this.$refs.baseList.refreshing) {
                this.page.SkipCount = 0
                this.tableList = [];
                this.$refs.baseList.refreshing = false;
            }
            this.$axios.get(this.$api.GetAreaIndependentDetectorList, { params: p}).then(res=>{
                console.log("列表",res)
                if (res.result.items.length > 0) {
                    this.tableList = this.tableList.concat(res.result.items);
                }
                success(this.tableList.length, res.result.totalCount, p)
            })
        },
    }
}
</script>

<style lang="less">
    .smokeSensation{
      .screenBtn{
        width: 60px;
      }
      .slot_content{
        padding:  0;
        .display{
          display: flex; 
          align-items: flex-start;
        }
        p{
          line-height: 2;
          span{
            text-align: right;
            display: inline-block;
            width: 70px;
            font-weight: bold;
            &.green{
              width: auto;
              color: rgb(83, 200, 83);
            }
         
            &.orange{
              width: auto;
              color: rgb(247, 152, 75);
            }
            &.gary{
              width: auto;
              color: rgb(197, 197, 197);
            }
          }
        }
        .slot_content_div{
          p{
            span{
              width:auto;
              text-align: left;
            }
          }
        }
    
        .btns{
          display: flex;
          justify-content: space-around;
          margin-top: 10px;
            .van-button{
                width:150px;
            }
        }
      }
    }
</style>