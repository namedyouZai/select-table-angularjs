/**
 * Created by mamimi on 2018/11/28.
 */
var ydApp = angular.module('demoApp',['ngRoute','ngDraggable'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'views/page1/page1.html',
                controller:'page1Ctr'
            })
            .when('/trans',{
                templateUrl:'views/page2/page2.html',
                controller:'page2Ctr'
            })
            .when('/list',{
                templateUrl:'views/waybillList/waybillList.html',
                controller:'waybillListCtr'
            })
            .otherwise('/');
    }]);