/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 */

(function () {
    ydApp.directive('selectTable', function() {
        return {

            scope:{
                tabledata:'=',
                thnum:'@',
                btnname:'@',
                datafunc:'&',
                filterfiled:'=',
                tableobj:'@'
            },
            restrict:'AE',
            templateUrl: 'direct/selectTable/autoTable.html',
            transclude:true,
            controller:function ($scope,$element,$compile) {
                debugger
                $scope.tableobj=JSON.parse($scope.tableobj);
console.log($scope.tableobj)
                $scope.tableShow = false;

            },
            link:function (scope, elem, attrs) {
debugger
                elem.find('input').bind('click',function () {

                    scope.tableShow = true;

                })
            }

        }

    })
})()
