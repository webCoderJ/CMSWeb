import $ from 'jquery';
import '../libs/daterangepicker.js';
export default ($timeout, $interval) => {
    return {
        restrict: 'EA',
        require: '?^ngModel',
        scope: {
            bindModel: '=',
            eventName: '@'
        },
        link: function (scope, element, attrs, ngCtrl) {
            // 监听事件改变名，用以刷新计时器
            var eventName = attrs.eventName;

            let mssParser = (second_time) => {
                var time = parseInt(second_time) + "秒";
                if (parseInt(second_time) > 60) {

                    var second = parseInt(second_time) % 60;
                    var min = parseInt(second_time / 60);
                    time = min + "分" + second + "秒";

                    if (min > 60) {
                        min = parseInt(second_time / 60) % 60;
                        var hour = parseInt(parseInt(second_time / 60) / 60);
                        time = hour + "小时" + min + "分" + second + "秒";

                        if (hour > 24) {
                            hour = parseInt(parseInt(second_time / 60) / 60) % 24;
                            var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
                            time = day + "天" + hour + "小时" + min + "分" + second + "秒";
                        }
                    }
                }
                return time;
            }

            // 给数据模型添加一个formatter，处理倒计时
            ngCtrl.$formatters.push(function (modelVal) {
                function renderToView(val) {
                    if (val <= 0) {
                        ngCtrl.$setViewValue('_ _')
                        return;
                    }
                    var time = mssParser(Math.abs(val));
                    // if (val < 0) {
                    //     ngCtrl.$setViewValue('已发布' + time)
                    // }
                    if (val > 0) {
                        ngCtrl.$setViewValue('距发布还有' + time);
                    }
                } renderToView(modelVal);
                // 闭包使用独立内存
                (function (modelVal) {
                    var $timer;
                    function runCounter() {
                        if (modelVal <= 0) { return }
                        $timer = $interval(function () {
                            modelVal -= 1;
                            renderToView(modelVal)
                        }, 1000)
                    }
                    // 开启倒计时
                    runCounter();
                    // 监听更新，清理倒计时
                    scope.$on(eventName, function (event) {
                        if ($timer) {
                            var hasCanceled = $interval.cancel($timer);
                            // console.log('hasCanceled', $timer, hasCanceled);
                        } else {
                            runCounter();
                        }
                    })
                }(modelVal))
            });
        }
    };
}