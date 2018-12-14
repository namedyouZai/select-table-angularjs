/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 *   字段说明：
 *   serviceData[$scope.tableId] ： 用来将同一页面的不同ktable数据进行分离。 {waybill:{},brother:{}}
 *   pageScope: 当前页面的scope作用域
 *   tableScope: 当前table的scope作用域
 *   selectedRows:当前table被选择了rowData 当前被选择了的行数据。
 *
 */

(function () {
    ydApp.directive('renderTd', function() {
        return {

            scope:{
                currentColumnProps:'=', // 每行td的数据
                currentRowData:'=',    // 每行tr的数据
                currentRowIndex:'@', // 每行tr的index
                tableId:'@'
            },
            replace:true,
            transclude:true,
            restrict:'AE',
            // require: '?kTable',
            templateUrl:'direct/ktable/kCell.html',
            controller:function ($scope,$element,EventBus,serviceData) {

                $scope.kCell={};
                $scope.c_table = serviceData[$scope.tableId];  // 当前table的id
                var vm = this;
                // 暴露service里的父层$scope给link函数
                vm.exposeServiceDatapageScope= function () {
                   return $scope.c_table.pageScope
                };
                // 如果是复选框，则生成变量，并且将变量赋值，跟header保持数据同步，实现全选与反选
                /**
                 * 数据类型包括：
                 *
                 */
                if($scope.currentColumnProps.type=='selection') {
                    $scope.kCell={};
                    EventBus.on('checkAll',function (event) {
                        $scope.kCell.cellChecked = event.data.isSelectAll;
                        // 进行深拷贝 避免影响到httpData 否则会导致httpData也被增删。影响渲染
                        $scope.c_table.selectedRows = event.data.selectedRowsData;
                        $scope.c_table.selectedRowIndex = event.data.selectedRowIndex;
                    });

                }
                // 当选框施行增删row数据到service
                // selectedRowIndex
                $scope.tBodyCheckboxSelect = function (data,idx) {

                    $scope.kCell.cellChecked = !$scope.kCell.cellChecked;   // 更改当前checkbox的状态
                    var index = parseInt(idx) -1;

                    var _dataIndex = $scope.c_table.selectedRowIndex.indexOf(index);

                    if($scope.kCell.cellChecked) {
                        if(_dataIndex<0) {
                            $scope.c_table.selectedRows.push(data);
                            $scope.c_table.selectedRowIndex.push(index);
                        }
                    }else {
                        $scope.c_table.selectedRows.splice(_dataIndex,1);
                        $scope.c_table.selectedRowIndex.splice(_dataIndex,1);
                    };

                    // 给父页面赋值
                    $scope.c_table.pageScope[$scope.c_table.tableScope['selectChange']] =  $scope.c_table.selectedRows;

                    // 发布change事件 用来控制反选
                    EventBus.emit({
                        type:'reverseCheck',
                        data:{
                            checkedRowLength:$scope.c_table.selectedRows.length
                        }
                    })
                };

                // 含有表达式的prop转换
                if($scope.currentColumnProps.renderfn) {
                    $scope.currentPropValue = $scope.currentRowData[$scope.currentColumnProps["prop"]];
                    // 将字段表达式里的字段转为当前作用域的值；
                    var containCurrentPropString = renderfnToProp($scope.currentColumnProps.prop,$scope.currentColumnProps.renderfn,'currentPropValue');
                    $scope.propfn=$scope.$eval(containCurrentPropString)
                }

                // 内容里含有渲染字段的 如<kCol> {{row.name}} </kCol>
                if($scope.currentColumnProps.type=='content') {
                   $scope.colsHtml = $scope.currentColumnProps.htmlContent;
                };

                //     // 内容里含有渲染字段的 如<kCol> {{row.name}} </kCol>
                //     if($scope.celldata.type && $scope.celldata.type=='content') {
                //
                //         // 将parent的更改掉，这样写法的原因是因为作用域的问题  不用担心外层还会有ctrl 因为外层的也属于最外层ctrl的子作用域 可以访问
                //         var replacedHtml = $scope.celldata.htmlContent.replace(/parent/g,'$parent.$parent.$parent.$parent.$parent');
                //
                //         $element.append($compile('<span>'+ replacedHtml +'</span>')($scope));
                //     };
                //
                //     // 将kcol里面存储的html与根据kcol的属性创建的html分别添加到指令html里。
                //     $element.append(renderCell);
            },
            link:function (scope, elem, attrs,ctrl) {

                // 绑定函数
                if(scope.currentColumnProps["callBackType"]) {

                    elem.bind(scope.currentColumnProps["callBackType"],function () {

                        var fatherScope = ctrl.exposeServiceDatapageScope();

                        fatherScope[scope.currentColumnProps["callBackFn"]](scope.currentRowData)
                    })
                }



            }


        }

    })
})()
