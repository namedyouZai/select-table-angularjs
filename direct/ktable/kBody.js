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
                tablebodyheight:'@'
            },
            replace:true,
            restrict:'AE',
            // require: '?kTable',
            // replace: true,
            transclude: true,
            templateUrl:'direct/ktable/kBody.html',
            controller:function ($scope,$element,$compile,$transclude,$timeout,serviceData) {


                console.log($scope.tablebodyheight)
                $scope.bodyData = serviceData.columns;

                console.log($scope.bodyData)
                // body的样式控制
                $scope.kTableBodyTableStyle = {
                    // height:serviceData.tableStyle.bodyTableHeight
                };
                // 隔行变色的控制
                $scope.striped = serviceData.tableStyle.bodyTableStripe;


                $transclude(function(clone) {
                    //$transclude中接收的函数里的参数含有指令元素的内容(指令元素的内容就是指令内部的元素，也就是应该被transclude的内容,这里指的是[text, button.primary.ng-scope, text, button.primary.ng-scope, text, button.secondary.ng-scope, text])
                    //$element包含编译后的DOM元素(也就是把指令template进行了编译，这里指的是[div.span4.well.clearfix])，所以就可以在控制器中同时操作DOM元素和指令内容。
                    var primaryBlock = $element.find('div.k-table-column--selection');

                    var transcludedButtons = clone.filter(':k-col');
                    angular.forEach(transcludedButtons, function(e) {
                        debugger
                        //每一个对象都有hasClass方法等
                        if (angular.element(e).hasClass('primary')) {
                            primaryBlock.append(e);
                        } else if (angular.element(e).hasClass('secondary')) {
                            secondaryBlock.append(e);
                        }
                    });
                });

            },
            link:function (scope, elem, attrs,ctrl) {



            }

        }

    })
})()
