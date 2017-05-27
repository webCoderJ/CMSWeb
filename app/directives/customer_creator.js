export default ($timeout, customer) => {

    return {
        restrict: 'E',
        replace: false,
        scope: {
            showFlag: '=',
            customers: '=',
            showErr: '=',
            defaultNumbers: '=' // 默认的列表 '532323;18383119323'
        },
        template: `
            <div class="customer-label clearfix" ng-show="showFlag">
                <label class="form-label align_right text-right">指定客户</label>
                <div class="content">
                    <div id="customerBox" class="customers" ng-class="{'disabled_ele':disabled}" ng-click="focusInput()">
                        <span class="user" ng-class="{succ: customer.myType, fail: !customer.myType, 'disabled_cursor': disabled}" ng-repeat="customer in customers">
                            {{ customer.user_name }}<{{ customer.myNumber }}>
                            <i class="icon iconfont" ng-click="deleteCustomer($event, $index)">&#xe604;</i>
                        </span>
                        <input type="text" 
                            name="customer" 
                            id="customerNumber" 
                            class="number" 
                            ng-class="{active: customers.length === 0}" 
                            placeholder="{{ info.placeholder.customer }}" 
                            ng-model="info.customer" 
                            ng-blur="splitNumber()" 
                            ng-change="changeWidth()" 
                            ng-focus="hideErr()"
                            ng-disabled="disabled"
                            ng-class="{'disabled':disabled}"
                            text-enter 
                            get-list="blurInput()"
                        >
                        <div ng-show="showErr && customers.length == 0">
                            <p class="alert-arrow">
                                请填写用户数据
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        link: function ($scope, element, attrs) {
            $scope.splitNumber = splitNumber;
            $scope.changeWidth = changeWidth;
            $scope.focusInput = focusInput;
            $scope.blurInput = blurInput;
            $scope.deleteCustomer = deleteCustomer;

            // 是否禁用
            if(attrs.disabled){
                $scope.disabled = true;
            } else {
                $scope.disabled = false;           
            }

            var customerNumber = document.getElementById("customerNumber");
            var customerBox = document.getElementById("customerBox");

            initializeData()
            function initializeData() {
                $scope.info = {
                    type: "all",
                    customer: undefined,
                    title: undefined,
                    content: undefined,
                    placeholder: {
                        customer: '手机号或者MT4账号，多个请用;隔开'
                    }
                };
                $scope.customers = [];
            }
            function deleteCustomer(e, index) {
                e.stopPropagation();
                if($scope.disabled){ return }
                $scope.customers.splice(index, 1);
                if ($scope.customers.length <= 0) {
                    customerNumber.style.width = '100%';
                    $scope.info.placeholder.customer = '手机号或者MT4账号，多个请用;隔开';
                } else {
                    changeWidth();
                }
            }
            function getUserAccordingNumber(number, arr) {
                customer.getUserAccordingNumber(number).then(function (data) {
                    // console.info(data);
                    if (data.data.is_succ) {
                        var extendArr = data.data.data;

                        angular.forEach(extendArr, function (value, index) {

                            if (value) {
                                extendArr[index].myNumber = arr[index];
                                extendArr[index].myType = true;
                            } else {
                                extendArr[index] = {
                                    myNumber: arr[index],
                                    myType: false
                                };
                            }
                        });
                        // console.log(extendArr);
                        $scope.customers = $scope.customers.concat(extendArr);
                        $scope.info.customer = undefined;
                        customerNumber.value = '';
                        changeWidth();
                        // console.info($scope.customers, extendArr);
                    }
                });
            }
            // 计算input内容宽度，再重新赋值input width，一个字节宽度为 100/12
            function changeWidth() {
                if ($scope.customers.length > 0) {
                    var customerBoxWidth = getStyle(customerBox, 'width') - getStyle(customerBox, 'paddingLeft') - getStyle(customerBox, 'paddingRight') || 400;
                    var customerNumberWidth = (customerNumber.value.length * 100 / 12 + 10).toFixed(2);
                    customerNumberWidth = customerNumberWidth < customerBoxWidth ? customerNumberWidth : customerBoxWidth;
                    customerNumber.style.width = customerNumberWidth + 'px';
                    $scope.info.placeholder.customer = '';
                }

                // console.info(customerNumberWidth);
            };
            function getStyle(obj, name) {
                if (obj.currentStyle) {
                    return parseInt(obj.currentStyle[name]);
                } else {
                    return parseInt(getComputedStyle(obj, false)[name]);
                }
            }
            function splitNumber() {
                var str = $scope.info.customer;
                if (str) {
                    var arr = str.split(';');
                    arr = deRepeat(arr);
                    var number = arr.join(',');
                    // console.info(number);
                    getUserAccordingNumber(number, arr);
                }
            }

            $timeout(function () {
                $scope.$watch('$scope.defaultNumbers', function () {
                    if ($scope.defaultNumbers) {
                        var tempNumbers = $scope.defaultNumbers;
                        tempNumbers = tempNumbers.replace(/\,/gi, ';');
                        if(tempNumbers.charAt(0) == ';'){
                            tempNumbers = tempNumbers.slice(1)
                        }
                        $scope.info.customer = tempNumbers;
                        console.log('customer_creator is adding defaultNumbers:' + $scope.info.customer)
                        splitNumber();
                    }
                });
            },200);

            // 去重
            function deRepeat(arr) {
                var newArr = [];
                var notRepeat = true;

                angular.forEach(arr, function (value, index) {
                    notRepeat = true;

                    angular.forEach(newArr, function (value2, index2) {
                        if (value === value2) {
                            notRepeat = false;
                        }
                    });

                    if (notRepeat) {
                        newArr.push(value);
                    }
                });

                return newArr;
            }
            function focusInput() {
                customerNumber.focus();
            }
            function blurInput() {
                customerNumber.blur();
            }
            $scope.hideErr = function () {
                $scope.showErr = false;
            }
        }
    }
}
