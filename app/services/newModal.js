export default angular.module('app.new_modal', [])
    .service('newModal', ['$document', '$http', '$q', '$templateCache', '$injector', '$rootScope', '$controller', '$compile', '$timeout', function ($document, $http, $q, $templateCache, $injector, $rootScope, $controller, $compile, $timeout) {
        var service = {};

        service.open = function (options) {
            var body = $document.find('body').eq(0);
            var new_modal_backdrop = '<div class="modal-backdrop in"></div>';
            var new_modal_wrapper = '<div class="modal-new-wrapper" ng-click="close($event)"></div>'
            var new_modal_window = '<div class="modal-new-window" ng-class="{in: animate, \'modal-md\': size === \'md\', \'modal-lg\': size === \'lg\'}"></div>';
            var modalOpenClass = 'new-modal-open';

            var modalOptions = angular.extend({}, options);
            modalOptions.resolve = modalOptions.resolve || {};
            
            var templateAndResolvePromise = $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));

            templateAndResolvePromise.then(function (tplAndVars) {
                var modalScope = (modalOptions.scope || $rootScope).$new();
                var ctrlInstance, ctrlLocals = {};
                var resolveIter = 1;

                modalScope.size = modalOptions.size || 'sm';
                modalScope.close = closeModal;

                document.addEventListener('keyup',function(e){
                    if(e.keyCode == 27){
                        modalScope.close();
                    }
                })

                //controllers
                if (modalOptions.controller) {
                    ctrlLocals.$scope = modalScope;
                    angular.forEach(modalOptions.resolve, function (value, key) {
                        ctrlLocals[key] = tplAndVars[resolveIter++];
                    });

                    ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                    
                    if (modalOptions.controllerAs) {
                        modalScope[modalOptions.controllerAs] = ctrlInstance;
                    }
                }
                
                var angularBackgroundDomEl = angular.element(new_modal_backdrop);
                var modalBackgroundDomEl = $compile(angularBackgroundDomEl)(modalScope);
                var angularContentDomEl = angular.element(new_modal_window).html(tplAndVars[0]);
                var angularDomEl = angular.element(new_modal_wrapper).append(angularContentDomEl);
                var modalDomEl = $compile(angularDomEl)(modalScope);
                body.addClass(modalOpenClass);
                body.append(modalBackgroundDomEl);
                body.append(modalDomEl);

                $timeout(function () {
                    modalScope.animate = true;
                });

                function closeModal (e) {
                    if (e) {
                        if (e.target.className.indexOf("modal-new-wrapper") === -1) {
                            return;
                        }
                    }
                    modalScope.animate = false;

                    $timeout(function () {
                        modalScope.$destroy();
                        modalDomEl.remove();
                        modalBackgroundDomEl.remove();
                        body.removeClass(modalOpenClass);
                    }, 350);
                }

            });

            function getTemplatePromise(options) {
                return options.template ? $q.when(options.template) :
                    $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
                    {cache: $templateCache}).then(function (result) {
                        return result.data;
                    });
            }

            function getResolvePromises(resolves) {
                var promisesArr = [];
                
                angular.forEach(resolves, function (value) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.when($injector.invoke(value)));
                    }
                });
                return promisesArr;
            }
        };

        return service;
    }]);