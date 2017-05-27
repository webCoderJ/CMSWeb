export default function MasterBonusController($scope, master) {

    $scope.test = "test master bonus";
    $scope.bonusList = [];
    $scope.getTestList = getTestList;

    function getTestList () {
        master.getTestList().then(function (data) {
            if (!data) return;
            console.log(data);
            if (data.is_succ) {
                $scope.bonusList = data.data.data;
            }
        });
    } 
}
MasterBonusController.$inject = ['$scope', 'master'];