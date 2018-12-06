/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 *
 *   ketabledata:table页面渲染的数据
 *   label：th名称
 *
 *
 */

(function () {
    ydApp.directive('kTable', function() {
        return {

            scope:{
                ktabledata:'='
            },
            restrict:'AE',
            // templateUrl:'direct/ktable/kHeader.html',
            controller:function ($scope,$element,$compile,$timeout) {


                /** 拖拽成功触发方法
                 *   index 拖拽后落下时的元素的序号（下标）
                 *   obj被拖动数据对象
                 */
                $scope.dropComplete = function(index, obj){

                    var idx = $scope.waybillList.indexOf(obj);
                    $scope.waybillList[idx] = $scope.waybillList[index];
                    $scope.waybillList[index] = obj;
                };

                $timeout(function () {
                    var HTTP_DATA = [{sex:'女',name:'妲己',age:'24',height:'165cm',weight:'80',money:'$110',id:7},
                        {sex:'男',name:'关羽',age:'22',height:'180cm',weight:'140',money:'$220',id:8}]
                    $scope.ktabledata.concat(HTTP_DATA);
                },1000)


            },
            link:function (scope, elem, attrs) {

                debugger

                // var allCols = elem.children();
                // for(var i =0,len=allCols.length;i<len;i++) {
                //
                // }


            }

        }

    })
})()
