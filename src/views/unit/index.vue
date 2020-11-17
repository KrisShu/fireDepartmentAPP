<template>
  <div class="unit">
    <top-searh-add @search="search"></top-searh-add>
    <base-list
      :tableList="tableList"
      ref="baseList"
      @onLoad="getList"
      @onRefresh="getList_refresh"
    >
        <div class="slot_content " slot-scope="scope" slot="content">
          <p> <span>名称：</span>{{scope.item.fireUnitName}}</p>
          <p> <span>区域：</span>{{scope.item.areaName}}</p>
          <p> <span>联系人：</span>{{scope.item.contractUserName}}（{{scope.item.contractPhone}}）</p>
          <p> <span>邀请码：</span>{{scope.item.invitationCode}}</p>
          <p> <span>地址：</span>{{scope.item.address}}</p>
          <div class="btns">
            <van-button type="primary" @click="phonecall(scope.item.contractPhone)" size="small">一键拨打</van-button>
            <van-button type="info" @click="navigate(scope.item.lng,scope.item.lat,scope.item.address)" size="small">一键导航</van-button>
            <van-action-sheet
              v-model="show_selectMap"
              :actions="actions"
              cancel-text="取消"
              close-on-click-action
              @select="onSelect"
            />
            <van-button type="info" @click="getreport(scope.item.fireUnitId,scope.item.fireUnitName)" size="small">智慧消防综合报告</van-button>
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
        AreaId:this.$store.state.userInfo.areaId
      },
      show_selectMap:false,
      actions:[{name:'高德地图'},{name:'百度地图'}],
      //-----导航要使用的参数--
      lng:'',
      lat:'',
      address:'',
    }
  },
  methods:{
    //搜索
    search(val){
      this.page.FireUnitName = val;
      this.getList();
    },
    //获取列表
    getList(success){
      let x = arguments[0] instanceof Object;
      let p = this.page;
      if (!x) {
          p.SkipCount = 0;
          this.tableList = [];
          this.$refs.baseList.loading = true
          this.$refs.baseList.finished = false
      }
      this.$axios.get(this.$api.GetFireUnitListByArea, { params: p}).then(res=>{
        // console.log("列表",res)
          if (res.result.items.length > 0) {
              this.tableList = this.tableList.concat(res.result.items);
          }
          x ? success(this.tableList.length, res.result.totalCount, p) : this.changelist(this.tableList.length, res.result.totalCount, p);
      })
    },
    //
    getList_refresh(success){
      let p = this.page;
      if (this.$refs.baseList.refreshing) {
        this.page.SkipCount = 0
        this.tableList = [];
        this.$refs.baseList.refreshing = false;
      }
      this.$axios.get(this.$api.GetFireUnitListByArea, { params: p}).then(res=>{
          // console.log("列表",res)
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
    //拨打电话
    phonecall(phoneNum){
      if(!window.plus){
        return
      }
      window.plus.device.dial(phoneNum,true)
    },
    //导航
    navigate(lng,lat,address){
      this.show_selectMap = true;
      this.lng = lng
      this.lat = lat
      this.address = address
    },
    //选择
    onSelect(item){
      this.show_selectMap = false;
      if (!window.plus) return;
      if(item.name == '高德地图'){
        if(window.plus.runtime.isApplicationExist({pname:'com.autonavi.minimap'})){//判断本机是否存在该应用
            this.Gaode()
        }else{
          this.$toast('请安装地图后再使用')
        }
      }else if(item.name == '百度地图'){
         if(window.plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap'})){
              this.Baidu()
          }else{
              this.$toast('请安装地图后再使用')
          }
      }
    },
    //高德地图
    Gaode(){
        let dlat = this.lat;//终点的纬度
        let dlon = this.lng;//终点的经度
        let dname = this.address;//终点的名称
        let  url = `amapuri://route/plan/?sid=BGVIS1&slat=&slon=&sname=&did=BGVIS2&dlat=${dlat}&dlon=${dlon}&dname=${dname}&dev=1&t=0`;
        window.plus.runtime.openURL(url)
    },
    Baidu(){
        let dlat = this.lat;//终点的纬度
        let dlon = this.lng;//终点的经度
        let dname = this.address;//终点的名称
        let url = `bdapp://map/direction?origin=&destination=name:${dname}|latlng:${dlat},${dlon}&coord_type=wgs84&mode=driving&src=andr.baidu.openAPIdemo`
        window.plus.runtime.openURL(url)
    },
    //获取报告
    getreport(fireUnitId,fireUnitName){
      this.$router.push({
        path:'/report',
        query:{
          fireUnitId,
          fireUnitName
        }
      })
    }
  }
}
</script>

<style lang="less">
  .unit{
    .slot_content{
      padding:  0;
      p{
        line-height: 2;
        span{
          text-align: left;
          display: inline-block;
          width: 60px;
          font-weight: bold;
        }
      }
      .btns{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .van-button{
        //  width:100px;
        }
      }
      .van-overlay{
        background: rgba(0,0,0,.1);
      }
    }
  }
</style>