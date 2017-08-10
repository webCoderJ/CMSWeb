import $ from 'jquery';
export default function AdvertiseHomeController($scope, advertise, layer, newModal, common) {

    $scope.focusType = 0;
    $scope.alertType = 0;
    $scope.appFocusType = 0;

    $scope.focusList = [];
    $scope.alertList = [];
    $scope.appFocusList = [];

    $scope.targetArr = common.getAppTargetType().data;
    $scope.targetArrSucc = false;

    $scope.showAdvertiseMod = {
        focusList: false,
        alertList: false,
        appFocusList: false
    };

    $scope.info = {
        focus: {
            name: undefined,
            type: '1',  // 链接地址类型：内部模块--2, H5链接--1
            targetUrl: undefined,
            targetType: undefined,
            targetParam: undefined,
            imgUrl: undefined,
            timeStart: {
                start: undefined
            },
            timeEnd: {
                start: undefined
            }
        },
        alert: {
            name: undefined,
            type: '1',  // 链接地址类型：内部模块--2, H5链接--1
            targetUrl: undefined,
            targetType: undefined,
            targetParam: undefined,
            imgUrl: undefined,
            timeStart: {
                start: undefined
            },
            timeEnd: {
                start: undefined
            }
        },
        appFocus: {
            name: undefined,
            type: '1',  // 链接地址类型：内部模块--2, H5链接--1
            targetUrl: undefined,
            targetType: undefined,
            targetParam: undefined,
            imgUrl: undefined,
            timeStart: {
                start: undefined
            },
            timeEnd: {
                start: undefined
            }
        }
    };
    $scope.editInfo = {
        name: undefined,
        type: '1',  // 链接地址类型：内部模块--2, H5链接--1
        targetUrl: undefined,
        targetType: undefined,
        targetParam: undefined,
        imgUrl: undefined,
        timeStart: {
            start: undefined
        },
        timeEnd: {
            start: undefined
        },
        uploadSucc: false   // 是否重新上传图片
    };
    $scope.chooseType = chooseType;
    $scope.editAd = editAd;
    $scope.clearAdEditStatus = clearAdEditStatus;
    $scope.updateAdvertise = updateAdvertise;
    $scope.addAdvertise = addAdvertise;
    $scope.deleteAdvertise = deleteAdvertise;
    $scope.selectLinkType = selectLinkType;
    $scope.selectTargetType = selectTargetType;
    $scope.changeAdvertiseModStatus = changeAdvertiseModStatus;

    getMasterList();
    getAdvertiseList('wheel');
    getAdvertiseList('popup');
    getAdvertiseList('wheelApp');

    function getMasterList () {
        common.getMasterList().then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                angular.forEach($scope.targetArr, function (value, index) {
                    if (value.value == 101) {
                        value.children = data.data;
                    }
                });
            }
            $scope.targetArrSucc = true;
        });
    }

    function getAdvertiseList (type) {
        advertise.getAdvertiseList(type).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                if (type === 'wheel') {
                    $scope.focusList = data.data;
                }
                if (type === 'popup') {
                    $scope.alertList = data.data;
                }
                if (type === 'wheelApp') {
                    $scope.appFocusList = data.data;
                }
            }
        });
    }

    function changeAdvertiseModStatus (type, status) {
        $scope.showAdvertiseMod[type] = status;
    }

    function chooseType (type, ind) {
        $scope[type] = ind;
    }

    function selectTargetType (target) {
        if (target.target_type) {
            angular.forEach($scope.targetArr, function (value, index) {
                if (target.target_type == value.value) {
                    target.target_key = value.key;
                }
            })
        }
        if (target.target_param) {
            angular.forEach($scope.targetArr, function (value, index) {
                if (value.value == 101) {
                    $scope.$watch('targetArrSucc', function (newVal, oldVal) {
                        if (newVal) {
                            angular.forEach(value.children, function (value2, index2) {
                                if (JSON.parse(target.target_param).user_code == value2.user_code) {
                                    target.target_key = target.target_key +' - '+ value2.username;
                                }
                            });
                        }
                    }); 
                }
            })
        }
    }

    function selectLinkType (type) {
        newModal.open({
            templateUrl: require(
                'file?name=views/advertise/[name].[hash].[ext]!../../views/advertise/home_target_url_modal.html'
            ),
            resolve: {
                passedScope: function () {
                    return {
                        targetArr: $scope.targetArr
                    };
                }
            },
            controller: ['$scope', 'passedScope', function ($scope, passedScope) {

                $scope.type = '1';
                $scope.targetUrl = undefined;

                $scope.addTargetInfo = addTargetInfo;

                function addTargetInfo () {
                    if ($scope.type == '1' && !$scope.targetUrl) {
                        layer({
                            type: 'msg',
                            message: '信息不完整'
                        });
                        return;
                    }
                    if ($scope.type == '2' && !$scope.targetInfo.value) {
                        layer({
                            type: 'msg',
                            message: '信息不完整'
                        });
                        return;
                    }
                    receiveTargetInfo(type, {
                        type: $scope.type,
                        targetUrl: $scope.targetUrl,
                        targetType: $scope.targetInfo.value,
                        targetParam: JSON.stringify({
                            user_code: $scope.targetInfo.children.value
                        }),
                    });
                    $scope.close();
                }


                $scope.targetInfo = {
                    key: undefined,
                    value: undefined,
                    children: {
                        key: undefined,
                        value: undefined
                    }
                };
                $scope.showTargetModLst = false;
                $scope.targetModLst = passedScope.targetArr;
                $scope.targetModSubLst = [];
                var targetModTempInfo = {};

                $scope.changeShowTargetModLst = function () {
                    $scope.showTargetModLst = $scope.showTargetModLst ? false : true;
                    $scope.targetModSubLst = [];
                };
                $scope.selectTargetInfo = function (lst, t) {
                    if (t === 'sub') {  // 二级列表
                        $scope.targetInfo = {
                            key: targetModTempInfo.key,
                            value: targetModTempInfo.value,
                            children: {
                                key: lst.username,
                                value: lst.user_code
                            }
                        };
                        $scope.showTargetModLst = false;
                        $scope.targetModSubLst = [];
                    } else {
                        if (lst.children) return;
                        $scope.targetInfo = {
                            key: lst.key,
                            value: lst.value,
                            children: {
                                key: undefined,
                                value: undefined
                            }
                        };
                        $scope.showTargetModLst = false;
                        $scope.targetModSubLst = [];
                    }
                };
                $scope.hoverTargetLst = function (lst) {
                    if (lst.children) {
                        $scope.targetModSubLst = lst.children;
                        targetModTempInfo = {
                            key: lst.key,
                            value: lst.value
                        };
                    } else {
                        $scope.targetModSubLst = [];
                        targetModTempInfo = {};
                    }
                };


            }]
        });
    }

    function receiveTargetInfo (type, params) {
        if (type === 'editInfo') {  //修改信息
            $scope.editInfo.type = params.type;
            $scope.editInfo.targetUrl = params.targetUrl;
            $scope.editInfo.targetType = params.targetType;
            $scope.editInfo.targetParam = params.targetParam;
        } else {    // 新增信息
            $scope.info[type].type = params.type;
            $scope.info[type].targetUrl = params.targetUrl;
            $scope.info[type].targetType = params.targetType;
            $scope.info[type].targetParam = params.targetParam;
        }
    }

    function editAd (item) {
        clearAdEditStatus();
        item.isEdit = true;
        $scope.editInfo = {
            name: item.name,
            type: item.target_url ? '1' : '2', 
            targetUrl: item.target_url,
            targetType: item.target_type,
            targetParam: item.target_Param,
            imgUrl: item.image_url,
            timeStart: {
                start: item.start_time
            },
            timeEnd: {
                start: item.end_time
            },
            uploadSucc: false
        };
    }

    function updateAdvertise (item, type) {
        $scope.$emit('showLoadingWrapper');

        if ($scope.editInfo.type == '1') {
            advertise.updateAdvertise({
                recId: item.id,
                name: $scope.editInfo.name,
                targetUrl: $scope.editInfo.targetUrl,
                startTime: $scope.editInfo.timeStart.start,
                endTime: $scope.editInfo.timeEnd.start,
                imgUrl: $scope.editInfo.imgUrl,
            }).then(function (data) {
                dealUpdateData(data, type);
            });
        } else {
            advertise.updateAdvertise({
                recId: item.id,
                name: $scope.editInfo.name,
                targetType: $scope.editInfo.targetType,
                targetParam: $scope.editInfo.targetParam,
                startTime: $scope.editInfo.timeStart.start,
                endTime: $scope.editInfo.timeEnd.start,
                imgUrl: $scope.editInfo.imgUrl,
            }).then(function (data) {
                dealUpdateData(data, type);
            });
        }

        function dealUpdateData (data, type) {
            $scope.$emit('hideLoadingWrapper');
            // console.log(data);
            if (data.is_succ) {
                switch (type) {
                    case 'focus':
                        getAdvertiseList('wheel');
                        break;
                    case 'alert':
                        getAdvertiseList('popup');
                        break;
                    case 'appFocus':
                        getAdvertiseList('wheelApp');
                        break;
                    default: 
                        break;
                }
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        }
        
    }

    function addAdvertise (type) {
        if (!$scope.info[type].imgUrl) {
            layer({
                type: 'msg',
                message: '请先上传图片'
            });
            return;
        }
        $scope.$emit('showLoadingWrapper');

        var tabId;
        switch (type) {
            case 'focus':
                tabId = $scope.focusList[$scope.focusType].tabId;
                break;
            case 'alert':
                tabId = $scope.alertList[$scope.alertType].tabId;
                break;
            case 'appFocus':
                tabId = $scope.appFocusList[$scope.appFocusType].tabId;
                break;
            default: 
                break;
        }

        if ($scope.info[type].type == '1') {
            advertise.addAdvertise({
                tabId: tabId,
                name: $scope.info[type].name,
                targetUrl: $scope.info[type].targetUrl,
                startTime: $scope.info[type].timeStart.start,
                endTime: $scope.info[type].timeEnd.start,
                imgUrl: $scope.info[type].imgUrl,
            }).then(function (data) {
                // console.log(data);
                dealData(data, type);
            });
        } else {
            advertise.addAdvertise({
                tabId: tabId,
                name: $scope.info[type].name,
                targetType: $scope.info[type].targetType,
                targetParam: $scope.info[type].targetParam,
                startTime: $scope.info[type].timeStart.start,
                endTime: $scope.info[type].timeEnd.start,
                imgUrl: $scope.info[type].imgUrl,
            }).then(function (data) {
                // console.log(data);
                dealData(data, type);
            });
        }

        function dealData (data, type) {
            $scope.$emit('hideLoadingWrapper');
            if (data.is_succ) {
                switch (type) {
                    case 'focus':
                        getAdvertiseList('wheel');
                        break;
                    case 'alert':
                        getAdvertiseList('popup');
                        break;
                    case 'appFocus':
                        getAdvertiseList('wheelApp');
                        break;
                    default: 
                        break;
                }
                clearAdAddStatus(type);
            } else {
                layer({
                    type: 'msg',
                    message: data.message
                });
            }
        }
    }

    function deleteAdvertise (item, type) {

        layer({
            type: 'confirm',
            message: '确认删除吗？',
            title: '确认信息',
            btnArr: ['确认', '取消'],
            func1: function () {
                advertise.deleteAdvertise(item.id).then(function (data) {
                    layer({
                        type: 'close'
                    });
                    // console.log(data);
                    if (data.is_succ) {
                        switch (type) {
                            case 'focus':
                                getAdvertiseList('wheel');
                                break;
                            case 'alert':
                                getAdvertiseList('popup');
                                break;
                            case 'appFocus':
                                getAdvertiseList('wheelApp');
                                break;
                            default: 
                                break;
                        }
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

    function clearAdEditStatus () {
        angular.forEach($scope.focusList, function (value, index) {
            angular.forEach(value.data, function (value2, index2) {
                value2.isEdit = false;
            });
        });
        angular.forEach($scope.alertList, function (value, index) {
            angular.forEach(value.data, function (value2, index2) {
                value2.isEdit = false;
            });
        });
        angular.forEach($scope.appFocusList, function (value, index) {
            angular.forEach(value.data, function (value2, index2) {
                value2.isEdit = false;
            });
        });
        $scope.editInfo = {
            name: undefined,
            type: '1',
            targetUrl: undefined,
            targetType: undefined,
            targetParam: undefined,
            imgUrl: undefined,
            timeStart: {
                start: undefined,
                end: undefined
            },
            timeEnd: {
                start: undefined,
                end: undefined
            },
            uploadSucc: false
        };
    }

    function clearAdAddStatus(type) {
        $scope.info[type].name = undefined;
        $scope.info[type].type = '1';
        $scope.info[type].targetUrl = undefined;
        $scope.info[type].targetType = undefined;
        $scope.info[type].targetParam = undefined;
        $scope.info[type].imgUrl = undefined;
    }

    // function previewBase64(file) {
    //     var reader = new FileReader();
    //     reader.onload = function(e) {
    //         advertise.uploadFile("base64", e.target.result).then(function (data) {
    //             console.log(data);
    //         });
    //     };
    //     reader.readAsDataURL(file);
    // }
    function previewFile(inp, iName) {
        // console.log(inp[0]);
        var oMyForm = new FormData();
        oMyForm.append("type", "file");
        oMyForm.append("file", inp[0].files[0]);
        // console.log(oMyForm.get("type"));
        // console.log(oMyForm.get("file"));
        $.ajax({
            url: '/api/upload/image',
            type: 'POST',
            data: oMyForm,
            processData: false,
            contentType: false,
            success: function (data) {
                // console.log(data);
                if (data.is_succ) {
                    $scope.$apply(function () {
                        if (iName) {
                            $scope.info[iName].imgUrl = data.data.filePath;
                        } else {
                            $scope.editInfo.imgUrl = data.data.filePath;
                            $scope.editInfo.uploadSucc = true;
                        }
                    });
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    $(document).on("change", 'input[type=file]', function (e) {
        var file = e.target.files[0];
        // previewBase64(file);
        var iName = $(this).attr("name") || "";
        previewFile($(this), iName);
    });
}
AdvertiseHomeController.$inject = ['$scope', 'advertise', 'layer', 'newModal', 'common'];