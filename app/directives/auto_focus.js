export default () => {
    return {
        restrict: 'EA',
        link: function(scope, element) {
            element[0].focus();
        }
    }
}