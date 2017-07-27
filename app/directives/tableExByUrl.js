export default ($window, $timeout, newModal) => {
    return {
        restrict: 'EA',
        scope: {
            exUrl: '=',
            getExSearch: '&'
        },
        replace: true,
        template: '<button class="btn btn-primary" ng-click="exportTable()">'+
                       '<i class="icon iconfont">&#xe600;</i>'+
                       '导出'+
                  '</button>',
        link: function (scope, element, attrs) {

            scope.exportTable = exportTable;
            
            function exportTable() {
                var exSearch = scope.getExSearch();
                // console.log(exSearch);
                newModal.open({
                    templateUrl: require(
                        'file?name=views/common/[name].[hash].[ext]!../views/common/export_table_modal.html'
                    ),
                    resolve: {
                        passedScope: function () {
                            return {
                                exUrl: scope.exUrl
                            };
                        }
                    },
                    controller: ['$scope', 'passedScope', function ($scope, passedScope) {

                        $scope.info = {
                            offset: undefined
                        };
                        $scope.exportTableData = exportTableData;

                        function exportTableData () {
                            var exportSearchArr = dealSearchData(exSearch);
                            var exportSearchStr = '';
                            if ($scope.info.offset && $scope.info.offset > 0) {
                                exportSearchArr.push('offset='+($scope.info.offset-1));
                            }
                            if (exportSearchArr.length) {
                                exportSearchStr = '?'+exportSearchArr.join('&');
                            }
                            console.log(exportSearchArr, exportSearchStr);
                            // $window.open($window.location.origin + passedScope.exUrl);
                            $window.open('https://cmsdev.tigerwit.com' + passedScope.exUrl + exportSearchStr);
                            $scope.close();
                        }
                    }]
                });
            }

            function dealSearchData (search) {
                var exArr = [];
                angular.forEach(search, function (value, index) {
                    if (value) {
                        exArr.push(index+'='+value);
                    }
                });
                return exArr;
            }
        }
    };
}