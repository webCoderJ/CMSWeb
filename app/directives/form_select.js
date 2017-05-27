/*
    attrs: bindName:        input name      *
           type('query'):   具备查询功能
           required:        此表单必填
           bindErr:         错误信息
           bindDirection:   列表定位方向

    scope: optionsList:     下拉菜单列表(key,value,children)    *
           bindModel:       input绑定数据(key,value)            *
           queryModel:      查询条件的下拉列表(allData, queryData)
           bindForm:        表单校验的form name
           frontErr:        前端错误
           showErr:         显示错误
           hideErr:         隐藏错误
*/

export default ($timeout) => {
    return {
        restrict: 'A',
        scope: {
            bindPlaceholder: '@bindPlaceholder',
            optionsList: '=',
            bindModel: '=',
            queryModel: '=',
            bindForm: '=',
            frontErr: '=',
            showErr: '&',
            hideErr: '&',
            bindErr: '@'
        },
        replace: true,
        templateUrl: require(
            'file?name=views/common/[name].[hash].[ext]!../views/common/form_select_modal.html'
        ),
        link: function (scope, element, attrs) {

            scope.bindInfo = {
                direction: attrs.bindDirection || undefined,
                name: attrs.bindName,
                optionsShow: false,
                query: false,
                queryShow: false
            };

            scope.selectOption = selectOption;
            scope.queryOptions = queryOptions;
            scope.preventDefault = preventDefault;
            scope.showOptionsList = showOptionsList;
            scope.hideOptionsList = hideOptionsList;

            // 禁用
            if(attrs.disabled){
                scope.disabled = true;
            } else {
                scope.disabled = false;
            }

            // defaultSelection();
            // function defaultSelection() {
            //     if (scope.bindModel.value) {
            //         console.log(scope.bindModel.value);
            //         console.log(scope.optionsList)
            //         var defaultValue = scope.bindModel.value;
            //         angular.forEach(scope.optionsList,function(item,index){
            //             if(item.value == defaultValue){
            //                 scope.bindModel.key = item.key;
            //             }
            //         })
            //         console.log(scope.bindModel)
            //     }
            // }

            var lastKey;

            if (attrs.required) {
                scope.required = true;
            } else {
                scope.required = false;
            }

            if (attrs.bindErr) {
                scope.bindErr = attrs.bindErr;
            } else {
                scope.bindErr = false;
            }

            if (attrs.type === 'query') {
                scope.bindInfo.query = true;
            }

            function selectOption(option) {
                scope.bindModel.key = option.key;
                scope.bindModel.value = option.value;
                lastKey = option.key;
            }

            function preventDefault(e) {
                if (attrs.type !== 'query') {
                    e.preventDefault();
                }
            }

            function queryOptions(e) {

                if (attrs.type === 'query') {
                    scope.bindInfo.optionsShow = false;
                    scope.bindInfo.queryShow = true;
                    scope.queryModel.queryData = [];

                    if (scope.bindModel.key) {
                        angular.forEach(scope.queryModel.allData, function (value, index, item) {
                            if (value.key && value.key.toLowerCase().indexOf(scope.bindModel.key.toLowerCase()) != -1) {
                                scope.queryModel.queryData.push(value);
                            }
                        });
                    } else {
                        showOptionsList();
                    }
                }
            }

            function showOptionsList() {
                if(scope.disabled) { return }
                scope.hideErr();
                scope.bindInfo.optionsShow = true;
            }

            function hideOptionsList(e) {

                $timeout(function () {
                    if (attrs.type === 'query') {
                        // console.info(lastKey, e.target.value);

                        if (e.target.value && e.target.value !== lastKey) {
                            var countArr = [];

                            angular.forEach(scope.queryModel.allData, function (value, index, item) {

                                if (e.target.value === value.key) {
                                    countArr.push(value);
                                }
                            });
                            // console.info(countArr);
                            if (countArr.length === 1) {
                                scope.bindModel.key = countArr[0].key;
                                scope.bindModel.value = countArr[0].value;
                                lastKey = countArr[0].key;

                            } else if (countArr.length === 0) {
                                console.info("没找到用户");
                            } else if (countArr.length > 1) {
                                console.info("找到多个用户");
                            }
                        }
                    }

                    scope.bindInfo.optionsShow = false;
                    scope.bindInfo.queryShow = false;
                }, 200);
            }

            // 鼠标从整个DOM移出，selection__submenu延迟消失，从当前item移到另一个item，立刻消失
            var isOk = false;
            scope.selectionWrapperOver = function (e, option) {
                var clearActive = function (list) {
                    if (isOk) return;
                    angular.forEach(list, function (value, index) {
                        value.myActive = false;
                        value.children && value.children.length && clearActive(value.children);
                    });
                };
                clearActive(scope.optionsList);
                option.myTimeout && $timeout.cancel(option.myTimeout);
                option.myActive = true;
                // console.info("over", option);
                isOk = true;
            };
            scope.selectionWrapperOut = function (e, option) {
                isOk = false;
                // console.info("out", option);
                option.myTimeout && $timeout.cancel(option.myTimeout);
                option.myTimeout = $timeout(function () {
                    option.myActive = false;
                }, 1000);
            };

        }
    }
}
