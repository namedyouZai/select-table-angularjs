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
            require: '?kTable',
            template:'<div class="cell"></div>',
            controller:function ($scope,$element,$compile,$transclude) {

                /**
                 * $element:<div class="k-table_body-cell"></div> clone :
                 * 需要被transclude的内容 rendet-td 的html();
                 * renderfn : "name=='小丽' ? '是' : '否'",
                 *  渲染结构目标结构row[x.prop]
                 */

                $transclude(function () {
                    var renderCell;
                    // 正常的prop渲染
                    if($scope.celldata.prop && !$scope.celldata.renderfn && $scope.celldata.type!=='content') {
                        renderCell =  '<span>'+ $scope.row[$scope.celldata.prop] +'</span>';
                    }
                    // 含有表达式renderfn的td渲染  "
                    // row[x.name]=='小丽' ? '是' : '否'"
                    // name "name=='小丽' ? '是' : '否'",
                    if($scope.celldata.renderfn) {
                        $scope.currentPropValue = $scope.row[$scope.celldata["prop"]];
                        // 将字段表达式里的字段转为当前作用域的值；

                        var containCurrentPropString = renderfnToProp($scope.celldata.prop,$scope.celldata.renderfn,'currentPropValue');
                        renderCell = '<span>'+ $scope.$eval(containCurrentPropString)+'</span>';
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
                    if($scope.celldata.type && $scope.celldata.type=='content') {
                        // 将parent的更改掉，这样写法的原因是因为作用域的问题  不用担心外层还会有ctrl 因为外层的也属于最外层ctrl的子作用域 可以访问
                        var replacedHtml = $scope.celldata.htmlContent.replace(/parent/g,'$parent.$parent.$parent.$parent.$parent');
                        $element.append($compile('<span>'+ replacedHtml +'</span>')($scope));
                    };
                    if($scope.celldata.kClick){
                        debugger
                    }

                    // 将kcol里面存储的html与根据kcol的属性创建的html分别添加到指令html里。
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
