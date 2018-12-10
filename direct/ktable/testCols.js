/**
 *  @ 指令数据传输格式：{{parentData}} 只是字符串格式
 *   = 指令数据传输格式：'parentData'      与父级双向绑定
 *   & 传表达式 比如函数
 */

(function () {
    ydApp.directive('kCol', function() {
        return {

            scope:{

            },
            // replace:true,
            restrict:'AE',
            // transclude:'element',
            // transclude:true,
            // require: '?kTable',
            // templateUrl:'direct/ktable/kHeader.html',
            // template:'<div></div>',
            controller:function ($scope,$element,$transclude,$compile,$timeout,serviceData) {

                var vm = this;
                /**
                 * 将单个对象数组集合 columns[{},{},{}]
                 * @param _data 单个对象
                 * @returns {*} 返回的数组对象
                 */
                vm.recombineObjToArr = function (_data) {
                    serviceData.columns.push(_data);
                    return serviceData;
                }
                /**
                 *
                 * @param objString attrs
                 * @param pro   $attr
                 * attrs.$attr 形如 {label:'label',prop:'prop'}，不是具体的对象值，需要转化。
                 * return   {"label":"姓名","prop":"name"}
                 */
                vm.getObjAttr=function (objString,pro) {
                    var obj={};
                    for(var x in objString[pro]) {

                        obj[x] = objString[x];
                    }
                    return obj;
                }
            },
            link:function (scope, elem, attrs,ctrl) {

                //attrs.$attr 当前kCol元素的属性

                var objAttrs = ctrl.getObjAttr(attrs,"$attr");

                ctrl.recombineObjToArr(objAttrs)

            }
            // ,
            // compile:function(ele,attr,$transclude) {
            //
            //
            //
            //     // $transclude(ele,function (clone) {
            //     //     clone.parent().append('<td>22</td>')
            //     //     console.log(clone)
            //     // })
            // }

        }

    })
})()
