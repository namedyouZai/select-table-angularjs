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
            controller:function ($scope,$element,$compile,$timeout,serviceData) {


               $scope.headerData = serviceData[$scope.tableid].columns;
                /** 拖拽成功触发方法
                 *   index 拖拽后落下时的元素的序号（下标）
                 *   obj被拖动数据对象
                 */

                $scope.dropComplete = function(index, obj){

                    var idx = $scope.headerData.indexOf(obj);
                    $scope.headerData[idx] = $scope.headerData[index];
                    $scope.headerData[index] = obj;
                    // console.log(serviceData[$scope.tableid].columns)
                };
            },
            link:function (scope, elem, attrs,ctrl) {


            }

        }

    })
})()
