/*
 *  table-select    用来显示或者隐藏table列表中的选项
 *  table-conf ->   
 *      optionList  列表的所有选项，key代表显示的中文名称，value是对应的英文字段，要与html页面中的对应一致
 *      dropDownList    控制dropdown-menu的显示、隐藏
 *  table   控制列表的所有选项
 *  setLocalStorage     设置localStorage
 *
 */


export default (tableRedraw) => {
    class TableSelect {
        constructor(conf) {
            Object.assign(this, {
                optionList: conf.optionList || [],
                dropDownList: conf.dropDownList || false
            })
            
        }

        showDropDownList(e) {
            e.stopPropagation();
            this.dropDownList = !this.dropDownList;
        }
        
    }
    return {
        restrict: 'EA',
        scope: {
            tableConf: '=',
            table: '=',
            tableFrontKey: '='
        },
        replace: true,
        template: 
        '<div class="btn-info-box">' +
            '<button class="btn btn-info" ng-click="tableSelect.showDropDownList($event)">' +
                '<i class="icon iconfont">&#xe607;</i>' +
            '</button>' +
            '<ul class="dropdown-menu" ng-class="{hide: !tableSelect.dropDownList}">' +
                '<li ng-repeat="option in tableSelect.optionList">' +
                    '<label>' +
                        '<input type="checkbox"' +
                               'ng-checked="table[option[\'value\']]"' +
                               'ng-init="table[option[\'value\']] = true"' +
                               'ng-model="table[option[\'value\']]"' +
                               'ng-click="setLocalStorage(option.value)">' +
                        ' {{ option.key }}' +
                    '</label>' +
                '</li>' +
            '</ul>' +
        '</div>',
        link: function(scope, element, attrs, controller) {
            scope.tableSelect = new TableSelect(scope.tableConf);

            scope.setLocalStorage = setLocalStorage;

            var $document = angular.element(document);
            var $dropDownList = angular.element(document.querySelector('.dropdown-menu'));

            $document.on('click', function(e) {
                scope.$apply(function () {
                    if (e.target.tagName === 'LABEL' || e.target.type === 'checkbox' || e.target.className ===
                    'dropdown-menu') return;
                    scope.tableSelect.dropDownList = false;
                });
            });

            function setLocalStorage (name) {
                console.log(scope.tableFrontKey);
                if (!localStorage.getItem(scope.tableFrontKey)) {
                    localStorage.setItem(scope.tableFrontKey, "{}");
                }
                var storagePool = JSON.parse(localStorage[scope.tableFrontKey]);
                storagePool[name] = scope.table[name];
                localStorage[scope.tableFrontKey] = JSON.stringify(storagePool);

                tableRedraw.setTableStyle();
            }
        }
    }
}