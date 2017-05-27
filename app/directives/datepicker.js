import $ from 'jquery';
import 'bootstrap-datepicker';
export default () => {
    return {
        restrict: 'A',
        scope: {
            bindModel: '='
        },
        link: function (scope, element, attrs) {

            $.fn.datepicker.dates['zh-CN'] = {
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                daysMin:  ["日", "一", "二", "三", "四", "五", "六"],
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                today: "今日",
                clear: "清除",
                format: "yyyy年mm月dd日",
                titleFormat: "yyyy年mm月",
                weekStart: 1
            };


            // select yyyy-mm-dd
            if (attrs.type == 'day') {
                $(element).datepicker({
                    language: "zh-CN",
                    format: "yyyy-mm-dd",
                    // startView: 2,
                    // maxViewMode: 2,
                    // minViewMode:1,
                    orientation: "auto",
                    autoclose: true,
                    clearBtn: true
                }).on('changeDate', function (e) {
                    // console.info(e);
                    // var name = $(e.target).attr('name');
                    var date = e.format();
                    
                    scope.$apply(function () {
                        scope["bindModel"] = date;
                    });
                    
                });

                element.on('keydown', function (event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                });
            }

            // select yyyy-mm
            if (attrs.type == 'month') {
                var input = $(element).find('input');

                $(element).datepicker({
                    language: "zh-CN",
                    format: "yyyy-mm",
                    startView: 2,
                    maxViewMode: 2,
                    minViewMode:1,
                    orientation: "auto",
                    autoclose: true,
                    clearBtn: true
                }).on('changeDate', function (e) {
                    // console.info(e);
                    var name = $(e.target).attr('name');
                    var date = e.format();
                    
                    scope["bindModel"][name] = date;
                    
                });
            }

            // select range yyyy-mm-dd 
            if (attrs.type == 'range') {
                var input = $(element).find('input');

                $(element).addClass('input-daterange input-group');

                $(element).datepicker({
                    format: "yyyy-mm-dd",
                    language: "zh-CN",
                    orientation: "auto",
                    clearBtn: true
                }).on('changeDate', function (e) {
                    // console.info(e);
                    var name = $(e.target).attr('name');
                    var date = e.format();

                    scope["bindModel"][name] = date;
                    
                });

                scope.$on('refreshDatepicker', function (e, data) {
                    $(input[0]).datepicker('setDate', data.start_time);
                    $(input[1]).datepicker('setDate', data.end_time);
                });
            }
        }
    };
}