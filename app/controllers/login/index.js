export default function LoginIndexController($scope, account, share, $state) {
    $scope.loginInfo = {
        username: undefined,
        password: undefined
    }
    $scope.loading = false;
    $scope.frontErr = {
        username: {
            show: false
        },
        password: {
            show: false
        }
    };
    $scope.backErr = {
        show: false,
        msg: ''
    };

    $scope.login = login;
    $scope.closeBackErr = closeBackErr;
    $scope.showErr = showErr;
    $scope.hideErr = hideErr;

    function login () {
        $scope.loading = true;
        account.login($scope.loginInfo.username, $scope.loginInfo.password).then(function (data) {

            $scope.loading = false;

            if (data && data.is_succ) {
                share.clear();
                $state.go('/');

            } else if (data && !(data.is_succ)) {
                $scope.backErr.show = true;
                $scope.backErr.msg = rs.data.error_msg;
            }
        });
    }

    function closeBackErr () {
        $scope.backErr = {
            show: false,
            msg: ''
        };
    }

    function showErr (name) {
        if ($scope.frontErr[name]) {
            $scope.frontErr[name].show = true;
        }
    }

    function hideErr (name) {
        $scope.closeBackErr();

        if ($scope.frontErr[name]) {
            $scope.frontErr[name].show = false;
        }
    }
}
LoginIndexController.$inject = ['$scope', 'account', 'share', '$state'];