export default function DetailModalController($scope, $modalInstance) {
    $scope.test = 'test';
    $scope.closeModal = closeModal;

    function closeModal() {
        $modalInstance.dismiss();
    }
}
DetailModalController.$inject = ['$scope', '$modalInstance'];