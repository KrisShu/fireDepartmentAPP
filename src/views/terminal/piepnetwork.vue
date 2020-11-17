<template>
  <div class="piepnetwork">
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
        <p> <span>设施编号：</span>{{scope.item.deviceSN}}</p>
        <p> <span>设施状态：</span>
            <span class="green" v-if="scope.item.state == 2">良好</span>
            <span class="gary" v-if="scope.item.state == -1">离线</span>
            <span class="orange" v-if="scope.item.state == -2">超限</span>
        </p>
        <p> <span>安装位置：</span>{{scope.item.location}}</p>
        <p> <span>监控类型：</span>{{scope.item.monitorType == 1 ?'液位':'水压' }} </p>
        <p> <span>当前数值：</span>{{scope.item.currentValue}}</p>
      </div>
    
    </base-list>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  data(){
    return{
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
          text:'超限',
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
      tableList:[]
    }
  },
  created(){
    this.GetAreaWaterDeviceStateNum();
  },
  methods:{
    search(text){
      this.page.FireUnitName = text;
      this.GetAreaWaterDeviceStateNum();
      this.getList();

    },  
    screen(text){
      this.page.DeviceState = text;
      this.getList();
    },
    //获取状态数量
    GetAreaWaterDeviceStateNum(){
      this.$axios.get(this.$api.GetAreaWaterDeviceStateNum,{params:this.page}).then(res=>{
        console.log("GetAreaWaterDeviceStateNum",res);
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
      this.$axios.get(this.$api.GetAreaWaterDeviceList, { params: p}).then(res=>{
          console.log("列表",res)
          if (res.result.items.length > 0) {
            this.tableList = this.tableList.concat(res.result.items);
          }
          x ? success(this.tableList.length, res.result.totalCount, p) : this.changelist(this.tableList.length, res.result.totalCount, p);
      })
    },
    //刷新列表
    getList_refresh(success){
      let p = this.page;
      if (this.$refs.baseList.refreshing) {
        this.page.SkipCount = 0
        this.tableList = [];
        this.$refs.baseList.refreshing = false;
      }
      this.$axios.get(this.$api.GetAreaWaterDeviceList, { params: p}).then(res=>{
          console.log("列表",res)
          if (res.result.items.length > 0) {
            this.tableList = this.tableList.concat(res.result.items);
          }
          success(this.tableList.length, res.result.totalCount, p)
      })
    },
    changelist(size, total = 5, page = {}){
        page.SkipCount = size;
        this.$refs.baseList.loading = false;
        if (size >= total ) {
            this.$refs.baseList.finished = true;
        }
    }
  }
}
</script>

<style lang="less">
  .piepnetwork{
      .screenBtn{
        width: 60px;
      }
      .slot_content{
        padding:  0;
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