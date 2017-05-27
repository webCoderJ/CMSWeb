import angular from 'angular';
import GlobalController from './common/global';
import LoginIndexController from './login/index';
import MasterBonusController from './master/bonus';


//controller 主文件入口
export default angular.module('app.controller', [])
    .controller('GlobalController', GlobalController)
    .controller('LoginIndexController', LoginIndexController)
    .controller('MasterBonusController', MasterBonusController)
