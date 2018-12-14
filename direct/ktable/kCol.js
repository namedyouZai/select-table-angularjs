/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 *
 *   kCol主要作用是得到 columns的值 [{label:'全选',type:''},{label:'姓名',prop:''}]
 *
 */

(function () {
    ydApp.directive('kCol', function() {
        return {

            // replace:true,
            restrict:'AE',
            // transclude:'element',
            // transclude:true,
            // require: '?kTable',
            // templateUrl:'direct/ktable/kHeader.html',
            // template:'<div></div>',
            controller:function ($scope,$element,$transclude,$filter,$compile,$timeout,serviceData) {


                if(!$scope.$parent.tableid) {
                    throw "请设置tableid";
                }
                if(typeof serviceData[$scope.$parent.tableid] !='object') {

                    serviceData[$scope.$parent.tableid]={
                        columns:[],             // 编程人员手写的 k-col 属性集合。
                        thead:[],               //
                        tableStyle:{},          //
                        selectedRows:[],        // 已经选择的row的数据数组集合
                        selectedRowIndex:[],  // 已选择的row的下标数组集合，配合selectedRows用来删除其固定row
                        tableScope:''           // table的作用域
                    };
                }


                var vm = this;
                /**
                 * 将单个对象数组集合 columns[{},{},{}]
                 * @param _data 单个对象
                 * @returns {*} 返回的数组对象
                 */
                vm.recombineObjToArr = function (_data) {
                    serviceData[$scope.$parent.tableid].columns.push(_data);
                    return serviceData;
                }
                /**
                 *
                 * @param objString attrs
                 * @param pro   $attr
                 * attrs.$attr 形如 {label:'label',prop:'prop'}，不是具体的对象值，需要转化。
                 * return   {"label":"姓名","prop":"name"}
                 */

                vm.getObjAttr=function (objString,pro,ele) {
                    var obj={};
                    for(var x in objString[pro]) {

                        obj[x] = objString[x];
                    }
                    obj.htmlContent = ele.html();

                    return obj;
                }
            },
            link:function (scope, elem, attrs,ctrl) {

                //attrs.$attr 当前kCol元素的属性

                var objAttrs = ctrl.getObjAttr(attrs,"$attr",elem);

                ctrl.recombineObjToArr(objAttrs);
            }

        }

    })
})()
