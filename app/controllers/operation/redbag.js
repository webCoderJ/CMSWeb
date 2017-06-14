export default function OperationRedbagController($scope, operation, $modal, newModal, $timeout, filedForDirective, $$localStorage, tableRedraw) {

    var tableOptions = [
        {
            key: '编辑复制',
            value: 'edit',
        },
        {
            key: '红包ID',
            value: 'id',
        },
        {
            key: '创建时间',
            value: 'created_at',
        },
        {
            key: '运营名称',
            value: 'operation_name',
        },
        {
            key: '红包名称',
            value: 'name',
        },
        {
            key: '红包金额',
            value: 'amount',
        },
        {
            key: '有效期',
            value: 'valid_time',
        },
        {
            key: '领取有效期',
            value: 'valid_acquire',
        },
        {
            key: '领取方式',
            value: 'acquire_mode',
        },
        {
            key: '领取用户',
            value: 'user_type',
        },
        {
            key: '领取触发条件',
            value: 'acquire_condition',
        },
        {
            key: '兑换条件',
            value: 'pay_condition',
        },
        {
            key: '第三方是否可领取',
            value: 'is_third',
        },
        {
            key: '限制出金',
            value: 'pay_out',
        },
        {
            key: 'CFD是否参与',
            value: 'cfd',
        },
        {
            key: '红包数量',
            value: 'num',
        },
        {
            key: '已领取数',
            value: 'receive_num',
        },
        {
            key: '已兑换数',
            value: 'converted_num',
        },
        {
            key: '计时池',
            value: 'diff_time',
        },
        {
            key: '操作/状态',
            value: 'handle',
        }
    ];
    var pagesize;

    $scope.redbagConf = {
        optionList: tableOptions
    };
    $scope.storageFrontKey = 'operation_redbag';
    $scope.table = {};
    filedForDirective.createPageFiled($scope, 'PageRedbag', getRedbagList);
    $scope.info = { //查询条件
        anyway: '',
        timePicker: {
            start: undefined,
            end: undefined
        },
        redbagStatus: {
            key: '',
            value: ''
        }
    };

    $scope.redbagStatusList = [
        {
            key: '全部',
            value: 0
        },
        {
            key: '未生效',
            value: 1
        },
        {
            key: '已生效',
            value: 2
        },
        {
            key: '已过期',
            value: 3
        },
        {
            key: '已失效',
            value: 4
        },
    ]

    $scope.redbagList = [];

    $scope.getRedbagList = getRedbagList;

    getRedbagList();
    tableRedraw.setTableStyleBase();

    function getRedbagList(page) {
        page = page ? page : 1;
        pagesize = $$localStorage.setPagesizeLocalStorage();
        $scope.page = page;
        $scope.success = false;
        $scope.$emit('showLoadingWrapper');
        // 用于计时器的刷新 - 通知time-counter指令
        $scope.$broadcast('getRedbagList');
        var offset = (page - 1) * pagesize;
        operation.getRedbagList({
            startDate: $scope['info']['timePicker']['start'] || null,
            endDate: $scope.info.timePicker.end || null,
            anyway: $scope.info.anyway || null,
            status: $scope.info.redbagStatus.value || null,
            offset: offset,
            limit: pagesize
        }).then(function (data) {
            $$localStorage.setTableLocalStorage($scope.storageFrontKey, $scope.table);
            $scope.success = true;
            $scope.$emit('hideLoadingWrapper');

            var return_data = data;
            if (return_data && return_data.is_succ) {
                return_data = return_data.data;
                $scope.redbagList = return_data.data;
                angular.extend($scope.PageRedbag, {
                    totalCount: return_data.total,
                    totalPage: Math.ceil(return_data.total / pagesize),
                    currentPage: page,
                    limit: pagesize
                });

                tableRedraw.setTableStyle();
            }
        });
    }


    // 修改红包数量
    $scope.redbagNum = undefined;
    $scope.modRedbagNum = function (redbag) {
        if (redbag.status != 2) {
            return;
        }
        $scope.redbagNum = redbag.num || 0;
        redbag.isRbModNumLoading = false;
        redbag.rbInEdit = true;
        redbag.modNumErr = {
            show: false,
            msg: ''
        }
    }
    $scope.comfirmModRedbagNum = function (redbag) {
        redbag.isRbModNumLoading = true;
        operation.redbagUpdata_num(redbag.id, redbag.num).then(function (data) {
            redbag.isRbModNumLoading = false;
            var res = data;
            if (res.is_succ) {
                redbag.rbInEdit = false;
            } else {
                redbag.rbInEdit = true;
                redbag.modNumErr.show = true;
                redbag.modNumErr.msg = res.message;
            }
        });
    }

    $scope.cancelModRedbagNum = function (redbag) {
        redbag.rbInEdit = false;
        redbag.num = $scope.redbagNum;
    }

    $scope.activeOrFaden = function (type, redbag) {
        $scope.redbagConfirmInfo = {
            type: type,
            redbag: redbag
        }
        newModal.open({
            templateUrl: require(
                'file?name=views/operation/[name].[hash].[ext]!../../views/operation/redbag_message_modal.html'
            ),
            resolve: {
                passedScope: function () {
                    return $scope.redbagConfirmInfo
                }
            },
            controller: ['$scope', 'passedScope', 'operation', function ($scope, passedScope, operation) {
                $scope.redbagConfirmInfo = passedScope;
                var type = $scope.redbagConfirmInfo.type;
                //console.log($scope.redbagConfirmInfo);

                $scope.confirm = function () {
                    if ($scope.isSubmitting) {
                        return;
                    }
                    $scope.isSubmitting = true;
                    operation['modRedbagStatus']($scope.redbagConfirmInfo.redbag.id, type == 'active' ? 2 : 1).then(function (data) {
                        //console.info(data);
                        if (data.is_succ) {
                            //getRedbagList(page);
                            $scope.close();
                            redbag.status = type == 'active' ? 2 : 4;
                        } else {
                            $scope.isSubmitting = false;
                            $scope.backErr = {
                                show: true,
                                msg: data.err_msg
                            };
                        }
                    });
                }
            }]
        });
    }

    $scope.redbagPreview = function (infoItem) {
        // $scope.$emit('showLoadingWrapper');
        $modal.open({
            templateUrl: require(
                'file?name=views/operation/[name].[hash].[ext]!../../views/operation/redbag_preview_modal.html'
            ),
            size: 'lg',
            backdrop: true,
            resolve: {
                passedScope: function () {
                    return {
                        page: $scope.page
                    };
                }
            },
            controller: ['$scope', '$timeout', '$modalInstance', 'newModal', 'passedScope', function ($scope, $timeout, $modalInstance, newModal, passedScope) {
                operation.getRedbagDetail(infoItem.id).then(function (data) {
                    // $scope.$emit('hideLoadingWrapper');
                    var res = data;
                    //console.log(res);
                    var resData = res.data;
                    $scope.whoGet = {
                        showFlag: false,
                        customerList: [],
                        defaultSpUsers: ''
                    }

                    if (res.is_succ) {
                        $scope.redbagInfo = {
                            opName: {
                                value: resData.operation_name,
                                isRepeat: false

                            },
                            rbName: {
                                value: resData.name,
                            },
                            rbDes: {
                                value: resData.desc || '未填写'
                            },
                            rbSize: {
                                value: resData.amount
                            },
                            rbAmount: {
                                value: resData.num
                            },
                            rbUseTime: {
                                start: resData.valid_start,
                                end: resData.valid_end
                            },
                            trigger_condition: {
                                key: infoItem.acquire_condition,
                                value: resData.acquire_condition
                            },
                            getWay: resData.acquire_mode,
                            whoCanGet: {
                                key: infoItem.user_type,
                                value: resData.user_type
                            },
                            rbAvailableDurantion: {
                                start: resData.acquire_start,
                                end: resData.acquire_end
                            },
                            rbExchangeCondition: {
                                key: infoItem.pay_condition,
                                value: resData.pay_condition
                            },
                            rbExDuration: resData.pay_expire,
                            isThird: resData.is_third,
                            payOut: resData.pay_out,
                            isCFD: resData.cfd,
                            isInBagPool: resData.visible,
                            comment: resData.comment || '未填写'
                        };

                        angular.extend($scope.whoGet, {
                            defaultSpUsers: resData.special_user || undefined,
                            showFlag: (!!resData.special_user) ? true : false
                        })
                    }
                });

                function closeModal() {
                    $modalInstance.dismiss();
                }

                function showErr(name) {
                    if ($scope.frontErr[name]) {
                        $scope.frontErr[name]["show"] = true;
                    }
                }
            }]
        });
    }

    $scope.redbagHandle = function (hdType, infoItem) {
        // console.log(hdType);
        $modal.open({
            templateUrl: require(
                'file?name=views/operation/[name].[hash].[ext]!../../views/operation/redbag_modal.html'
            ),
            size: 'lg',
            backdrop: true,
            resolve: {
                passedScope: function () {
                    return {
                        page: $scope.page
                    };
                }
            },
            controller: ['$scope', '$timeout', '$modalInstance', 'newModal', 'passedScope', function ($scope, $timeout, $modalInstance, newModal, passedScope) {
                $timeout(function () {
                    $scope.$emit('hideLoadingWrapper');
                }, 100)

                $scope.hdType = hdType;
                $scope.checkOpName = checkOpName;

                getSelections();
                function getSelections() {
                    //可领取用户类
                    $scope.whoCanGetList = [];
                    //触发条件
                    $scope.trigger_condition = [];
                    //兑换条件LIST
                    $scope.rbExchangeCondition = [];

                    operation.getRedagSelections().then(function (data) {
                        var res = data;
                        if (res.is_succ) {
                            angular.forEach(res.data.userType, function (item, index) {
                                // console.log(item);
                                $scope.whoCanGetList.push({
                                    key: item,
                                    value: index
                                })
                            });

                            angular.forEach(res.data.acquireCondition, function (item, index) {
                                // console.log(item);
                                $scope.trigger_condition.push({
                                    key: item,
                                    value: index
                                })
                            });

                            angular.forEach(res.data.payCondition, function (item, index) {
                                // console.log(item);
                                $scope.rbExchangeCondition.push({
                                    key: item,
                                    value: index
                                })
                            });
                        }
                    })
                }

                //表单数据
                $scope.redbagInfo = {
                    opName: {
                        value: '',
                        isRepeat: false
                    },
                    rbName: {
                        value: ''
                    },
                    rbDes: {
                        value: ''
                    },
                    rbSize: {
                        value: ''
                    },
                    rbAmount: {
                        value: ''
                    },
                    rbUseTime: {
                        start: undefined,
                        end: undefined
                    },
                    getWay: 1,
                    trigger_condition: {
                        key: undefined,
                        value: undefined
                    },
                    whoCanGet: {
                        key: undefined,
                        value: undefined
                    },
                    rbAvailableDurantion: {
                        start: undefined,
                        end: undefined
                    },
                    rbExchangeCondition: {
                        key: undefined,
                        value: undefined
                    },
                    rbExDuration: '',
                    isThird: 0,
                    payOut: 1,
                    isCFD: 0,
                    isInBagPool: '1',
                    comment: '',
                    defaultSpUsers: undefined
                }

                $scope.whoGet = {
                    showFlag: false,
                    customerList: [],
                }

                //重置Info
                if (hdType && hdType != 'create') {
                    operation.getRedbagDetail(infoItem.id).then(function (data) {
                        var res = data;
                        //console.log(res);
                        var resData = res.data;
                        //重置Info
                        //console.log(resData.valid_start);
                        if (res.is_succ) {
                            $scope.redbagInfo = {
                                opName: {
                                    value: resData.operation_name,
                                    isRepeat: false

                                },
                                rbName: {
                                    value: resData.name,
                                },
                                rbDes: {
                                    value: resData.desc
                                },
                                rbSize: {
                                    value: resData.amount
                                },
                                rbAmount: {
                                    value: resData.num
                                },
                                rbUseTime: {
                                    start: resData.valid_start,
                                    end: resData.valid_end
                                },
                                trigger_condition: {
                                    key: infoItem.acquire_condition,
                                    value: resData.acquire_condition
                                },
                                getWay: resData.acquire_mode,
                                whoCanGet: {
                                    key: infoItem.user_type,
                                    value: resData.user_type
                                },
                                rbAvailableDurantion: {
                                    start: resData.acquire_start,
                                    end: resData.acquire_end
                                },
                                rbExchangeCondition: {
                                    key: infoItem.pay_condition,
                                    value: resData.pay_condition
                                },
                                rbExDuration: resData.pay_expire,
                                isThird: resData.is_third,
                                payOut: resData.pay_out,
                                isCFD: resData.cfd,
                                isInBagPool: resData.visible,
                                comment: resData.comment
                            };

                            angular.extend($scope.whoGet, {
                                defaultSpUsers: resData.special_user || undefined
                            })

                            //console.log('resData.acquire_mode', resData.acquire_mode);
                            $scope.setAuto(resData.acquire_mode);

                            // 复制的时候检测运营名称重复
                            if (hdType && hdType == 'copy') {
                                $scope.checkOpName();
                            }
                        }
                    });
                }

                $scope.setAuto = function (type) {
                    //领取方式 1-自动，2-手动， 默认自动
                    //console.log($scope.redbagForm);
                    if (type == '1') {
                        $scope.redbagInfo.getWay = 1;

                        if (!$scope.redbagInfo.trigger_condition.value) {
                            $timeout(function () {
                                $scope.redbagForm.trigger_condition.$setValidity('required', false);
                            });
                        } else {
                            $timeout(function () {
                                console.log($scope.redbagForm);
                                $scope.redbagForm.trigger_condition.$setValidity('required', true);
                            });
                        }
                        return '1'
                    }
                    else if (type == '2') {
                        $scope.redbagInfo.getWay = 2;
                        //手动默认通过
                        $timeout(function () {
                            $scope.redbagForm.trigger_condition.$setValidity('required', true);
                        });

                        // 切换之后清除之前的选择
                        // $scope.redbagInfo.trigger_condition = {
                        //     key: undefined,
                        //     value: undefined
                        // }
                        return '2'
                    }
                }

                //监听领取用户类型，控制相应对象显示
                $scope.$watch('redbagInfo.whoCanGet', function (newVal, oldVal) {
                    //console.log('change');
                    if (newVal.key && newVal.value == 2) {
                        $scope.whoGet.showFlag = true;
                    } else {
                        $scope.whoGet.showFlag = false;
                    }
                }, true);

                //前端错误信息
                $scope.frontErr = {
                    //表单错误
                    opName: {
                        show: false,
                        isRepeat: false
                    },
                    rbName: {
                        show: false
                    },
                    rbDes: {
                        show: false
                    },
                    rbSize: {
                        show: false
                    },
                    rbAmount: {
                        show: false
                    },
                    rbUseTime: {
                        show: false,
                        msg: '请选择红包有效期'
                    },
                    rbAvailableDurantion: {
                        show: false,
                        msg: '请输入领取期限'
                    },
                    whoCanGet: {
                        show: false
                    },
                    trigger_condition: {
                        show: false
                    },
                    spUser: {
                        show: false
                    },
                    rbExchangeCondition: {
                        show: false
                    },
                    rbExDuration: {
                        show: false
                    },
                    isCFD: {
                        show: false
                    },
                    isInBagPool: {
                        show: false
                    },
                    comment: {
                        show: false
                    },
                };

                //监听红包有效期变化，需要大于当前时间24小时
                $scope.$watch('redbagInfo.rbUseTime.start', function (newVal, oldVal) {
                    if (!newVal && !oldVal) return;
                    $scope.checkRbUseTime(newVal)
                    // 当领取有效期非空的时候检测是否逾期
                    if ($scope.redbagInfo.rbAvailableDurantion.start) {
                        $timeout(function () {
                            $scope.checkrRbAvailableDurantion($scope.redbagInfo.rbAvailableDurantion.start, $scope.redbagInfo.rbAvailableDurantion.end)
                        })
                    }
                }, true);
                $scope.$on('timeModelChange', function () {
                    console.log('timeModelChange');
                    $scope.checkrRbAvailableDurantion($scope.redbagInfo.rbAvailableDurantion.start, $scope.redbagInfo.rbAvailableDurantion.end)
                })
                $scope.$watch('redbagInfo.rbAvailableDurantion', function (newVal, oldVal) {
                    $scope.checkrRbAvailableDurantion(newVal.start, newVal.end)
                }, true);
                $scope.checkRbUseTime = function (checkTime) {
                    var startTimeStamp = new Date(checkTime).getTime()
                    // console.log('startTimeStamp', startTimeStamp);
                    var forwardTimeStamp = (new Date()).getTime() + 86220000;
                    // console.log('forwardTimeStamp', forwardTimeStamp);
                    if (startTimeStamp < forwardTimeStamp) {
                        console.log('selfDefineError: startTimeStamp < forwardTimeStamp');
                        if (!$scope.$$phase) {
                            $scope.$apply(function () {
                                $scope.frontErr.rbUseTime = {
                                    show: true,
                                    msg: '红包有效期必须在当前时间24小时之后'
                                }
                            })
                        } else {
                            $scope.frontErr.rbUseTime = {
                                show: true,
                                msg: '红包有效期必须在当前时间24小时之后'
                            }
                        }
                        return false
                    } else {
                        if (!$scope.$$phase) {
                            $scope.$apply(function () {
                                $scope.frontErr.rbUseTime = {
                                    show: false,
                                    msg: '请选择红包有效期'
                                }
                            })
                        }
                        return true;
                    }
                }

                function getTimeStamp(dateStr) {
                    // console.log('moment',(new Date(moment(dateStr, 'YYYY-MM-DD HH:mm:ss').toDate())).getTime());
                    return (new Date(moment(dateStr, 'YYYY-MM-DD HH:mm:ss').toDate())).getTime();
                }

                $scope.checkrRbAvailableDurantion = function (startTime, endTime) {
                    var result = false;

                    if (!$scope.redbagInfo.rbAvailableDurantion.start) {
                        // console.log('$scope.redbagInfo.rbAvailableDurantion.start',$scope.redbagInfo.rbAvailableDurantion.start);
                        return
                    }

                    if ($scope.redbagInfo.rbUseTime.start && $scope.redbagInfo.rbUseTime.end) {
                        // console.log($scope.redbagInfo.rbUseTime.start)
                        var startTimeStamp = getTimeStamp($scope.redbagInfo.rbUseTime.start);
                        // var startTimeStamp = (new Date($scope.redbagInfo.rbUseTime.start)).getTime();
                        // console.log('startTimeStamp', startTimeStamp)
                        var endTimeStamp = getTimeStamp($scope.redbagInfo.rbUseTime.end)
                        // var endTimeStamp = (new Date($scope.redbagInfo.rbUseTime.start)).getTime();
                        // console.log('endTimeStamp', endTimeStamp)
                        var durationStartTimeStamp = getTimeStamp(startTime)
                        // var durationStartTimeStamp = (new Date(startTime)).getTime();
                        // console.log('durationStartTimeStamp', durationStartTimeStamp)
                        var durationEndTimeStamp = getTimeStamp(endTime);
                        // var durationEndTimeStamp = (new Date(endTime)).getTime();
                        // console.log('durationEndTimeStamp', durationEndTimeStamp)
                        console.log(durationStartTimeStamp >= startTimeStamp && endTimeStamp >= durationEndTimeStamp);
                        if (durationStartTimeStamp >= startTimeStamp && endTimeStamp >= durationEndTimeStamp) {
                            result = true;
                            if (!$scope.$$phase) {
                                $scope.$apply(function () {
                                    $scope.frontErr.rbAvailableDurantion = {
                                        show: false,
                                        msg: '请输入领取期限'
                                    }
                                })
                            }
                        } else {
                            result = false;
                            if (!$scope.$$phase) {
                                $scope.$apply(function () {
                                    $scope.frontErr.rbAvailableDurantion = {
                                        show: true,
                                        msg: '领取有效期必须在红包有效期之内'
                                    }
                                });

                            }
                        }
                        return result;
                    }
                }

                $scope.backErr = {
                    show: false,
                    msg: ''
                };

                //运营名称重复检测
                $scope.saveOriginOpName = function () {
                    $scope.origin_opName = $scope.redbagInfo.opName.value;
                }
                function checkOpName() {
                    if (!$scope.redbagInfo.opName.value) {
                        $scope.frontErr.opName.isRepeat = false;
                        return;
                    };
                    if (hdType && hdType == 'edit' && $scope.redbagInfo.opName.value == $scope.origin_opName) return;
                    operation.checkOpName($scope.redbagInfo.opName.value || '').then(function (data) {
                        var res = data;
                        if (res.is_succ) {
                            $scope.frontErr.opName.isRepeat = false;
                            $scope.redbagForm.opName.$setValidity('required', true);
                        }
                        else {
                            $scope.frontErr.opName.isRepeat = true;
                            $scope.redbagForm.opName.$setValidity('required', false);
                        }
                    })
                }

                $scope.closeModal = closeModal;
                $scope.submitForm = submitForm;
                $scope.showErr = showErr;
                $scope.hideErr = hideErr;

                function submitForm() {
                    showErr('opName');
                    showErr('rbName');
                    showErr('rbDes');
                    showErr('rbSize');
                    showErr('rbAmount');
                    showErr('spUser');
                    showErr('rbExchangeCondition');
                    showErr('rbExDuration');
                    showErr('isCFD');
                    showErr('isInBagPool');
                    showErr('comment');
                    console.log($scope.redbagForm);
                    if ($scope.redbagInfo.whoCanGet.value != 2) {
                        showErr('whoCanGet');
                    }

                    //领取方式 1-自动，2-手动
                    if ($scope.redbagInfo.getWay == 1) {
                        if (!$scope.redbagForm.trigger_condition.value) {
                            $scope.frontErr.trigger_condition.show = true;
                            //showErr('trigger_condition');
                        } else {
                            $scope.frontErr.trigger_condition.show = false;
                        }
                    } else if ($scope.redbagInfo.getWay == 2) {
                        $scope.frontErr.trigger_condition.show = false;
                    }

                    if (hdType && hdType != 'edit') {
                        // 检测在非编辑状态下红包有效期是否在24小时之后
                        if (!$scope.checkRbUseTime($scope.redbagInfo.rbUseTime.start)) {
                            $scope.frontErr.rbUseTime.show = false;
                        }
                        if (!$scope.checkrRbAvailableDurantion($scope.redbagInfo.rbAvailableDurantion.start, $scope.redbagInfo.rbAvailableDurantion.start)) {
                            $scope.frontErr.rbAvailableDurantion.show = true;
                        }
                    }

                    //检测红包有效期为空 return
                    if (!$scope.redbagInfo.rbUseTime.start && !$scope.redbagInfo.rbUseTime.end) {
                        // showErr('rbUseTime');
                        $scope.frontErr.rbUseTime.show = true;
                    }
                    // 检测红包领取有效期是否为空
                    if (!$scope.redbagInfo.rbAvailableDurantion.start) {
                        // showErr('rbAvailableDurantion');
                        $scope.frontErr.rbAvailableDurantion.show = true;
                    }

                    // 解析特殊领取用户列表
                    parseCustomers()
                    function parseCustomers() {
                        if ($scope.redbagInfo.whoCanGet.value != 2) {
                            return undefined;
                        }
                        //console.log($scope.whoGet.customerList);
                        var result = '';
                        angular.forEach($scope.whoGet.customerList, function (item, index) {
                            if (item.myType) {
                                result += item.myNumber + ';';
                            }
                        })
                        //console.log(result);
                        return result;
                    }

                    // 检测表单合法性
                    if ($scope.redbagForm.$invalid) {
                        return;
                    }

                    // 检测两个特殊状态 /未纳入ng-form
                    var rbUseTime = $scope.frontErr.rbUseTime.show;
                    var rbAvailableDurantion = $scope.frontErr.rbAvailableDurantion.show;
                    if (rbUseTime || rbAvailableDurantion) {
                        console.log('selfDefineError: spWords unPass')
                        return;
                    }

                    // 打开对话框
                    newModal.open({
                        templateUrl: require(
                            'file?name=views/operation/[name].[hash].[ext]!../../views/operation/redbag_message_modal.html'
                        ),
                        resolve: {
                            passedScope: function () {
                                return {
                                    hdType: hdType,
                                    redbagInfo: $scope.redbagInfo
                                }
                            }
                        },
                        controller: ['$scope', 'passedScope', 'operation', function ($scope, passedScope, operation) {
                            $scope.modalName = 'confirmSubmit'
                            $scope.isSubmitting = false;
                            $scope.hdType = passedScope.hdType
                            $scope.closeAll = function () {
                                closeModal();
                                $scope.close();
                            };
                            $scope.redbagInfo = passedScope.redbagInfo;

                            $scope.cancelSubmit = function () {
                                $scope.close();
                            }

                            $scope.submitForm = function () {
                                // $scope.close();
                                $scope.isSubmitting = true;
                                $scope.$emit('showLoadingWrapper');
                                operation[hdType == 'edit' ? 'updataRedbag' : 'createRedbag']({
                                    bonusId: infoItem ? infoItem.id : '',
                                    bonusName: $scope.redbagInfo.rbName.value,
                                    operationName: $scope.redbagInfo.opName.value,
                                    desc: $scope.redbagInfo.rbDes.value,
                                    amout: $scope.redbagInfo.rbSize.value,
                                    num: $scope.redbagInfo.rbAmount.value,
                                    validStart: $scope.redbagInfo.rbUseTime.start,
                                    validEnd: $scope.redbagInfo.rbUseTime.end,
                                    acquireMode: $scope.redbagInfo.getWay,
                                    userType: $scope.redbagInfo.whoCanGet.value,
                                    specialUser: parseCustomers() || undefined,
                                    acquireCondition: $scope.redbagInfo.trigger_condition.value,
                                    acquireStart: $scope.redbagInfo.rbAvailableDurantion.start,
                                    acquireEnd: $scope.redbagInfo.rbAvailableDurantion.end,
                                    payCondition: $scope.redbagInfo.rbExchangeCondition.value,
                                    payExpire: $scope.redbagInfo.rbExDuration,
                                    cfd: $scope.redbagInfo.isCFD,
                                    visible: $scope.redbagInfo.isInBagPool,
                                    comment: $scope.redbagInfo.comment || '',
                                    isThird: $scope.redbagInfo.isThird || '',
                                    payOut: $scope.redbagInfo.payOut || '',
                                }).then(function (resData) {
                                    $scope.$emit('hideLoadingWrapper');
                                    var res = resData;
                                    $scope.modalName = 'MSG'
                                    $scope.hdType = passedScope.hdType
                                    $scope.res = res;
                                    $scope.is_succ = res.is_succ;
                                    $scope.backErrMsg = res.err_msg || '';
                                    $scope.isSubmitting = false;
                                    getRedbagList();
                                });
                            }
                        }]
                    });
                }

                function closeModal() {
                    $modalInstance.dismiss();
                }

                function showErr(name) {
                    if ($scope.frontErr[name]) {
                        $scope.frontErr[name]["show"] = true;
                    }
                }

                function hideErr(name) {

                    $scope.backErr = {
                        show: false,
                        msg: ''
                    };

                    $scope.realTimeErr = false;

                    if ($scope.frontErr[name]) {
                        $scope.frontErr[name]["show"] = false;
                    }
                }
            }]
        });
    }

    $scope.openReceiveModal = (redbag, type) => {
        $modal.open({
            templateUrl: require(
                'file?name=views/operation/[name].[hash].[ext]!../../views/operation/redbag_receive_modal.html'
            ),
            size: 'lg',
            backdrop: true,
            resolve: {
                passedScope: function () {
                    return {
                        redbag: redbag,
                        type: type
                    };
                }
            },
            controller: ['$scope', '$timeout', '$modalInstance', 'newModal', 'passedScope', '$state', '$location', '$urlRouter',
                function ($scope, $timeout, $modalInstance, newModal, passedScope, $state, $location, $urlRouter) {
                    $scope.passedScope = passedScope;
                    $scope.pageRedbagReceive = {
                        needPrevAndNext: 0,
                        needFirstAndLast: 0,
                        needDotsLinks: 1,
                        limit: 20,
                        selectPage: function () {
                            getReceiveList(this.currentPage);
                        }
                    }

                    $scope.closeModal = function () {
                        $modalInstance.dismiss();
                    }

                    $scope.receiveList = [];
                    $scope.getReceiveList = getReceiveList;
                    getReceiveList();
                    function getReceiveList(page) {
                        page = page ? page : 1;
                        var pagesize = $$localStorage.setPagesizeLocalStorage();
                        $scope.page = page;
                        $scope.success = false;
                        $scope.$emit('showLoadingWrapper');
                        var offset = (page - 1) * pagesize;
                        operation.getReceiveList({
                            bonusId: $scope.passedScope.redbag.id,
                            type: $scope.passedScope.type,
                            offset: offset,
                            limit: pagesize
                        }).then(function (data) {
                            var return_data = data;
                            if (return_data && return_data.is_succ) {
                                $scope.success = true;
                                $scope.$emit('hideLoadingWrapper');
                                $scope.receiveList = return_data.data.data;
                                angular.extend($scope.pageRedbagReceive, {
                                    totalCount: return_data.data.total,
                                    totalPage: Math.ceil(return_data.data.total / pagesize),
                                    currentPage: page,
                                    limit: pagesize
                                });
                            } else {
                                alert('网络错误,请联系管理员！')
                            }
                        });
                    }

                    $scope.skipToMarket = function skipToMarket(cell) {
                        
                        var url = $state.href('market.subpage', {
                            subpage: 'mlist',
                            search: cell.user_name
                        })
                        window.open(url, '_blank');
                    };
                }]
        });
    }
}

OperationRedbagController.$inject = ['$scope', 'operation', '$modal', 'newModal', '$timeout', 'filedForDirective', '$$localStorage', 'tableRedraw'];
