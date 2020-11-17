const API = {
  LoginForMobile:'/api/services/app/FireDeptUser/UserLoginForMobile' ,//工程人员手机端登录
  //--模糊查询防火单位---------------
  GetFireUnitListByArea:'/api/services/app/FireUnit/GetFireUnitListByArea',//获取指定区域内的防火单位列表

  //--------防火单位--
  GetAreas:'/api/services/app/Area/GetAreas', //根据父级区域Id查询子级区域下拉数组
  //数据报告报告
  GetFireUnitReport:'/api/services/app/FireUnit/GetFireUnitReport',//获取防火单位的综合数据报告
  
  //火警联网
  GetAreaFireAlarmDeviceList:'/api/services/app/FireDevice/GetAreaFireAlarmDeviceList', //工程作业端：获取火警联网设施列表
  GetAreaFireAlarmDeviceStateNum:'/api/services/app/FireDevice/GetAreaFireAlarmDeviceStateNum',//工程作业端：获取火警联网设施状态数量
  
  GetFireAlarmFaultDetectorList:"/api/services/app/FireDevice/GetFireAlarmFaultDetectorList", //获取指定设备ID的故障部件列表
  GetFireAlarm30DayList: "/api/services/app/FireDevice/GetFireAlarm30DayList", //获取指定设备ID的30天报警记录
  GetFireAlarmHighList: "/api/services/app/FireDevice/GetFireAlarmHighList", //获取高频报警部件列表
 //--------------安全用电--------
 GetAreaElectricDeviceList:'/api/services/app/FireDevice/GetAreaElectricDeviceList',//工程作业端：获取安全用电设施列表
 GetAreaElectricDeviceStateNum:'/api/services/app/FireDevice/GetAreaElectricDeviceStateNum',//工程作业端：获取安全用电设施状态数量
 //--------物联管网------------
 GetAreaWaterDeviceList:'/api/services/app/FireDevice/GetAreaWaterDeviceList',// 工程作业端：获取消防管网设施列表
 GetAreaWaterDeviceStateNum:'/api/services/app/FireDevice/GetAreaWaterDeviceStateNum' ,//工程作业端：获取消防管网设施状态数量
 //------独立烟感------
 GetAreaIndependentDetectorStateNum:'/api/services/app/IndependentDetector/GetAreaIndependentDetectorStateNum',//工程作业端：获取独立烟感设施状态数量
 GetAreaIndependentDetectorList:'/api/services/app/IndependentDetector/GetAreaIndependentDetectorList',//工程作业端：获取独立烟感设施列表
  //
  ChangePassword:'/api/services/app/FireDeptUser/ChangePassword' ,//修改密码
  UserLogout:'/api/services/app/FireDeptUser/UserLogout',//登录注销
  GetNewestVersion:'/api/services/app/Version/GetNewestVersion', //获取最新版本信息


};
export default API;0
