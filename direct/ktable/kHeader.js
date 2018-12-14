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
                $scope.sortTable=function (expression) {
                    $timeout(function () {
                        // serviceData[$scope.tableid].httpData= $filter('orderBy')(serviceData[$scope.tableid].httpData, expression)
                        // serviceData={p:2}
                        // console.log(serviceData)
                    },0)
                };

                // 全选
                // $scope.selectionAll = function () {
                //     console.log(serviceData[$scope.tableid].selectedRow)
                // }

                // 全选
                $scope.selectionAll = function () {

                    if ($scope.head.tHeadThChecked) {
                        for(var i=0;i< $scope.headerData.length;i++) {
                            $scope.headerData[i].isSelect = true;
                        }
                        EventBus.emit({
                            type:'getClosConfig',
                            data:{
                                allData:$scope.headerData,
                                currentData:true
                            }
                        })
                    }else {
                        for(var i=0;i< $scope.headerData.length;i++) {
                            $scope.headerData[i].isSelect = false;
                        }
                        EventBus.emit({
                            type:'getClosConfig',
                            data:{
                                allData:$scope.headerData,
                                currentData:false
                            }
                        })
                    }
                }
                // 反选
                EventBus.on('reverseCheck',function (event) {
                    $scope.head.tHeadThChecked = $scope.headerData.length==event.data.checkedRowLength ? true : false;
                })


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
