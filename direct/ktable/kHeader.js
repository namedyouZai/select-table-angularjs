/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 */

(function () {
    ydApp.directive('tableHeader', function() {
        return {

            scope:{
                tableid:'='
            },
            replace:true,
            restrict:'AE',
            // require: '?kTable',
            templateUrl:'direct/ktable/kHeader.html',
            controller:function ($scope,$element,$filter,$compile,$timeout,serviceData,EventBus) {

                $scope.head = {};
                $scope.headerData = serviceData[$scope.tableid].columns;
                // $scope.sortTable=function (expression) {
                //     $timeout(function () {
                //         // serviceData[$scope.tableid].httpData= $filter('orderBy')(serviceData[$scope.tableid].httpData, expression)
                //         // serviceData={p:2}
                //         // console.log(serviceData)
                //     },0)
                // };


                // 全选 初始值：$scope.head.tHeadThChecked = false
                $scope.selectionAll = function () {
                    if ($scope.head.tHeadThChecked) {
                        EventBus.emit({
                            type:'checkAll',
                            data:{
                                isSelectAll:false,
                                selectedRowsData:[],
                                selectedRowIndex:[]
                            }
                        });
                    }else {
                        // 进行深拷贝 避免影响到httpData 否则会导致httpData也被增删。影响渲染
                        var All_TABLE_DATA = angular.copy(serviceData[$scope.tableid].httpData),
                            allSelectedIndexArr = [];
                        for(var i = 0;i<All_TABLE_DATA.length;i++) {
                            allSelectedIndexArr.push(i);
                        }
                        EventBus.emit({
                            type:'checkAll',
                            data:{
                                // allData:$scope.headerData,
                                isSelectAll:true,
                                selectedRowsData:All_TABLE_DATA,
                                selectedRowIndex:allSelectedIndexArr
                            }
                        })
                    }
                    // 给父页面赋值
                    serviceData[$scope.tableid].pageScope[serviceData[$scope.tableid].tableScope['selectChange']] =  serviceData[$scope.tableid].selectedRows;
                }
                // 反选
                EventBus.on('reverseCheck',function (event) {
                    $scope.head.tHeadThChecked = $scope.headerData.length==event.data.checkedRowLength ? true : false;
                });


                /** 拖拽成功触发方法
                 *   index 拖拽后落下时的元素的序号（下标）
                 *   obj被拖动数据对象
                 */
                $scope.dropComplete = function(index, obj){

                    var idx = $scope.headerData.indexOf(obj);
                    $scope.headerData[idx] = $scope.headerData[index];
                    $scope.headerData[index] = obj;
                    console.log(serviceData[$scope.tableid].columns)
                };

            },
            link:function (scope, elem, attrs,ctrl) {



            }

        }

    })
})()
