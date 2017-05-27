export default () => {
    return {
        restrict: 'A',
        scope: {
            getList: '&getList'
        },
        link: function (scope, element, attrs) {
            element.on('keydown', function (e) {
                if (e.keyCode == 13) {
                    scope.getList();
                }
            });
            
        }
    }
}
