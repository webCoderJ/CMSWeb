export default () => {
    return {
        restrict: 'A',
        replace: true,
        template: '<div class="loading_wrapper hide">' +
            '<div class="loading_box">' +
            '<div class="loading_bar">' +
            '<span>加载中...</span>' +
            '</div>' +
            '</div>' +
            '</div>',
        link: function(scope, element, attrs) {

            if (attrs.type === 'loading') { // 此参数为页面一加载就会loading
                element.removeClass('hide');
            }

            scope.$on('showLoadingWrapper', function() {
                element.removeClass('hide');
            });

            scope.$on('hideLoadingWrapper', function() {
                setTimeout(function() {
                    element.addClass('hide');
                }, 10);

            });
        }
    };
}
