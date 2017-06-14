export default function MasterRanklistController($scope, master, $$localStorage, tableRedraw, $modal, newModal) {

    var tableOptions = [
        {
            key: '昵称',
            value: 'username',
        },
        {
            key: 'MT4帐号',
            value: 'mt4_id',
        },
        {
            key: '账户余额',
            value: 'balance',
        },
        {
            key: '总收益率',
            value: 'lastTotalProfitRate',
        },
        {
            key: '上一交易日收益率',
            value: 'lastProfitRate',
        },
        {
            key: '总收益金额',
            value: 'lastProfitSum',
        },
        {
            key: '当月分成',
            value: 'sumPay',
        },
        {
            key: '首次开仓时间',
            value: 'firstOpenTime',
        },
        {
            key: '总平仓次数',
            value: 'lastTotalClose',
        },
        {
            key: '近一月平仓次数',
            value: 'lastMonthTotalClose',
        },
        {
            key: '近7日平仓次数',
            value: 'lastWeekTotalClose',
        },
        {
            key: '单次最大开仓手数',
            value: 'lastMaxVolume',
        },
        {
            key: '平均持仓时间',
            value: 'avgPositionTime',
        },
        {
            key: '外汇占比',
            value: 'lastNormalRate',
        },
        {
            key: '贵金属占比',
            value: 'lastMetalRate',
        },
        {
            key: '原油占比',
            value: 'lastOilRate',
        },
        {
            key: 'CFD占比',
            value: 'lastCFDRate',
        },
        {
            key: '胜率',
            value: 'lastProfitCloseRate',
        },
        {
            key: '跟随人数',
            value: 'copyCount',
        },
        {
            key: '近7日跟随率',
            value: 'lastWeekCopyRate',
        },
        {
            key: '榜单',
            value: 'status',
        },
        {
            key: '操作',
            value: 'handle',
        }
    ];
    var pagesize;

    $scope.ranklistConf = {
        optionList: tableOptions
    };
    $scope.storageFrontKey = 'master_ranklist';
    $scope.pageRanklist = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        needLimit: 1,
        selectPage: function () {
            getRankList(this.currentPage);
        }
    };
    $scope.status = [
        {
            key: '全部',
            value: 10
        }, {
            key: '前台高手',
            value: 0
        }, {
            key: '隐藏高手',
            value: 1
        }
    ];
    $scope.info = {
        anyway: {
            key: undefined,
            value: undefined
        },
        status: {
            key: undefined,
            value: undefined
        },
        balance: {
            key: undefined,
            value: undefined
        },
        sum_rate: {
            key: undefined,
            value: undefined
        }
    };
    $scope.page = 1;
    $scope.table = {};
    $scope.ranklist = [];
    $scope.success = false;

    $scope.getRankList = getRankList;
    $scope.openDetailMdl = openDetailMdl;
    $scope.openRankeHistory = openRankeHistory;
    $scope.openDeleteMasterMdl = openDeleteMasterMdl;

    getRankList();
    tableRedraw.setTableStyleBase();

    function getRankList(page) {
        page = page ? page : 1;
        // 从 localStorage 中拿 pagesize
        pagesize = $$localStorage.setPagesizeLocalStorage();
        var offset = (page - 1) * pagesize;
        $scope.success = false;
        $scope.$emit('showLoadingWrapper');
        $scope.page = page;

        master.getRanklistList({
            anyway: $scope.info.anyway.value,
            status: $scope.info.status.value,
            balance: $scope.info.balance.value,
            sumRate: $scope.info.sum_rate.value,
            offset: offset,
            limit: pagesize
        }).then(function (data) {
            console.log(data);
            $$localStorage.setTableLocalStorage($scope.storageFrontKey, $scope.table);
            $scope.success = true;
            $scope.$emit('hideLoadingWrapper');

            if (!data) return;
            if (data.is_succ) {
                data = data.data;
                $scope.ranklist = data.data;

                angular.extend($scope.pageRanklist, {
                    totalCount: data.total,
                    totalPage: Math.ceil(data.total / pagesize),
                    currentPage: page,
                    limit: pagesize
                });

                tableRedraw.setTableStyle();
            }
        });
    }

    function openDetailMdl (customerInfo) {
        $modal.open({
            templateUrl: require(
                'file?name=views/common/[name].[hash].[ext]!../../views/common/detail_modal.html'
            ),
            size: 'lg',
            backdrop: true,
            resolve: {
                passedScope: function() {
                    return {
                        customerInfo: customerInfo
                    };
                }
            },
            controller: 'DetailModalController'    
        });
    }

    function openRankeHistory (trader){
        $modal.open({
            size: 'lg',
            backdrop:true,
            templateUrl: require(
                'file?name=views/master/[name].[hash].[ext]!../../views/master/ranklist_history_modal.html'
            ),
            resolve: {
                passedScope: function() {
                    return {
                        trader: trader
                    };
                }
            },
            controller: ['$scope', 'passedScope','master' ,function ($scope, passedScope,master) {
                // console.log(trader)
                $scope.trader = trader;
                $scope.rankHistory = [];

                $scope.pageRankHistory = {
                    needPrevAndNext: 0,
                    needFirstAndLast: 0,
                    needDotsLinks: 0,
                    needLimit: 1,
                    selectPage: function() {
                        getRankHistory(this.currentPage);
                    }
                }
                getRankHistory();
                function getRankHistory (page) {
                    page = page ? page : 1;
                    var offset = (page - 1) * pagesize;

                    $scope.page = page;
                    $scope.$emit('showLoadingWrapper');

                    master.getRankHistory({
                        mt4Id:passedScope.trader.mt4_id,
                        offset: offset,
                        limit: pagesize
                    }).then(function (data) {
                        $scope.success = true;
                        $scope.$emit('hideLoadingWrapper');

                        if (data.is_succ) {
                            $scope.rankHistory = data.data;

                            angular.extend($scope.pageRankHistory, {
                                totalCount: data.total_count,
                                totalPage: Math.ceil(data.total_count / pagesize),
                                currentPage: page,
                                limit: pagesize
                            });
                        }
                    });
                }
            }]
        });
    }

    function openDeleteMasterMdl(rank) {
        newModal.open({
            templateUrl: require(
                'file?name=views/master/[name].[hash].[ext]!../../views/master/ranklist_delete_modal.html'
            ),
            resolve: {
                passedScope: function () {
                    return {
                        page: $scope.page
                    };
                }
            },
            controller: ['$scope', 'passedScope', function ($scope, passedScope) {

                var id = rank.mt4_id;

                $scope.loading = false;
                $scope.describe = {
                    value: ''
                };
                $scope.frontErr = {
                    desc: {
                        show: false
                    }
                };
                $scope.backErr = {
                    show: false,
                    msg: ''
                };
                $scope.username = rank.user_name;
                $scope.deleteTraderRanklist = deleteTraderRanklist;
                $scope.showErr = showErr;
                $scope.hideErr = hideErr;

                function deleteTraderRanklist() {

                    if (!$scope.describe.value) {
                        showErr('desc');
                        return;
                    }
                    $scope.loading = true;
                    master.deleteTraderRanklist(id, $scope.describe.value).then(function (data) {
                        // console.info(data);
                        $scope.loading = false;
                        if (data.is_succ) {
                            $scope.close();
                            getRankList(passedScope.page);
                        } else {
                            $scope.backErr = {
                                show: true,
                                msg: data.message
                            };
                        }
                    });
                }

                function showErr(name) {
                    if ($scope.frontErr[name]) {
                        $scope.frontErr[name].show = true;
                    }
                }

                function hideErr(name) {
                    if ($scope.frontErr[name]) {
                        $scope.frontErr[name].show = false;
                    }
                }
            }]
        });
    }
}
MasterRanklistController.$inject = ['$scope', 'master', '$$localStorage', 'tableRedraw', '$modal', 'newModal'];