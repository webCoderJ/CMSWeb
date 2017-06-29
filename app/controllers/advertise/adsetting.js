export default function AdvertiseAdsettingController($scope, advertise, layer) {

    $scope.advertiseLst = [];
    $scope.addAdInfo = {
        name: undefined,
        desc: undefined,
        identifier: undefined
    };
    $scope.editAdInfo = {
        name: undefined,
        desc: undefined,
        identifier: undefined
    };
    $scope.editTagInfo = {
        desc: undefined
    };
    $scope.changeTagLstSt = changeTagLstSt;
    $scope.addSettingEle = addSettingEle;
    $scope.updateSettingEle = updateSettingEle;
    $scope.submitUpdateSettingEle = submitUpdateSettingEle;
    $scope.deleteSettingEle = deleteSettingEle;
    $scope.cancelEditInfo = cancelEditInfo;
    $scope.addSettingTag = addSettingTag;
    $scope.updateSettingTag = updateSettingTag;
    $scope.submitUpdateSettingTag = submitUpdateSettingTag;
    $scope.deleteSettingTag = deleteSettingTag;

    getSettingList();
    function getSettingList () {
        advertise.getSettingList().then(function (data) {
            // console.log(data);
            $scope.advertiseLst = data.data.data;

            angular.forEach($scope.advertiseLst, function (value, index) {
                value.isOpen = false;
                value.isEdit = false;
                value.isParent = true;
            });
        });
    }

    function getSettingTagList (ad, tagList) {
        advertise.getSettingTagList(ad.id).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                ad.tagList = data.data.data;
                tagList.tagList = data.data.data;
            }
        });
    }

    function changeTagLstSt (ad, ind) {
        // console.log(ind);
        ind = ind + 1;
        if (ad.isOpen) {
            ad.isOpen = false;
            $scope.advertiseLst.splice(ind, 1);
        } else {
            ad.isOpen = true;
            var tagList = {
                id: ad.id,
                isParent: false
            };

            if (ad.tagList) {
                tagList.tagList = ad.tagList;
                $scope.advertiseLst.splice(ind, 0, tagList);
            } else {
                $scope.advertiseLst.splice(ind, 0, tagList);
                getSettingTagList(ad, $scope.advertiseLst[ind]);
            }
        }
    }

    function addSettingEle () {
        advertise.addSettingEle($scope.addAdInfo).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                layer({
                    type: 'msg',
                    message: '添加新条目成功'
                });
                clearAddAdInfo();
                getSettingList();
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        });
    }

    function updateSettingEle (ad) {
        cancelEditInfo();
        ad.isEdit = true;
        $scope.editAdInfo = {
            name: ad.name,
            desc: ad.desc,
            identifier: ad.identifier
        };
    }
    function submitUpdateSettingEle (ad) {
        advertise.updateSettingEle({
            entryId: ad.id,
            name: $scope.editAdInfo.name,
            desc: $scope.editAdInfo.desc,
            identifier: $scope.editAdInfo.identifier
        }).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                layer({
                    type: 'msg',
                    message: '修改成功'
                });
                getSettingList();
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        });
    }

    function deleteSettingEle (ad) {
        layer({
            type: 'confirm',
            message: '确认删除吗？',
            title: '确认信息',
            btnArr: ['确认', '取消'],
            func1: function () {
                advertise.deleteSettingEle(ad.id).then(function (data) {
                    layer({
                        type: 'close'
                    });
                    // console.log(data);
                    if (data.is_succ) {
                        getSettingList();
                    } else {
                        layer({
                            type: 'msg',
                            message: data.message
                        });
                    }
                });
            },
            func2: function () {
                layer({
                    type: 'close'
                });
            }
        });
    }

    function addSettingTag (ad, ind) {
        // console.log(ad);
        advertise.addSettingTag(ad.id, ad.addTagInfo).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                ad.addTagInfo = undefined;
                getSettingTagList($scope.advertiseLst[ind-1], ad);
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        });
    }

    function updateSettingTag (tag) {
        cancelEditInfo();
        tag.isEdit = true;
        $scope.editTagInfo = {
            desc: tag.desc
        };
    }
    function submitUpdateSettingTag (tag, ad) {
        advertise.updateSettingTag(tag.id, $scope.editTagInfo.desc).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                angular.forEach($scope.advertiseLst, function (value, index) {
                    // 找到相同id的上一项，刷新列表
                    if (value.id === ad.id) {
                        getSettingTagList(value, ad);
                    }
                });
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        });
    }

    function deleteSettingTag (tag, ad) {
        layer({
            type: 'confirm',
            message: '确认删除吗？',
            title: '确认信息',
            btnArr: ['确认', '取消'],
            func1: function () {
                advertise.deleteSettingTag(tag.id).then(function (data) {
                    layer({
                        type: 'close'
                    });
                    // console.log(data);
                    if (data.is_succ) {
                        angular.forEach($scope.advertiseLst, function (value, index) {
                            // 找到相同id的上一项，刷新列表
                            if (value.id === ad.id) {
                                getSettingTagList(value, ad);
                            }
                        });
                    } else {
                        layer({
                            type: 'msg',
                            message: data.message
                        });
                    }
                });
            },
            func2: function () {
                layer({
                    type: 'close'
                });
            }
        });
    }

    function clearAddAdInfo () {
        $scope.addAdInfo = {
            name: undefined,
            desc: undefined,
            identifier: undefined
        };
    }

    function clearEditAdInfo () {
        $scope.editAdInfo = {
            name: undefined,
            desc: undefined,
            identifier: undefined
        };
    }
    function clearEditTagInfo () {
        $scope.editTagnfo = {
            desc: undefined
        };
    }
    function cancelEditInfo () {
        clearEditAdInfo();
        clearEditTagInfo();
        angular.forEach($scope.advertiseLst, function (value, index) {
            value.isEdit = false;

            if (!value.isParent && value.tagList.length) {
                angular.forEach(value.tagList, function (value2, index2) {
                    value2.isEdit = false;
                });
            }
        });
    }
}
AdvertiseAdsettingController.$inject = ['$scope', 'advertise', 'layer'];