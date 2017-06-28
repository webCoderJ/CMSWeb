import angular from 'angular';
import GlobalController from './common/global';
import DetailModalController from './common/detail_modal';
import LoginIndexController from './login/index';
import MasterTraderController from './master/trader';
import MasterRanklistController from './master/ranklist';
import MasterWhitelistController from './master/whitelist';
import MasterBonusController from './master/bonus';
import MasterCopierController from './master/copier';
import OperationRedbagController from './operation/redbag';
import AdvertiseHomeController from './advertise/home';
import AdvertiseAdsettingController from './advertise/adsetting';


//controller 主文件入口
export default angular.module('app.controller', [])
    .controller('GlobalController', GlobalController)
    .controller('DetailModalController', DetailModalController)
    .controller('LoginIndexController', LoginIndexController)
    .controller('MasterTraderController', MasterTraderController)
    .controller('MasterRanklistController', MasterRanklistController)
    .controller('MasterWhitelistController', MasterWhitelistController)
    .controller('MasterBonusController', MasterBonusController)
    .controller('MasterCopierController', MasterCopierController)
    .controller('OperationRedbagController', OperationRedbagController)
    .controller('AdvertiseHomeController', AdvertiseHomeController)
    .controller('AdvertiseAdsettingController', AdvertiseAdsettingController)
