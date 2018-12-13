/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 */

(function () {
    ydApp.directive('tableBody', function() {
        return {

            scope:{
                tablebodydata:'=',
                tableid:'='
            },
            replace:true,
            restrict:'AE',
            // require: '?kTable',
            // replace: true,
            transclude: true,
            templateUrl:'direct/ktable/kBody.html',
            controller:function ($scope,$element,$compile,$timeout,serviceData) {


                $scope.bodyData = serviceData[$scope.tableid].columns;

                // body的样式控制
                $scope.kTableBodyTableStyle = {
                    // height:serviceData[$scope.tableid].tableStyle.bodyTableHeight
                };
                // 隔行变色的控制
                $scope.striped = serviceData[$scope.tableid].tableStyle.bodyTableStripe;

            },
            link:function (scope, elem, attrs,ctrl) {

                console.log('body')

            }

        }

    })
})()
