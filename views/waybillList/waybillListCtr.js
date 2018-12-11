/**
 * Created by dell on 2018/12/6.
 */
ydApp.controller('waybillListCtr',function ($scope,$rootScope,$timeout) {
    $timeout(function () {
        $scope.waybillList=[{sex:'女',name:'小丽',age:'13',height:'160cm',weight:'90',money:'$100',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:1},
            {sex:'女',name:'娜可露露',age:'14',height:'162cm',weight:'92',money:'$120',sendCity:'上海',sendDistrict:'宝山',arriveCity:'杭州',arriveDistrict:'下城',id:2},
            {sex:'男',name:'李白',age:'16',height:'170cm',weight:'130',money:'$130',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:3},
            {sex:'女',name:'露娜',age:'18',height:'168cm',weight:'98',money:'$150',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:4},
            {sex:'女',name:'虞姬',age:'20',height:'172cm',weight:'95',money:'$200',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:5},
            {sex:'男',name:'杨戬',age:'24',height:'175cm',weight:'120',money:'$180',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:6}]
    },1000);
    $scope.parentCtr='父控制器';
    $scope.delete=function () {
        alert('1')
    }

    $scope.status='1';
    /** 拖拽成功触发方法
     *   index 拖拽后落下时的元素的序号（下标）
     *   obj被拖动数据对象
     */
    // $scope.dropComplete = function(index, obj){
    //
    //     var idx = $scope.waybillList.indexOf(obj);
    //     $scope.waybillList[idx] = $scope.waybillList[index];
    //     $scope.waybillList[index] = obj;
    // };
});