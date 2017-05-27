export default ($timeout) => {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.addClass('tw-tr-animate');
            element.addClass('tw-tr-animate-origin');
            $timeout(function () {
                element.addClass('tw-tr-animate-active');
            }, 50);

            function removeEffect() {
                element.removeClass('tw-tr-animate');
                element.removeClass('tw-tr-animate-origin');
                element.removeClass('tw-tr-animate-active');
            }

            $timeout(function(){
                removeEffect();
            },500);
        }
    }
}
