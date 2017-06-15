/*
    可同时查询 userType userInfo
    @params
        optionsList {array}             菜单列表
        bindModelTypeKey {string}           绑定字段 Key，显示到页面
        bindModelTypeValue {string}         绑定字段 Value，同后端交互
        bindModelInfoValue
        bindOptionKey {sting}           model key 在列表中对应的name
        bindOptionValue {sting}         model value 在列表中对应的name
        bindTypeName {sting}                input name   
        bindInfoName {sting}                input name   
*/

export default ($timeout) => {
    return {
        restrict: 'A',
        scope: {
            optionsList: '=',
            bindModelTypeValue: '=',
            bindModelTypeKey: '=',
            bindModelInfoValue: '=',
            getList: '&'
        },
        replace: true,
        templateUrl: require(
                'file?name=views/common/[name].[hash].[ext]!../views/common/list_select_new_modal.html'
            ),
        link: function (scope, element, attrs) {

            scope.bindInfo = {
                typeName: attrs.bindTypeName,
                infoName: attrs.bindTypeName,
                typePlaceholder: attrs.typePlaceholder,
                infoPlaceholder: attrs.infoPlaceholder,
                optionsShow: false,
            };
            
            scope.selectOption = selectOption;
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
                scope.bindModelTypeKey = option[key];
                scope.bindModelTypeValue = option[value];
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

            function showOptionsList () {
                scope.bindInfo.optionsShow = true;
            }

            function hideOptionsList (val) {
                // console.log(val);
                $timeout(function () {

                    scope.bindInfo.optionsShow = false;
                }, 200);
            }
        }
    }
}
