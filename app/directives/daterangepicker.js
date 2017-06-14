import $ from 'jquery';
import '../libs/daterangepicker.js';

//标准时间格式传值方法
// var isoDates = [
//     ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
//     ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
//     ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
//     ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
//     ['YYYY-DDD', /\d{4}-\d{3}/],
//     ['YYYY-MM', /\d{4}-\d\d/, false],
//     ['YYYYYYMMDD', /[+-]\d{10}/],
//     ['YYYYMMDD', /\d{8}/],
//     // YYYYMM is NOT allowed by the standard
//     ['GGGG[W]WWE', /\d{4}W\d{3}/],
//     ['GGGG[W]WW', /\d{4}W\d{2}/, false],
//     ['YYYYDDD', /\d{7}/]
// ];

// // iso time formats and regexes
// var isoTimes = [
//     ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
//     ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
//     ['HH:mm:ss', /\d\d:\d\d:\d\d/],
//     ['HH:mm', /\d\d:\d\d/],
//     ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
//     ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
//     ['HHmmss', /\d\d\d\d\d\d/],
//     ['HHmm', /\d\d\d\d/],
//     ['HH', /\d\d/]
// ];

export default ($timeout) => {
    return {
        restrict: 'EA',
        scope: {
            bindModel: '=',
            bindPlaceholder: '@bindPlaceholder',
            showErr: '='
        },
        replace: true,
        template: '<div class="form-control-wrapper picker-wrapper">' +
        `<input class="form-control" placeholder="{{ bindPlaceholder }}" ng-focus="[hideErr(),moveRangePicker()]" ng-disabled="disabled" ng-blur="[showfrontErr(),moveRangePicker('close')]" ng-keydown="preventDefault($event)">` +
        '<i class="iconfont icon-rili"></i>' +
        `<div ng-if="showErr.show && (type == 'time_range' || type == 'range-single')">` +
        '<p class="alert-arrow">{{ showErr.msg }}</p>' +
        '</div>' +
        '</div>',
        link: function (scope, element, attrs) {
            var type = attrs["pickerType"];
            scope.type = type;
            scope.preventDefault = preventDefault;

            var ele = $(element).find("input");
            var options = {};
            options.autoUpdateInput = false;

            var timeFormator = 'YYYY-MM-DD';
            var preViewFormator = 'MM/DD/YYYY';

            if (attrs.disabled) {
                scope.disabled = true;
            } else {
                scope.disabled = false;
            }

            if (attrs.width) {
                element.css('width', attrs.width).parent().css('width', attrs.width);
            }

            if (type == "range") {
                options.ranges = {
                    '今天': [moment(), moment()],
                    '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '上周': [moment().subtract(1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(1, 'week').endOf('week').subtract(-1, 'days')],
                    '最近7天': [moment().subtract(6, 'days'), moment()],
                    '最近一个月': [moment().subtract(29, 'days'), moment()],
                    '当月': [moment().startOf('month'), moment().endOf('month')],
                    '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                };
            }

            else if (type == 'time_range') {
                timeFormator = 'YYYY-MM-DD HH:mm:ss';
                preViewFormator = 'YYYY/MM/DD HH:mm:ss';
                angular.extend(options, {
                    "timePicker": true,
                    "timePickerIncrement": 1,
                    "timePicker": true,
                    "timePicker24Hour": true,
                    "timePickerSeconds": true,
                    locale: {
                        format: preViewFormator
                    },
                    ranges: {
                        '明天': [moment().subtract(-1, 'days'), moment().subtract(-1, 'days')],
                        '下周': [moment().subtract(-1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(-1, 'week').endOf('week').subtract(-1, 'days')],
                        '下下周': [moment().subtract(-1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(-2, 'week').endOf('week').subtract(-1, 'days')],
                        '下三周': [moment().subtract(-1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(-3, 'week').endOf('week').subtract(-1, 'days')],
                        '下四周': [moment().subtract(-1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(-4, 'week').endOf('week').subtract(-1, 'days')],
                        '下个月': [moment().subtract(-1, 'month').startOf('month'), moment().subtract(-1, 'month').endOf('month')],
                        '下两个月': [moment().subtract(-1, 'month').startOf('month'), moment().subtract(-2, 'month').endOf('month')]
                    }
                });
            }

            else if (type == 'range-single') {
                timeFormator = attrs.timeSelect ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
                preViewFormator = attrs.timeSelect ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY-MM-DD';
                angular.extend(options, {
                    "singleDatePicker": true,
                    "timePicker": attrs.timeSelect ? true : false,
                    "timePicker24Hour": attrs.timeSelect ? true : false,
                    locale: {
                        format: preViewFormator
                    },
                    ranges: {
                        '明天': [moment().subtract(-1, 'days'), moment().subtract(-1, 'days')],
                        '下周': [moment().subtract(-1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(-1, 'week').endOf('week').subtract(-1, 'days')],
                        '下下周': [moment().subtract(-1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(-2, 'week').endOf('week').subtract(-1, 'days')],
                        '下三周': [moment().subtract(-1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(-3, 'week').endOf('week').subtract(-1, 'days')],
                        '下四周': [moment().subtract(-1, 'week').startOf('week').subtract(-1, 'days'), moment().subtract(-4, 'week').endOf('week').subtract(-1, 'days')],
                        '下个月': [moment().subtract(-1, 'month').startOf('month'), moment().subtract(-1, 'month').endOf('month')],
                        '下两个月': [moment().subtract(-1, 'month').startOf('month'), moment().subtract(-2, 'month').endOf('month')]
                    }
                });
            }

            ele.daterangepicker(options).on('apply.daterangepicker', function (ev, picker) {
                if (scope.disabled) { return };
                console.log('start: ' + picker.startDate.format(timeFormator));
                console.log('end: ' + picker.endDate.format(timeFormator));
                scope.bindModel.start = picker.startDate.format(timeFormator);
                scope.bindModel.end = picker.endDate.format(timeFormator);
                scope.$emit('timeModelChange' + (attrs.eventName ? ('_' + attrs.eventName) : ''), {
                    start: scope.bindModel.start,
                    end: scope.bindModel.end
                })
                if (type == 'range-single') {
                    ele.val(picker.startDate.format(preViewFormator));
                } else {
                    ele.val(picker.startDate.format(preViewFormator) + ' - ' + picker.endDate.format(preViewFormator));
                }
                ele.blur();
            }).on('cancel.daterangepicker', function (ev, picker) {
                ele.val('');
                picker.startDate = moment();
                picker.endDate = moment();
                scope.bindModel.start = undefined;
                scope.bindModel.end = undefined;
            })

            //设置默认值
            if (type == 'range-single') {
                $timeout(function () {
                    if (scope.bindModel.start) {
                        ele.data('daterangepicker').setStartDate(scope.bindModel.start.replace(/\-/gi, '/'));
                        ele.val(scope.bindModel.start);
                    }
                    //console.log(ele.data());
                }, 200);
            } else {
                $timeout(function () {
                    if (scope.bindModel.start && scope.bindModel.end) {
                        ele.data('daterangepicker').setStartDate(scope.bindModel.start.replace(/\-/gi, '/'));
                        ele.data('daterangepicker').setEndDate(scope.bindModel.end.replace(/\-/gi, '/'));
                        ele.val(scope.bindModel.start + ' - ' + scope.bindModel.end);
                    }
                    //console.log(ele.data());
                }, 200);
            }
            
            //moveRangePicker('system_modal');

            // function moveRangePicker(containerClass){
            //     $('.daterangepicker').appendTo('.modal-dialog');
            // }

            scope.moveRangePicker = function (action) {
                $timeout(function () {
                    var $calendar = $('.daterangepicker')
                    var currentTop = null;
                    var hasScrolled = $('.modal').scrollTop() || 0;

                    if (action == 'close') {
                        currentTop = 0;
                        $('.modal').unbind();
                    } else {
                        // 找到当前展示的calendar
                        $calendar.each(function (index, item) {
                            if ($(item).css('display') != 'none') {
                                $calendar = $(item);
                            }
                        });

                        // 获取当前展示calendar的top值
                        currentTop = $calendar.position().top;

                        $('.modal').scroll(function (e) {
                            var comTop = currentTop - e.currentTarget.scrollTop + hasScrolled + 'px';
                            $calendar.css('top', comTop);
                        })
                    }
                })
            }

            function preventDefault(e) {
                e.preventDefault();
            }

            scope.hideErr = function () {
                if (scope.showErr) {
                    scope.showErr.show = false;
                }
            }
        }
    };
}