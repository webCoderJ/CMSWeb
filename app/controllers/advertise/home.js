import $ from 'jquery';
export default function AdvertiseHomeController($scope, advertise) {

    $scope.focusType = 0;
    $scope.focusList = [];
    $scope.alertList = [];
    $scope.info = {
        focus: {
            name: undefined,
            targetUrl: undefined,
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
            targetUrl: undefined,
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
        targetUrl: undefined,
        timeStart: {
            start: undefined
        },
        timeEnd: {
            start: undefined
        }
    };
    $scope.chooseType = chooseType;
    $scope.editAd = editAd;
    $scope.clearAdEditStatus = clearAdEditStatus;
    $scope.updateAdvertise = updateAdvertise;
    $scope.addAdvertise = addAdvertise;
    $scope.deleteAdvertise = deleteAdvertise;

    getAdvertiseList(1);
    getAdvertiseList(0);

    function getAdvertiseList (type) {
        advertise.getAdvertiseList(type).then(function (data) {
            // console.log(data);
            if (data.is_succ) {
                if (type === 1) {
                    $scope.focusList = data.data;
                }
                if (type === 0) {
                    $scope.alertList = data.data[0];
                    
                }
            }
        });
    }

    function chooseType (type) {
        $scope.focusType = type;
    }

    function editAd (item) {
        clearAdEditStatus();
        item.isEdit = true;
        $scope.editInfo = {
            name: item.name,
            targetUrl: item.target_url,
            imgUrl: item.image_url,
            timeStart: {
                start: item.start_time
            },
            timeEnd: {
                start: item.end_time
            }
        };
    }

    function updateAdvertise (item) {
        $scope.$emit('showLoadingWrapper');

        advertise.updateAdvertise({
            recId: item.id,
            name: $scope.editInfo.name,
            targetUrl: $scope.editInfo.targetUrl,
            startTime: $scope.editInfo.timeStart.start,
            endTime: $scope.editInfo.timeEnd.start,
            imgUrl: $scope.editInfo.imgUrl,
        }).then(function (data) {
            $scope.$emit('hideLoadingWrapper');
            // console.log(data);
            if (data.is_succ) {
                getAdvertiseList(1);
                getAdvertiseList(0);
            } else {
                alert(data.message);
            }
        });
    }

    function addAdvertise (type) {
        $scope.$emit('showLoadingWrapper');
        // console.log($scope.alertList);
        advertise.addAdvertise({
            tabId: type === 'focus' ? $scope.focusList[$scope.focusType].tabId : $scope.alertList.tabId,
            name: $scope.info[type].name,
            targetUrl: $scope.info[type].targetUrl,
            startTime: $scope.info[type].timeStart.start,
            endTime: $scope.info[type].timeEnd.start,
            imgUrl: $scope.info[type].imgUrl,
        }).then(function (data) {
            console.log(data);
            $scope.$emit('hideLoadingWrapper');
            if (data.is_succ) {
                type === 'focus' ? getAdvertiseList(1) : getAdvertiseList(0);
                clearAdAddStatus(type);
            } else {
                alert(data.message);
            }
        });
    }

    function deleteAdvertise (item) {
        // console.log(item);
        var r = confirm('确认删除吗？');

        if (r) {
            advertise.deleteAdvertise(item.id).then(function (data) {
                // console.log(data);
                if (data.is_succ) {
                    getAdvertiseList(1);
                    getAdvertiseList(0);
                } else {
                    alert(data.message);
                }
            });
        }
    }

    function clearAdEditStatus () {
        angular.forEach($scope.focusList, function (value, index) {
            angular.forEach(value.data, function (value2, index2) {
                value2.isEdit = false;
            });
        });
        angular.forEach($scope.alertList.data, function (value, index) {
            value.isEdit = false;
        });
        $scope.editInfo = {
            name: undefined,
            targetUrl: undefined,
            imgUrl: undefined,
            timeStart: {
                start: undefined,
                end: undefined
            },
            timeEnd: {
                start: undefined,
                end: undefined
            }
        };
    }

    function clearAdAddStatus(type) {
        $scope.info[type] = {
            name: undefined,
            targetUrl: undefined,
            imgUrl: undefined,
            timeStart: {
                start: undefined
            },
            timeEnd: {
                start: undefined
            }
        }
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
AdvertiseHomeController.$inject = ['$scope', 'advertise'];