import angular from 'angular';
export default function bankName(config) {
    return function (bankNameEn) {
        var isHave = true;
        var bank;

        angular.forEach(config.banks, function (value, index) {
            if (value.nameEN == bankNameEn) {
                bank = value.nameZH;
                isHave = false;
            }
        });
        
        if (isHave) {
            bank = bankNameEn;
        }
        return bank;
    }
}
bankName.$inject = ['config'];