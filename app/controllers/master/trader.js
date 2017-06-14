
export default function MasterTraderController($scope, $timeout, master, $$localStorage, tableRedraw, $modal, newModal) {

    var tableOptions = [
        {
            key: '昵称',
            value: 'username',
        },
        {
            key: '交易类型',
            value: 'deal_type',
        },
        {
            key: 'MT4帐号',
            value: 'mt4_real',
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
            key: '最大回撤率',
            value: 'maxRetract',
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
            key: '下榜原因',
            value: 'reason',
        },
        {
            key: '推荐',
            value: 'handle',
        }
    ];
    var pagesize;

    $scope.traderConf = {
        optionList: tableOptions
    };
    $scope.storageFrontKey = 'master_trader';
    $scope.tran_type = [
        {
            key: '全部',
            value: 0
        }, {
            key: '自主交易',
            value: 1
        }, {
            key: '跟单交易',
            value: 2
        }, {
            key: '正在跟单',
            value: 3
        }
    ];
    $scope.info = {
        tran_type: {
            key: undefined,
            value: undefined
        },
        anyway: {
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
    $scope.pageTrader = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        needLimit: 1,
        selectPage: function() {
            getTraderList(this.currentPage);
        }
    };
    $scope.table = {};
    $scope.traders = [];
    $scope.page = 1;
    $scope.tableSortInfo = {
        sort: undefined,
        order: undefined
    };
    $scope.traderType = 1;  // 1-> 所有自主交易客户, 2-> 过滤掉已推荐高手榜的自主交易客户
    $scope.depositType = 2; // 1-> 入金客户, 2-> 所有客户
    $scope.tigerType = 1;  // 1-> 所有自主交易客户, 2-> 老虎外汇
    $scope.muguaType = 1; // 1-> 所有自主交易客户, 2-> 木瓜金融
    $scope.success = true;
    var pagesize;

    $scope.getTraderList = getTraderList;
    $scope.chooseType = chooseType;
    $scope.openDetailMdl = openDetailMdl;
    $scope.openAddMasterMdl = openAddMasterMdl;
    $scope.openRankeHistory = openRankeHistory;

    getTraderList();

    tableRedraw.setTableStyleBase();

    function getTraderList (page) {
        page = page ? page : 1;
        // 从 localStorage 中拿 pagesize
        pagesize = $$localStorage.setPagesizeLocalStorage();
        var offset = (page - 1) * pagesize;
        $scope.success = false;
        $scope.$emit('showLoadingWrapper');
        $scope.page = page;

        master.getTraderList({
            tranType: $scope.info.tran_type.value,
            anyway: $scope.info.anyway.value,
            balance: $scope.info.balance.value,
            sumRate: $scope.info.sum_rate.value,
            offset: offset,
            limit: pagesize,
            sort: $scope.tableSortInfo.sort,
            order: $scope.tableSortInfo.order,
            type: $scope.traderType,
            deposit: $scope.depositType,
            isTiger: $scope.tigerType,
            isMugua: $scope.muguaType
        }).then(function (data) {
            // console.log(data);
            $$localStorage.setTableLocalStorage($scope.storageFrontKey, $scope.table);
            $scope.success = true;
            $scope.$emit('hideLoadingWrapper');

            if (!data) return;
            if (data.is_succ) {
                data = data.data;
                $scope.traders = data.data;

                angular.extend($scope.pageTrader, {
                    totalCount: data.total,
                    totalPage: Math.ceil(data.total / pagesize),
                    currentPage: page,
                    limit: pagesize
                });

                tableRedraw.setTableStyle();
            }
        });
    }

    function chooseType (type) {
        $scope[type] = $scope[type] === 1 ? 2 : 1;
        getTraderList();
    }

    function openDetailMdl(customerInfo) {
        
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

    function openAddMasterMdl (trader, status) {
        newModal.open({
            templateUrl: require(
                'file?name=views/master/[name].[hash].[ext]!../../views/master/trader_modal.html'
            ),
            resolve: {
                passedScope: function() {
                    return {
                        page: $scope.page
                    };
                }
            },
            controller: ['$scope', 'passedScope', function ($scope, passedScope) {

                var id = trader.mt4_id;
                
                $scope.username = trader.user_name;
                $scope.status = status == 1 ? '前台' : '隐藏';
                $scope.loading = false;
                $scope.backErr = {
                    show: false,
                    msg: ''
                };
                $scope.addTraderRanklist = addTraderRanklist;

                function addTraderRanklist () {
                    $scope.loading = true;

                    master.addTraderRanklist(id, status).then(function (data) {
                        // console.info(data);
                        $scope.loading = false;
                        if (data.is_succ) {
                            $scope.close();
                            getTraderList(passedScope.page);
                        } else {
                            $scope.backErr = {
                                show: true,
                                msg: data.message
                            };
                        }
                    });
                }
            }]
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
                        mt4_id:passedScope.trader.mt4_id
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
}
MasterTraderController.$inject = ['$scope', '$timeout', 'master', '$$localStorage', 'tableRedraw', '$modal', 'newModal'];