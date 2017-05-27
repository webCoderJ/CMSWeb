import jQuery from 'jquery';
import '../../libs/jquery.qrcode.js';
import '../../libs/canvas2image.js';
import tigerwitLogo from '../../images/crm_logo.png';
export default function GlobalController($scope) {
    $scope.imageUrl = {
        tigerwitLogo: tigerwitLogo
    };
}
GlobalController.$inject = ['$scope'];