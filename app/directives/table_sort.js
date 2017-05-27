export default () => {
    return {
        restrict: 'A',
        scope: {
            tableSortInfo: '=',
            getList: '&getList'
        },
        replace: true,
        template: '<th class="sort-option" ' +
                       'ng-click="sortOption()" ' +
                       'ng-class="{\'sort-asc\': tableSortInfo.sort === bindSort && tableSortInfo.order === \'asc\', \'sort-desc\': tableSortInfo.sort === bindSort && tableSortInfo.order === \'desc\'}">'+
                      '{{ bindText }}'+
                      '<span class="icon-box">' + 
                          '<i class="iconfont icon-sortup"></i>' +
                          '<i class="iconfont icon-sortdown"></i>' +
                      '</span>' +
                  '</th>',
        link: function (scope, element, attrs) {
            scope.bindText = attrs.bindText;
            scope.bindSort = attrs.bindSort;
            
            scope.sortOption = sortOption;

            function sortOption () {
                
                if (scope.tableSortInfo.sort === scope.bindSort) {
                    scope.tableSortInfo.order = scope.tableSortInfo.order === 'desc' ? 'asc' : 'desc'; 
                } else {
                    scope.tableSortInfo.sort = scope.bindSort;
                    scope.tableSortInfo.order = 'desc';
                }
                // console.info(scope.bindSort, scope.tableSortInfo);
                scope.getList();
            }
        }
    };
}