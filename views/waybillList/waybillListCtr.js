/**
 * Created by dell on 2018/12/6.
 */
ydApp.controller('waybillListCtr',function ($scope,$rootScope,$timeout,EventBus) {
    $timeout(function () {
        $scope.waybillList=[{sex:'女',name:'小丽',age:'18',height:'160cm',weight:'90',money:'$100',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:1},
            {sex:'女',name:'娜可露露',age:'16',height:'162cm',weight:'92',money:'$120',sendCity:'上海',sendDistrict:'宝山',arriveCity:'杭州',arriveDistrict:'下城',id:2},
            {sex:'男',name:'李白',age:'16',height:'170cm',weight:'130',money:'$130',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:3},
            {sex:'女',name:'露娜',age:'18',height:'168cm',weight:'98',money:'$150',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:4},
            {sex:'女',name:'虞姬',age:'20',height:'172cm',weight:'95',money:'$200',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:5},
            {sex:'男',name:'杨戬',age:'24',height:'175cm',weight:'120',money:'$180',sendCity:'合肥',sendDistrict:'蜀山',arriveCity:'南京',arriveDistrict:'栖霞',id:6}]


    },1000);
    $timeout(function () {
        $scope.testData=[
            {book:'JS',year:'2018'},
            {book:'css',year:'2000'},
            {book:'nodeJS',year:'2019'},
            {book:'HTML',year:'3000'},
            {book:'厚黑学',year:'2930'}
        ]


    },3000);

    $scope.handleSelectionChange1 = function (row) {
        console.log(row)
    };



    $scope.showAge = function () {
        console.log($scope.handelSelectChange)
    }

    $scope.movea = function (row) {
        console.log(row)
    }
    $scope.arr = [1, 2, 3];
    $scope.pCtr='父控制器';
    $scope.status='1';
    $scope.toDetail = function (a,b) {
        console.log($scope.arr);
        console.log(a+'---'+b)
    }
    $scope.show = true;
    $scope.name = 'htf';


});