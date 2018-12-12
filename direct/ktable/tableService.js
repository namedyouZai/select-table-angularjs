/**
 * 用来存储渲染table的数据
 * columns:列的数据集合 比如 { prop:name }
 *
 *
 */

ydApp.factory('serviceData', function() {

    return {

    }
}).factory("EventBus", function() {

    var eventMap = {};

    var EventBus = {
        on : function(eventType, handler) {

            if (!eventMap[eventType]) {
                eventMap[eventType] = [];
            }
            eventMap[eventType].push(handler);
        },

        off : function(eventType, handler) {
            for (var i = 0; i < eventMap[eventType].length; i++) {
                if (eventMap[eventType][i] === handler) {
                    eventMap[eventType].splice(i, 1);
                    break;
                }
            }
        },

        fire : function(event) {

            var eventType = event.type;
            if (eventMap && eventMap[eventType]) {
                for (var i = 0; i < eventMap[eventType].length; i++) {
                    eventMap[eventType][i](event);
                }
            }
        }
    };

    var getRow = function (data) {
        return  EventBus.fire({
            type: "getRow",
            data:data
        });
    }

    return {
        bus:EventBus,
        getRow:getRow
    }
})

    // // 事件订阅代码：
    //
    // EventBus.on("someEvent", function(event) {
    //     // 这里处理事件
    //     var c = event.data.a + event.data.b;
    // });
    // // 事件发布代码：
    //
    // EventBus.fire({
    //     type: "someEvent",
    //     data: {
    //         aaa: 1,
    //         bbb: 2
    //     }
    // });
    // // 注意，如果在复杂的应用中使用事件总线，需要慎重规划事件名，推荐使用业务路径，比如："portal.menu.selectedMenuChange"，以避免事件冲突。