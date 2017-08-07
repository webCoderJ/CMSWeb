export default function DetailModalController($scope, $location, $modalInstance, passedScope, common, layer, $$localStorage) {
    
    $scope.modalDetail = 'summary';
    $scope.detail = {};
    $scope.tagManager = false;
    $scope.detailReal = {
        show: false,
        data: {}
    };
    $scope.changeModalDetail = changeModalDetail;
    $scope.closeModal = closeModal;
    $scope.collapseTable = collapseTable;
    $scope.addTagforMaster = addTagforMaster;
    $scope.deleteTagforMaster = deleteTagforMaster;

    var customerInfo = passedScope.customerInfo;
    customerInfo.mt4_id = customerInfo.mt4_id || customerInfo.mt4_real;
    var pagesize = $$localStorage.setPagesizeLocalStorage();

    if ($location.url().indexOf('ranklist') !== -1) {
        $scope.tagManager = true;
    }

    $scope.pageCurrent = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        selectPage: function () {
            getMt4TradeList(this.currentPage, 1);
        }
    };
    $scope.pageHistory = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        selectPage: function () {
            getMt4TradeList(this.currentPage, -1);
        }
    };
    $scope.pageCallback = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        selectPage: function () {
            getCallbackList(this.currentPage);
        }
    };
    $scope.pageCopyCurrent = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        selectPage: function () {
            getCurCopyMasters(this.currentPage);
        }
    };
    $scope.pageCopyHistory = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        selectPage: function () {
            getHisCopyMasters(this.currentPage);
        }
    };
    $scope.pageFollowCurrent = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        selectPage: function () {
            getFollowCurrent(this.currentPage);
        }
    };
    $scope.pageFollowHistory = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        selectPage: function () {
            getFollowHistory(this.currentPage);
        }
    };
    $scope.pageRedbag = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        selectPage: function () {
            getRedbagList(this.currentPage);
        }
    };

    getDetails();
    getCustomerRealtimeDetails();
    // console.log(customerInfo);
    function changeModalDetail(item) {
        $scope.modalDetail = item;

        if (item === 'current' && !$scope.detail.current_detail) {
            getMt4TradeList(1, 1);
        }
        if (item === 'history' && !$scope.detail.history_detail) {
            getMt4TradeList(1, -1);
        }
        if (item === 'callback' && !$scope.detail.callback_detail) {
            getCallbackList(1);
        }
        if (item === 'copy' && !$scope.detail.curCopyMasters) {
            getCurCopyMasters(1);
            getHisCopyMasters(1);
        }
        if (item === 'follow' && !$scope.detail.follow_current_detail) {
            getFollowCurrent(1);
            getFollowHistory(1);
        }
        if (item === 'redbag' && !$scope.detail.redbag_detail) {
            getRedbagList(1);
        }
        if (item === 'tag' && !$scope.detail.tag_detail) {
            getMasterTagList();
            getMasterTag();
        }
    }

    function getDetails () {
        common.getCustomerDetails(customerInfo.mt4_id).then(function (data) {
            // console.log(data);
            $scope.$emit('hideLoadingWrapper');
            if (data.is_succ) {
                angular.extend($scope.detail, data.data);

                // 如果是高手，显示高手跟随链接
                if (data.data.isMaster) {
                    var url = $location.absUrl() == 'https://crm.tigerwit.com' ? 'https://www.tigerwit.com' : 'https://demo.tigerwit.com';
                    $scope.followLink = url + '/trader/' + customerInfo.user_code + '/#/trader/summary';
                }
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        });
    }
    function getCustomerRealtimeDetails () {
        common.getCustomerRealtimeDetails(customerInfo.mt4_id).then(function (data) {
            // console.log(data);
            $scope.detailReal.show = true;
            if (data.is_succ) {
                $scope.detailReal.data = data.data;
            }
        });
    }

    function getMt4TradeList (page, type) {
        var offset = (page - 1) * pagesize;
        common.getMt4TradeList(customerInfo.id, type, offset, pagesize).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                if (type === 1) {
                    angular.extend($scope.detail, {
                        current_detail: data.data.data
                    });
                    angular.extend($scope.pageCurrent, {
                        totalPage: Math.ceil(data.data.total /
                            pagesize),
                        currentPage: page
                    });
                }
                if (type === -1) {
                    angular.extend($scope.detail, {
                        history_detail: data.data.data
                    });
                    angular.extend($scope.pageHistory, {
                        totalPage: Math.ceil(data.data.total /
                            pagesize),
                        currentPage: page
                    });
                }
            }
        });
    }

    function getCallbackList (page) {
        var offset = (page - 1) * pagesize;
        common.getCustomerCallback(customerInfo.user_code, offset, pagesize).then(function (data) {
            console.log(data);
            if (data.is_succ) {
                angular.extend($scope.detail, {
                    callback_detail: data.data.data
                });
                angular.extend($scope.pageCallback, {
                    totalPage: Math.ceil(data.data.total /
                        pagesize),
                    currentPage: page
                });
            }
        });
    }

    function getCurCopyMasters (page) {
        var offset = (page - 1) * pagesize;
        common.getFollowMasterCurrent(customerInfo.mt4_id, offset, pagesize).then(function (data) {
            // console.info(data);
            if (data.is_succ) {
                angular.extend($scope.detail, {
                    curCopyMasters: data.data.data
                });
                angular.extend($scope.pageCopyCurrent, {
                    totalPage: Math.ceil(data.data.total /
                        pagesize),
                    currentPage: page
                });

                $scope.detail.curCopyMasters.forEach(function (item, index) {
                    item.isParent = true;
                });
            }
        });
    }

    function getHisCopyMasters(page) {
        var offset = (page - 1) * pagesize;
        common.getFollowMasterHistory(customerInfo.mt4_id, offset, pagesize).then(function (data) {
            // console.info(data);
            if (data.is_succ) {
                angular.extend($scope.detail, {
                    hisCopyMasters: data.data.data
                });
                angular.extend($scope.pageCopyHistory, {
                    totalPage: Math.ceil(data.data.total /
                        pagesize),
                    currentPage: page
                });

                $scope.detail.hisCopyMasters.forEach(function (item, index) {
                    item.isParent = true;
                });
            }
        });
    }

    // 表格的展开与折叠
    function collapseTable(copy, type, $index, dataType) {
        // console.log(copy)
        // 字段过滤
        if (dataType == 'current') {
            var api = 'getCopyAmountChangeHis';
            var listName = 'changeHistory';
            var dataArr = 'curCopyMasters';
            var mt4_from = 'from_mt4';
            var mt4_to = 'to_mt4';
            var start_time = copy.startTimestamp;
            var end_time = null;
        }
        else if (dataType == 'history') {
            var api = 'getCopyAmountChangeHis';
            var listName = 'changeHistory';
            var dataArr = 'hisCopyMasters';
            var mt4_from = 'mt4_from';
            var mt4_to = 'mt4_to';
            var start_time = copy.startTimestamp;
            var end_time = copy.timestamp;
        }

        angular.extend(copy, {
            collapsed: type == 'close' ? false : true
        });

        if (type == 'open') {
            common.getCopyAmountChangeHis({
                mt4From: copy[mt4_from],
                mt4To: copy[mt4_to],
                startDate: start_time,
                endDate: end_time
            }).then(function (data) {
                // console.log(data);
                if (data.is_succ) {
                    // 插入一项非父级元素
                    $scope.detail[dataArr].splice($index + 1, 0, {
                        isParent: false
                    });
                    $scope.detail[dataArr][$index + 1][listName] = data.data
                }
            });
        }
        else if (type == 'close') { // 移除非父级元素
            if ($scope.detail[dataArr][$index + 1]['isParent'] == false) {
                $scope.detail[dataArr].splice($index + 1, 1);
            }
        }

        // console.log('$scope.detail', $scope.detail[dataArr])
    }

    function getFollowCurrent(page) {
        var offset = (page - 1) * pagesize;

        common.getFollowCurrent(customerInfo.mt4_id, offset, pagesize).then(function (data) {
            // console.info(data);
            if (data.is_succ) {
                angular.extend($scope.detail, {
                    follow_current_detail: data.data.data
                });
                angular.extend($scope.pageFollowCurrent, {
                    totalPage: Math.ceil(data.data.total /
                        pagesize),
                    currentPage: page
                });
            } else {
                angular.extend($scope.detail, {
                    follow_current_detail: []
                });
                angular.extend($scope.pageFollowCurrent, {
                    totalPage: 1,
                    currentPage: page
                });
            }

        });
    }

    function getFollowHistory(page) {
        var offset = (page - 1) * pagesize;

        common.getFollowHistory(customerInfo.mt4_id, offset, pagesize).then(function (data) {
            // console.info(data);
            if (data.is_succ) {
                angular.extend($scope.detail, {
                    follow_history_detail: data.data.data
                });
                angular.extend($scope.pageFollowHistory, {
                    totalPage: Math.ceil(data.data.total /
                        pagesize),
                    currentPage: page
                });
            } else {
                angular.extend($scope.detail, {
                    follow_history_detail: []
                });
                angular.extend($scope.pageFollowHistory, {
                    totalPage: 1,
                    currentPage: page
                });
            }

        });
    }

    function getRedbagList(page) {
        var offset = (page - 1) * pagesize;

        common.getRedbagList(customerInfo.mt4_id, offset, pagesize).then(function (data) {
            // console.info(data);
            if (data.is_succ) {
                angular.extend($scope.detail, {
                    redbag_detail: data.data.data
                });
                angular.extend($scope.pageRedbag, {
                    totalPage: Math.ceil(data.data.total /
                        pagesize),
                    currentPage: page
                });
            } else {
                angular.extend($scope.detail, {
                    redbag_detail: []
                });
                angular.extend($scope.pageRedbag, {
                    totalPage: 1,
                    currentPage: page
                });
            }

        });
    }

    function getMasterTag () {
        common.getMasterTag(customerInfo.mt4_id).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                angular.extend($scope.detail, {
                    masterTags: data.data
                });
            }
        });
    }

    function getMasterTagList () {
        common.getMasterTagList().then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                angular.extend($scope.detail, {
                    tag_detail: data.data.data
                });
            }
        });
    }

    function addTagforMaster (tagId) {
        common.addTagforMaster(customerInfo.mt4_id, tagId).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                getMasterTag();
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        });
    }

    function deleteTagforMaster (tagId) {
        common.deleteTagforMaster(customerInfo.mt4_id, tagId).then(function (data) {
            if (data.is_succ) {
                getMasterTag();
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        });
    }

    function closeModal() {
        $modalInstance.dismiss();
    }
}
DetailModalController.$inject = ['$scope', '$location', '$modalInstance', 'passedScope', 'common', 'layer', '$$localStorage'];