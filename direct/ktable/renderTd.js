/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 */

(function () {
    ydApp.directive('renderTd', function() {
        return {

            scope:{
                celldata:'=', // 每行td的数据
                row:'=',    // 每行tr的数据
                tdrenderrowindex:'@' // 每行tr的index
            },
            replace:true,
            transclude:true,
            restrict:'AE',
            // require: '?kTable',
            template:'<div class="cell"></div>',
            controller:function ($scope,$element,$compile,$transclude,$parse,serviceData) {
                /**
                 * $element:<div class="k-table_body-cell"></div> clone :
                 * 需要被transclude的内容 rendet-td 的html();
                 * propfnc : "name=='小丽' ? '是' : '否'",
                 *  渲染结构目标结构row[x.prop]
                 */

                $transclude(function () {
                    var renderCell;

                    // 正常的prop渲染
                    if($scope.celldata.prop && !$scope.celldata.propfnc) {
                        renderCell =  '<span>'+ $scope.row[$scope.celldata.prop] +'</span>';
                    }
                    // 含有表达式propfnc的td渲染  "
                    // row[x.name]=='小丽' ? '是' : '否'"
                    // name "name=='小丽' ? '是' : '否'",
                    if($scope.celldata.propfnc) {
                        $scope.currentPropValue = $scope.row[$scope.celldata["prop"]];
                        // 将字段表达式里的字段转为当前作用域的值；
                        var cludeCurrentPropString = renderPropFncToProp($scope.celldata.prop,$scope.celldata.propfnc,'currentPropValue');

                        renderCell = '<span>'+ $scope.$eval(cludeCurrentPropString)+'</span>';

                    }
                    // 多选框的渲染
                    if($scope.celldata.type && $scope.celldata.type=='selection') {
                        renderCell = "<input type='checkbox' />";
                    };
                    // 序号的渲染
                    if($scope.celldata.type && $scope.celldata.type=='index') {
                        renderCell =  '<span>'+ $scope.tdrenderrowindex +'</span>';
                    };

                    // 内容里含有渲染字段的 如<kCol> {{row.name}} </kCol>

                    // 将kcol里面存储的html与根据kcol的属性创建的html分别添加到指令html里。
                    $scope.celldata.htmlContent && $element.append($compile('<span>'+ $scope.celldata.htmlContent +'</span>')($scope));
                    $element.append(renderCell)
                })


            },
            link:function (scope, elem, attrs,ctrl) {


                // console.log(scope.celldata)

            },
            compile:function (element,attrs) {


                // var _span = "<span>{{row[celldata.prop]}}</span>";
                //
                // var _checkbox = "<div ng-if=celldata.type==='selection';><input type='checkbox' /></div><span>{{celldata.type==='selection'}}</span>"
                // var oele = element.find('div.cell')
                // oele.append(_checkbox);

                // 优先执行
                return function (scope,ele,$attrs,ctrl) {



                }
            }

        }

    })
})()
