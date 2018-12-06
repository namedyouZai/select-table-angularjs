/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 */

(function () {
    ydApp.directive('kHeader', function() {
        return {

            scope:{

            },
            replace:true,
            restrict:'AE',
            // require: '?kTable',
            // templateUrl:'direct/',
            controller:function ($scope,$element,$compile,$timeout) {

                console.log($scope.$column+'1')
            },
            link:function (scope, elem, attrs,ctrl) {

                scope.$column = 1;

            }

        }

    })
})()
