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
                prt:'='
            },
            restrict:'AE',
            replace:true,
            transclude : true,
            templateUrl:'direct/ktable/kBasic.html',
            controller:function ($scope,$element,$compile,$timeout,serviceData) {
                serviceData.parentScope = $scope.$parent;
                // 其次执行
                $timeout(function () {
                    var HTTP_DATA = [{sex:'女',name:'妲己',age:'24',height:'165cm',weight:'80',money:'$110',id:7},
                        {sex:'男',name:'关羽',age:'22',height:'180cm',weight:'140',money:'$220',id:8}]
                    $scope.ktabledata = $scope.ktabledata.concat(HTTP_DATA);
                    serviceData.httpData=$scope.ktabledata;
                },1000);
                var vm =this;
                vm.getServiceThead=function () {

                    for(var i=0,len=serviceData.columns.length;i<len;i++) {
                        serviceData.thead.push(serviceData.columns[i].label)
                    }

                    return serviceData;
                };


                // 设定表格的高度，进行表头固定
                $scope.kTableBodyWarpStyle = {
                    height:$scope.height
                };

                // 将table的样式统一存入到service 供其他子指令取
                vm.getTableStyle= function (attr) {

                    serviceData.tableStyle={
                        bodyTableHeight:attr.height,
                        bodyTableStripe:attr.stripe ===undefined ? false : true
                    };
                    $scope.kTableBodyWarpStyle = {height:serviceData.tableStyle.bodyTableHeight}

                }


            },
            compile:function (element,attrs) {


                // 优先执行
                return function (scope,ele,$attrs,ctrl) {
                    // 最后执行

                    ctrl.getTableStyle($attrs);
                    console.log(ctrl.getServiceThead());


                }
            }

        }

    })
})()
