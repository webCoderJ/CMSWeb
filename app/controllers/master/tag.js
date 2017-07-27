export default function MasterTagController($scope, master, $$localStorage, tableRedraw, layer, newModal) {

    $scope.pageTag = {
        needPrevAndNext: 1,
        needFirstAndLast: 1,
        needDotsLinks: 1,
        needLimit: 1,
        selectPage: function () {
            getMasterTagList(this.currentPage);
        }
    };
    $scope.success = false;
    $scope.info = {
        status: {
            key: undefined,
            value: undefined
        },
        tagName: {
            key: undefined,
            value: undefined
        }
    };
    $scope.status = [
        {
            key: '全部',
            value: undefined
        },
        {
            key: '正常',
            value: 0
        },
        {
            key: '停用',
            value: 1
        }
    ];
    $scope.tagList = [];
    var pagesize;

    $scope.getMasterTagList = getMasterTagList;
    $scope.setMasterTagStatus = setMasterTagStatus;
    $scope.openAddTagMdl = openAddTagMdl;

    getMasterTagList();
    tableRedraw.setTableStyleBase();

    function getMasterTagList (page) {
        page = page ? page : 1;
        // 从 localStorage 中拿 pagesize
        pagesize = $$localStorage.setPagesizeLocalStorage();
        var offset = (page - 1) * pagesize;
        $scope.success = false;
        $scope.$emit('showLoadingWrapper');
        $scope.page = page;

        master.getMasterTagList({
            name: $scope.info.tagName.value,
            status: $scope.info.status.value,
            offset: offset,
            limit: pagesize
        }).then(function (data) {
            // console.log(data);

            $scope.success = true;
            $scope.$emit('hideLoadingWrapper');

            if (data.is_succ) {
                data = data.data;
                $scope.tagList = data.data;

                angular.extend($scope.pageTag, {
                    totalCount: data.total,
                    totalPage: Math.ceil(data.total / pagesize),
                    currentPage: page,
                    limit: pagesize
                });

                tableRedraw.setTableStyle();
            }

        });
    }

    function setMasterTagStatus (tag, status) {
        master.setMasterTagStatus({
            id: tag.id,
            status: status
        }).then(function (data) {
            console.log(data);
            if (data.is_succ) {
                getMasterTagList($scope.page);
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        });
    }

    function openAddTagMdl() {
        newModal.open({
            templateUrl: require(
                'file?name=views/master/[name].[hash].[ext]!../../views/master/tag_add_modal.html'
            ),
            resolve: {
                passedScope: function () {
                    return {
                        page: $scope.page
                    };
                }
            },
            controller: ['$scope', 'passedScope', function ($scope, passedScope) {

                $scope.loading = false;
                $scope.tagName = {
                    value: ''
                };
                $scope.frontErr = {
                    tagName: {
                        show: false
                    }
                };
                $scope.backErr = {
                    show: false,
                    msg: ''
                };
                $scope.showErr = showErr;
                $scope.hideErr = hideErr;
                $scope.addMasterTag = addMasterTag;

                function addMasterTag () {
                    if (!$scope.tagName.value) {
                        showErr('tagName');
                        return;
                    }
                    $scope.loading = true;
                    master.addMasterTag($scope.tagName.value).then(function (data) {
                        // console.info(data);
                        $scope.loading = false;
                        if (data.is_succ) {
                            $scope.close();
                            getMasterTagList();
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
MasterTagController.$inject = ['$scope', 'master', '$$localStorage', 'tableRedraw', 'layer', 'newModal'];