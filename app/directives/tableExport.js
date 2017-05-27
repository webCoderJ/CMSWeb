import $ from 'jquery';
import '../libs/tableExport.js';
export default () => {

    return {
        restrict: 'E',
        replace: false,
        scope: {
            exId: '@',
            tplList: '=',
            search: '=',
            promise: '&'
        },
        template: `
            <div class="export_btn_wrapper">
                <button class="btn btn-primary" ng-click="showDropDownList($event, 'downloadType')">
                    <i class="icon iconfont">&#xe600;</i>
                    下载报表
                </button>
                <ul ng-show="dropDownList.downloadType" class="dropdown-menu">
                    <li ng-click="toExcel('json')">JSON</li>
                    <li ng-click="toExcel('xml')">XML</li>
                    <li ng-click="toExcel('txt')">TXT</li>
                    <li ng-click="toExcel('sql')">SQL</li>
                    <li ng-click="toExcel('excel')">MS-Excel</li>
                    <li>
                        导出从：
                        <input flag='exNum' 
                            type='number' 
                            style='margin-top:2px;margin-bottom:2px;' 
                            class='form-control' 
                            placeholder='开始点' 
                            ng-change="checkMin()"
                            ng-class="{'has-error': hasStartErr}"
                            ng-model="exNumStart">
                        到：
                        <input flag='exNum' 
                            type='number' 
                            style='margin-top:2px;margin-bottom:2px;' 
                            class='form-control' 
                            ng-class="{'has-error': exNumEnd <= 0 || hasErr}"
                            placeholder='结束点' 
                            ng-model="exNumEnd"
                            ng-change="checkMax()"
                            ng-focus="hideErr()" 
                            ng-blur="showErr()">
                        <span class="alert-arrow" ng-show="hasErr">
                            {{ errMsg }}
                        </span>
                        <span>共：{{ totalNum || 0 }} 条</span>
                    </li>
                </ul>
            </div>
        `,
        link: function (scope, element, attrs) {
            //用于获取下载表格的模板类 需要使用一个
            // var tableTplId = attrs['tableTplId'];
            // if (!tableTplId || tableTplId == '') {
            //     console.error('directive-tableExport:error - 请指定一个表格模板并传入相应id，模板请用table标签');
            // };
            //下载报表操作
            scope.exNumStart = 0;
            scope.exNumEnd = 0;
            scope.totalNum = 0;
            scope.dropDownList = {
                reportList: false,
                downloadType: false
            };
            scope.showDropDownList = showDropDownList;
            scope.toExcel = toExcel;
            var $document = $(document);
            var $dropDownList = $(".dropdown-menu");

            $document.on('click', function (e) {
                var flag = $(e.target).attr('flag')
                if (flag == 'exNum') { return false };
                if (e.target.className === 'dropdown-menu') return;

                scope.$apply(function () {
                    angular.forEach(scope.dropDownList, function (value, index) {
                        scope.dropDownList[index] = false;
                    });
                });
            });

            function showDropDownList(e, name) {
                e.stopPropagation();
                angular.forEach(scope.dropDownList, function (value, index) {
                    if (name !== index) {
                        scope.dropDownList[index] = false;
                    }
                });
                scope.dropDownList[name] = !scope.dropDownList[name];

                //获取数据数量
                scope.promise({
                    search: {
                        user_affiliation: scope.search.relation.value,
                        anyway: scope.search.anyway,
                        offset: 0,
                        limit: '',
                        start_date: scope.search.timePicker ? scope.search.timePicker.start : null,
                        end_date: scope.search.timePicker ? scope.search.timePicker.end : null,

                         /* 用于交易账户页 - 查询交易历史 */
                        open_start: scope.search.timePicker_open ? scope.search.timePicker_open.start : null,
                        open_end: scope.search.timePicker_open ? scope.search.timePicker_open.end : null,
                        close_start: scope.search.timePicker_close ? scope.search.timePicker_close.start : null,
                        close_end: scope.search.timePicker_close ? scope.search.timePicker_close.end : null,
                    }
                }).then(function (data) {
                    scope.totalNum = data.data.total_count
                })

            }

            function toExcel(type) {
                if (scope.hasErr) { scope.showErr; return false }
                scope.$emit('showLoadingWrapper');
                scope.promise({
                    search: {
                        user_affiliation: scope.search.relation.value || '',
                        anyway: scope.search.anyway || '',
                        offset: scope.exNumStart || '',
                        limit: (scope.exNumEnd - scope.exNumStart) || '',
                        start_date: scope.search.timePicker ? scope.search.timePicker.start : null,
                        end_date: scope.search.timePicker ? scope.search.timePicker.end : null,

                        /* 用于交易账户页 - 查询交易历史 */
                        open_start: scope.search.timePicker_open ? scope.search.timePicker_open.start : null,
                        open_end: scope.search.timePicker_open ? scope.search.timePicker_open.end : null,
                        close_start: scope.search.timePicker_close ? scope.search.timePicker_close.start : null,
                        close_end: scope.search.timePicker_close ? scope.search.timePicker_close.end : null,
                    }
                }).then(function (data) {
                    scope.tplList = data.data.data;

                    //使用插件开始下载
                    setTimeout(function () {
                        $("#" + scope.exId).tableExport({
                            type: type,
                            escape: false,
                            fileName: '报表导出'
                        });
                        scope.$emit('hideLoadingWrapper');
                    }, 100);
                })
            }

            scope.hasErr = true;
            scope.errMsg = '请输入区间';
            scope.hasStartErr = false;

            scope.checkMin = function () {
                if (scope.exNumStart < 0) {
                    scope.hasStartErr = true;
                    scope.errMsg = '起始点需大于0';
                }
                else {
                    scope.hasStartErr = false;
                    scope.errMsg = '请输入区间';
                }
            }

            scope.checkMax = function () {
                if (scope.exNumEnd > scope.totalNum) {
                    scope.hasErr = true;
                    scope.errMsg = '导出区间过大';
                }
                else if (scope.exNumEnd < 0) {
                    scope.hasErr = true;
                    scope.errMsg = '区间需大于0';
                }
                else if (scope.exNumEnd < scope.exNumStart) {
                    scope.hasErr = true;
                    scope.errMsg = '结束点需大于起始点';
                }
                else {
                    scope.hasErr = false;
                    scope.errMsg = '请输入区间';
                }
            }

            scope.hideErr = function () {
                scope.hasErr = false
            };
            scope.showErr = function () {
                if (scope.exNumEnd == 0 || scope.exNumEnd == '' || !scope.exNumEnd) {
                    scope.hasErr = true;
                }
            };
        }
    }
}
