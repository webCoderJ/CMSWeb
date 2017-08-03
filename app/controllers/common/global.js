import jQuery from 'jquery';
import '../../libs/jquery.qrcode.js';
import '../../libs/canvas2image.js';
import tigerwitLogo from '../../images/logo@2x.png';
export default function GlobalController($scope, share, account, $location) {
    $scope.imageUrl = {
        tigerwitLogo: tigerwitLogo
    };
    $scope.headerDropDown = {
        show: false
    };

    $scope.pageLogin = $location;
    $scope.hasPower = hasPower;
    $scope.showHeaderDropDown = showHeaderDropDown;
    $scope.logOut = logOut;

    init();

    function init () {
        
        $scope.share_cms_global = share;
        
        let $document = angular.element(document);
        $document.on('click', function(e) {
            let $dropDownList = angular.element(document.querySelector('.header-dropdown-menu'));
            
            if (e.target.className === 'header-dropdown-menu') return;
            $scope.headerDropDown.show = false;
            $dropDownList.removeClass("active");
        });

        // 设置登陆页背景色
        $scope.$watch('pageLogin.url()', function (newVal, oldVal) {
            // console.log(newVal, oldVal);
            if (newVal != oldVal) {
                if (newVal.indexOf('/login/index') != -1) {
                    $scope.isPageLogin = true;
                } else {
                    $scope.isPageLogin = false;
                }
                
            }
        });
        if ($location.url().indexOf('/login/index') != -1) {
            $scope.isPageLogin = true;
        }
    }

    function hasPower(id) {
        let user_power = share.CMS_GLOBAL.user_power,
            menus = user_power ? user_power.menus : '';
        return menus ? menus.some((menu) => {
            return menu.id == id;
        }) : false;
    }

    function showHeaderDropDown(e) {
        let ul = angular.element(angular.element(e.target).parent()).find('ul');
        let $dropDownList = angular.element(ul);
        e.stopPropagation();
        $scope.headerDropDown.show = !$scope.headerDropDown.show;

        if ($scope.headerDropDown.show) {
            $dropDownList.addClass("active");
        } else {
            $dropDownList.removeClass("active");
        }
    }

    function logOut () {
        account.logOut().then(function (rs) {
            share.clear();
            rs && rs.is_succ ? $location.path('/login/index') : '';
        });
    }
}
GlobalController.$inject = ['$scope', 'share', 'account', '$location'];