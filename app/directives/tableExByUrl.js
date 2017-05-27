export default ($window) => {
    return {
        restrict: 'EA',
        scope: {
            exUrl: '=',
            exSearch: '='
        },
        replace: true,
        link: function (scope, element, attrs) {
            let processTime = (time) => {
                var create_time;
                if ((time["start"] === undefined || time["start"] === '') && (time["end"] === undefined || time["end"] === '')) {
                    create_time = '';
                } else if (time["start"] === undefined || time["start"] === '') {
                    create_time = '' + ',' + time["end"];
                } else if (time["end"] === undefined || time["end"] === '') {
                    create_time = time["start"];
                } else {
                    create_time = time["start"] + ',' + time["end"];
                }
                return create_time;
            }

            let exHandle = () => {
                var dataStr = '?';
                var dataArrray = [];
                angular.forEach(scope.exSearch, function (value, index) {
                    console.log(index);
                    switch (index) {
                        case 'relation':
                            if (value.value !== undefined) {
                                dataArrray.push('user_affiliation=' + value.value);
                            }
                            break;
                        case 'status':
                            if (value.value !== undefined) {
                                dataArrray.push('status=' + value.value);
                            }
                            break;
                        case 'classify':
                            if (value.value !== undefined) {
                                dataArrray.push('classify=' + value.value);
                            }
                            break;
                        case 'anyway':
                            if (value.value !== undefined && value.value !== '') {
                                dataArrray.push('anyway=' + value.value);
                            }
                            break;
                        case 'time':
                            var register_time;
                            register_time = processTime(value);
                            if (register_time !== '') {
                                dataArrray.push('register_time=' + register_time);
                            }
                            break;
                        case 'month':
                            if (value != undefined) {
                                dataArrray.push('month=' + value);
                            }
                            break;
                        default:
                            break;
                    }
                });

                dataStr += dataArrray.join('&');

                // console.info($window.location.origin + scope.exUrl + dataStr);
                $window.open($window.location.origin + scope.exUrl + dataStr);
            }

            element.on('click', exHandle);
        }
    };
}