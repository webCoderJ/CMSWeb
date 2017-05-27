/*
    支持一级下拉菜单以及输入查询
    @params
        optionsList {array}             菜单列表
        bindModelKey {string}           绑定字段 Key，显示到页面
        bindModelValue {string}         绑定字段 Value，同后端交互
        bindOptionKey {sting}           model key 在列表中对应的name
        bindOptionValue {sting}         model value 在列表中对应的name
        bindName {sting}                input name
        bindQuery {sting -> 'query'}    是否支持输入查询     
*/

export default ($timeout) => {
    return {
        restrict: 'A',
        scope: {
            optionsList: '=',
            bindModelValue: '=',
            bindModelKey: '='
        },
        replace: true,
        templateUrl: require(
                'file?name=views/common/[name].[hash].[ext]!../views/common/list_select_modal.html'
            ),
        link: function (scope, element, attrs) {

            scope.bindInfo = {
                name: attrs.bindName,
                placeholder: attrs.placeholder,
                optionsShow: false,
                query: attrs.bindQuery === 'query' ? true : false,
                queryShow: false
            };
            scope.queryOptionsList = {
                allData: [],
                queryData: []
            };

            scope.$watch('optionsList', function (newVal, oldVal) {
                if (newVal) {
                    scope.queryOptionsList.allData = copyArr(scope.optionsList);
                }
                // console.info(scope.queryOptionsList);
            });
            
            scope.selectOption = selectOption;
            scope.queryOptions = queryOptions;
            scope.preventDefault = preventDefault;
            scope.showOptionsList = showOptionsList;
            scope.hideOptionsList = hideOptionsList;
            scope.stopPropagation = stopPropagation;

            var lastKey,
                key = attrs.bindOptionKey || 'key',
                value = attrs.bindOptionValue || 'value';
            scope.key = key;
            scope.value = value;

            var documentEle = angular.element(document);
            documentEle.on('click', function () {
                var eInput = angular.element(document.querySelector('.list_select_input'));
                
                angular.forEach(eInput, function (value, index) {
                    hideOptionsList(value.value);
                });
            });

            function copyArr (arr) {
                var newArr = [];
                angular.forEach(arr, function (value, index) {
                    newArr.push(value);
                });
                return newArr;
            }

            function selectOption (option) {
                scope.bindModelKey = option[key];
                scope.bindModelValue = option[value];
                lastKey = option[key];

                scope.bindInfo.optionsShow = false;
                scope.bindInfo.queryShow = false;
            }

            function stopPropagation (e) {
                e.stopPropagation();
                e.preventDefault();
            }

            function preventDefault (e) {
                if (!scope.bindInfo.query) {
                    e.preventDefault();
                }
            }

            function queryOptions () {
                if (scope.bindInfo.query) {
                    scope.bindInfo.optionsShow = false;
                    scope.bindInfo.queryShow = true;
                    scope.queryOptionsList.queryData = [];
                    
                    if (scope.bindModelKey) {
                        angular.forEach(scope.queryOptionsList.allData, function (value, index, item) {
                        
                            if (value[key].toLowerCase().indexOf(scope.bindModelKey.toLowerCase()) != -1) {
                                scope.queryOptionsList.queryData.push(value);
                            }
                        });
                    } else {
                        showOptionsList();
                    }
                }
            }

            function showOptionsList () {
                scope.bindInfo.optionsShow = true;
            }

            function hideOptionsList (val) {
                // console.log(val);
                $timeout(function () {
                    if (scope.bindInfo.query) {
                        // console.info(lastKey, e.target.value);
                        
                        if (val && val !== lastKey) {
                            var countArr = [];
                            
                            angular.forEach(scope.queryOptionsList.allData, function (value, index, item) {
                                
                                if (val === value[key]) {
                                    countArr.push(value);
                                }
                            });
                            // console.info(countArr);
                            if (countArr.length === 1) {
                                scope.bindModelKey = countArr[0][key];
                                scope.bindModelValue = countArr[0][value];
                                lastKey = countArr[0][key];

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
        }
    }
}
