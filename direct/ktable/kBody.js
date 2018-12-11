/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 */

(function () {
    ydApp.directive('tableBody', function() {
        return {

            scope:{
                tablebodydata:'='
            },
            replace:true,
            restrict:'AE',
            // require: '?kTable',
            // replace: true,
            transclude: true,
            templateUrl:'direct/ktable/kBody.html',
            controller:function ($scope,$element,$compile,$transclude,$timeout,serviceData) {

                $scope.bodyData = serviceData.columns;

                // body的样式控制
                $scope.kTableBodyTableStyle = {
                    // height:serviceData.tableStyle.bodyTableHeight
                };
                // 隔行变色的控制
                $scope.striped = serviceData.tableStyle.bodyTableStripe;


            },
            link:function (scope, elem, attrs,ctrl) {

                console.log('body')

            }

        }

    })
})()
