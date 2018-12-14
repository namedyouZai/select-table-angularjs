/**
 * 编译函数(compile)负责对模板DOM进行转换。
 * 链接函数(link)负责将作用域和DOM进行链接
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 *
 *   ketabledata:table页面渲染的数据
 *   label：th名称
 *
 *   repalce 自定义指令名称是否保留。
 *  Transclude：是否将原来视图的内容嵌入到视图模板（Template或TemplateUrl）中。
 *
 */

(function () {
    ydApp.directive('kTable', function() {
        return {

            scope:{
                ktabledata:'=',
                prt:'=',
                tableid:'@',
                selectChange:'@'
            },
            restrict:'AE',
            replace:true,
            transclude : true,
            templateUrl:'direct/ktable/kBasic.html',
            controller:function ($scope,$element,$compile,$timeout,serviceData,EventBus) {

                // 其次执行
                $timeout(function () {
                    var HTTP_DATA = [{sex:'女',name:'妲己',age:'24',height:'165cm',weight:'80',money:'$110',id:7},
                        {sex:'男',name:'关羽',age:'22',height:'180cm',weight:'140',money:'$220',id:8}];
                    $scope.ktabledata = $scope.ktabledata ? $scope.ktabledata.concat(HTTP_DATA) : [];
                    serviceData[$scope.tableid].httpData=$scope.ktabledata;
                },1000);
                var vm =this;
                vm.getServiceThead=function () {

                    for(var i=0,len=serviceData[$scope.tableid].columns.length;i<len;i++) {
                        serviceData[$scope.tableid].thead.push(serviceData[$scope.tableid].columns[i].label)
                    }

                    return serviceData[$scope.tableid];
                };


                // 设定表格的高度，进行表头固定
                $scope.kTableBodyWarpStyle = {
                    height:$scope.height
                };

                // 将table的样式统一存入到service 供其他子指令取
                vm.getTableStyle= function (attr) {
                    serviceData[$scope.tableid].tableStyle={
                        bodyTableHeight:attr.height,
                        bodyTableStripe:attr.stripe ===undefined ? false : true
                    };
                    $scope.kTableBodyWarpStyle = {height:serviceData[$scope.tableid].tableStyle.bodyTableHeight}
                };

                vm.setTableAndPageScope = function () {
                    serviceData[$scope.tableid].pageScope = $scope.$parent;
                    serviceData[$scope.tableid].tableScope = $scope;
                }


                // 订阅 点击全选按钮
                // EventBus.on("checkAll", function(event) {
                //     $scope.selectionAll()(event.data.selectedRowsData);
                //     // 这里处理事件
                // });
                // // 当用户手动勾选数据行的 Checkbox 时触发的事件
                // EventBus.on('reverseCheck',function (event) {
                //     $scope.select()(event.data.selectedRowsData);
                // })
                // // 当选择项发生变化时会触发该事件
                // EventBus.on('reverseCheck',function (event) {
                //     $scope.select()(event.data.selectedRowsData);
                // })

                // vm.getSelectRowsData = function () {
                //
                //     return serviceData[$scope.tableid].selectedRows;
                // }

            },
            compile:function (element,attrs) {


                // 优先执行
                return function (scope,ele,$attrs,ctrl) {
                    // 最后执行

                    ctrl.getTableStyle($attrs);


                }
            }

        }

    })
})()
