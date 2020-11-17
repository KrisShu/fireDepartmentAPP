<template>
  <div class="safeElectric">
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
            <span class="green" v-if="scope.item.state == 2">良好</span>
            <span class="Olivegreen" v-if="scope.item.state == -4">故障</span>
            <span class="yellow" v-if="scope.item.state == -3">隐患</span>
            <span class="orange" v-if="scope.item.state == -2">超限</span>
            <span class="gary" v-if="scope.item.state == -1">离线</span>
          </p>
          <p> <span>安装位置：</span>{{scope.item.location}}</p>
          <div class="display">
            <p><span>当前数值：</span></p>
            <div class="slot_content_div">
              <!-- 单相数值 -->
              <div v-if="scope.item.phaseType == 1">
                <p> <span>L：</span>{{scope.item.l}}</p>
                <p> <span>N：</span>{{scope.item.n}}</p>
              </div>
              <!-- 三相数值 -->
              <div v-if="scope.item.phaseType == 2">
                <p> <span>L1：</span>{{scope.item.l1}}</p>
                <p> <span>L2：</span>{{scope.item.l2}}</p>
                <p> <span>L3：</span>{{scope.item.l3}}</p>
                <p> <span>N：</span>{{scope.item.n}}</p>
              </div>
              
              <p> <span>剩余电流：</span>{{scope.item.a}}</p>
            </div>
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
      screenSign:'全部',
      screenbtnArr:[
        {
          text:'全部',
          color:'lightblue'
        },
        {
          text:'良好',
          color:'green',
          num:0
        },
        {
          text:'隐患',
          color:'yellow',
          num:0
        },
        {
          text:'超限',
          color:'orange',
          num:0
        },
        {
          text:'故障',
          color:'Olivegreen',
          num:0
        },
        {
          text:'离线',
          color:'gary',
          num:0
        }
      ],
      tableList:[],
      page:{
          AreaId:this.$store.state.userInfo.areaId,
          FireUnitName:'',
          DeviceState:'',
      },
    }
  },
  created(){
    this.GetAreaElectricDeviceStateNum();
  },
  methods:{
    //查询
    search(text){
      this.page.FireUnitName = text;
      this.GetAreaElectricDeviceStateNum();
      this.getList();
    },
    //新增
    //按钮筛选
    screen(text){
      this.page.DeviceState = text;
      this.getList();
    },
    //获取状态数量
    GetAreaElectricDeviceStateNum(){
      this.$axios.get(this.$api.GetAreaElectricDeviceStateNum,{params:this.page}).then(res=>{
        console.log("获取状态数量",res);
        this.screenbtnArr[1].num = res.result[0].value
        this.screenbtnArr[2].num = res.result[1].value
        this.screenbtnArr[3].num = res.result[2].value
        this.screenbtnArr[4].num = res.result[3].value
        this.screenbtnArr[5].num = res.result[4].value
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
      this.$axios.get(this.$api.GetAreaElectricDeviceList, { params: p}).then(res=>{
          console.log("列表",res)
          if (res.result.items.length > 0) {
            this.tableList = this.tableList.concat(res.result.items);
          }
          x ? success(this.tableList.length, res.result.totalCount, p) : this.changelist(this.tableList.length, res.result.totalCount, p);
      })
    },
    //下拉刷新
    getList_refresh(success){
      let p = this.page;
      if (this.$refs.baseList.refreshing) {
        this.page.SkipCount = 0
        this.tableList = [];
        this.$refs.baseList.refreshing = false;
      }
      this.$axios.get(this.$api.GetAreaElectricDeviceList, { params: p}).then(res=>{
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

  }
}
</script>

<style lang="less">
  .safeElectric{
      .screenBtn{
        width: 44px;
      }
      .slot_content{
        padding:  0;
        .display{
          display: flex; 
          align-items: flex-start;   
          // justify-content: space-between;
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
            &.yellow{
              width: auto;
              color: rgb(236, 203, 57);
            }
            &.orange{
              width: auto;
              color: rgb(247, 152, 75);
            }
            &.Olivegreen{
              width: auto;
              color: rgb(158, 158, 44);
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
            width:100px;
          }
        }
      }
  }
</style>