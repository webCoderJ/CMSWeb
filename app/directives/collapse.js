/*
template:
<dl class="d-collapse">
    <dt class="d-collapse-title"></dt>
    <dd class="d-collapse-content"></dd>
</dl>


*/

var collapse = () => {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs, controller) {
            let title = element.find('dt'),
                a = title.find('a');
            a.on('click', function () {
                // content.hasClass('active') ? content.removeClass('active') : content.addClass('active');
                element.toggleClass('off');
                if (a.hasClass('icon-menuup')) {
                    a.removeClass('icon-menuup').addClass('icon-menudown');
                } else {
                    a.removeClass('icon-menudown').addClass('icon-menuup');
                }
            })
        }
    }
}

function collapseTable() {
    return {
        restrict: 'EA',
        scope:{
            'funcCall' : '=',
            'dataToShow' : '='
        },
        link: function (scope, element, attrs, controller) {
            var trigger = element.find('.collapse-trigger');
            console.log(trigger);
            trigger.on('click', function () {
                if (trigger.hasClass('icon-menuup')) {
                    trigger.removeClass('icon-menuup').addClass('icon-menudown');
                } else {
                    trigger.removeClass('icon-menudown').addClass('icon-menuup');
                }
            })
        }
    }
}


export { collapse, collapseTable };