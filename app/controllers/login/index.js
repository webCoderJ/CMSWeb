export default function LoginIndexController($scope, account) {
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
        account.login($scope.info.username, $scope.info.password).then(function (deta) {

            console.log(deta);
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
LoginIndexController.$inject = ['$scope', 'account'];