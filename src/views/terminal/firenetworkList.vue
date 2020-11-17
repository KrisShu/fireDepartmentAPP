<template>
  <div class="firenetworkList">
    <top-searh-add @search="search"></top-searh-add>
    <base-screen :screenbtnArr="screenbtnArr" @screen="screen"></base-screen>
    <base-list
      :tableList="tableList"
      ref="baseList"
      @onLoad="getList"
      @onRefresh="getList_refresh"
    >
        <div class="slot_content " slot-scope="scope" slot="content">
          <p> <span>防火单位：</span>{{scope.item.fireUnitName}}</p>
          <p> <span>设施编号：</span>{{scope.item.deviceSn}}</p>
          <p> <span>设施状态：</span> 
            <span class="green" v-if="scope.item.state == 1">在线</span>
            <span class="gary" v-if="scope.item.state == -1">离线</span>
          </p>
          <p> <span>联网部件数量：</span>{{scope.item.netDetectorNum}}</p>
          <div class="display">
            <p @click="getdetails('故障部件数量',scope.item)"> 
              <span>故障部件数量：</span>{{scope.item.faultDetectorNum}} 
              <img class="search_iocn" src="../../assets/images/search.png">
            </p>
            <p> <span>故障部件率：</span>{{scope.item.detectorFaultRate}}</p>
          </div>
          <div class="display">
            <p @click="getdetails('30天火警数量',scope.item)"> 
              <span>30天火警数量：</span>
              {{scope.item.alarmNum30Day}}
              <img class="search_iocn" src="../../assets/images/search.png">
            </p>
            <p @click="getdetails('高频部件数量',scope.item)"> 
              <span>高频部件数量：</span>
              {{scope.item.highAlarmDetectorNum}}
              <img class="search_iocn" src="../../assets/images/search.png">
              </p>
          </div>
        </div>
    </base-list>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  data(){
    return{
      tableList:[],
      page:{
          AreaId:this.$store.state.userInfo.areaId,
          FireUnitName:'',
          DeviceState:'',
      },
      screenbtnArr:[
        {
          text:'全部',
          color:'lightblue'
        },
        {
          text:'在线',
          color:'green',
          num:0
        },
        {
          text:'离线',
          color:'gary',
          num:0
        }
      ]
    }
  },
  created(){
    this.GetAreaFireAlarmDeviceStateNum();
  },
  methods:{
    //筛选
    screen(text){
    //  console.log(text);
     this.page.DeviceState = text;
     this.getList();

    },
    //查询
    search(text){
      this.page.FireUnitName = text;
      this.GetAreaFireAlarmDeviceStateNum();
      this.getList();
    },
    //获取状态数量
    GetAreaFireAlarmDeviceStateNum(){
      this.$axios.get(this.$api.GetAreaFireAlarmDeviceStateNum,
        {params:this.page }
      ).then(res=>{
        console.log("获取状态数量",res)
        this.screenbtnArr[1].num = res.result[0].value
        this.screenbtnArr[2].num = res.result[1].value
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
      this.$axios.get(this.$api.GetAreaFireAlarmDeviceList, { params: p}).then(res=>{
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
      this.$axios.get(this.$api.GetAreaFireAlarmDeviceList, { params: p}).then(res=>{
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
    },
    //
    getdetails(text,item){
      console.log(item)
      this.$router.push({
        path:'/firenetworkDetials',
        query:{
          basenavtitle:text,
          id:item.deviceId,
          deviceSn:item.deviceSn,
          fireUnitArchitectureName:item.fireUnitArchitectureName,
        }
      })
    }
  }
}
</script>

<style lang="less">
  .firenetworkList{
      .screenBtn{
        width: 90px;
      }
    .slot_content{
      padding:  0;
      .display{
        display: flex;    
        justify-content: space-between;
      }
      p{
        line-height: 2;
        span{
          text-align: right;
          display: inline-block;
          width: 110px;
          font-weight: bold;
          
        }
        .green{
          color: rgb(110, 201, 49);
          width: auto;
        }
        .gary{
          color: rgb(168, 167, 167);
          width: auto;
        }
        .search_iocn{
          width: 14px;
          // margin-top: 6px;
        }
      }
    }
  }
</style>