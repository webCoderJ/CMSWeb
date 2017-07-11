import './styles/index.less';
import 'angular-file-upload-shim';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import './../node_modules/angular-file-upload/dist/angular-file-upload.min.js';
import routerConfig from './route';

//controller entry
import './controllers/index';
//service entry
import './services/index';
//directive entry
import './directives/index';
//filter entry
import './filters/index';

import O_POWER from './power_lst';


let O_POWER_INDEX = O_POWER();
let oFirst;
//app
angular
    .module('app', ['app.filter', 'app.directive', 'app.controller', 'app.service', 'ui.router', 'ngCookies', 'angularFileUpload'])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(['$httpProvider', function ($httpProvider) {
        // 跨域请求资源携带cookie
        $httpProvider.defaults.withCredentials = true;
    }])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', routerConfig])
    .run(['$rootScope', '$state', 'account', 'share', function($rootScope, $state, account, share) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            // console.info('stateChangeStart',toState,'toParams',toParams);

            if(share.CMS_GLOBAL["hasGetPower"]){
                let aUserPower = share.CMS_GLOBAL['user_power'] || {};
                let aPowerMenu = aUserPower.menuTree || {};
                // console.info('power',aPowerMenu);
                // console.info('toState',toState,'toParams',toParams);
                if(toState.name == "/"){
                    //根目录时，需要查找用户拥有的第一个page和subpage。
                    event.preventDefault();//阻止$stateProvider监听渲染
                    if(aPowerMenu.length == 0){
                        //已登录但没有任何权限
                        $state.go('404');
                    }else{
                        // let oFirst = aPowerMenu[0];
                        getStatePage(aPowerMenu);
                        if (oFirst) {
                            if(oFirst.children){
                                //page+ subpage
                                $state.go(O_POWER_INDEX[oFirst.value] + '.subpage', {subpage : O_POWER_INDEX[oFirst.children[0].value]});               
                            }else{
                                //page
                                $state.go(O_POWER_INDEX[oFirst.value]);
                            }
                        } else {
                            $state.go('404');
                        }
                        
                    }
                }else{
                    //非根目录需要判断用户是否拥有该路径的访问权限。
                    if(toState.name == "404" || toState.name == "login.index"){
                        //不需要权限判断的页面，则continue 直接交给 routerProvider
                    }else{
                        if(toParams.subpage == ""){
                            //有subpage但没指定当前subpage时，需要查询并跳转。
                           let page = toState.name.split('.')[0]; 
                           let oMenu = getMenuByPage(page) || {};
                           let children = oMenu.children;
                           if(children && children[0]){
                                event.preventDefault();
                                $state.go(toState.name, {subpage : O_POWER_INDEX[children[0].value]});
                           }else{
                                event.preventDefault();
                                $state.go('404'); //没有权限
                           }
                       }else{
                            //无subpage时，直接查询该page是否有有权限
                            let indexPage = null;
                            if(toParams.subpage){
                                indexPage = getIdByPage(toParams.subpage);
                            }else{
                                indexPage = getIdByPage(toState.name);             
                            } 
                            if(indexPage && isHasPower(indexPage)){
                                //当前用户拥有该模块权限，则continue ,交给routerProvder
                            }else{
                                event.preventDefault();
                                $state.go("404");
                            }         
                       }

                    }
                }
            }else{
                event.preventDefault();//阻止$stateProvider监听渲染
                // console.info("getUserPower");
                account.getUserPower().then(function(rs) {   //todo重复请求问题
                    share.CMS_GLOBAL["hasGetPower"] = true;
                    // console.info('rs ',rs, toState, toParams)
                    if (rs && rs.is_succ) {
                        //已登录情况，则恢复当前路由
                        share.CMS_GLOBAL['user_power'] = rs.data;

                        //如果已登录，且要去登录页，则强跳到首页                        
                        if(toState.name == "login.index"){
                            $state.go('/');
                        }else{                        
                            $state.go(toState.name,toParams);
                        }

                    }else{
                        //未登录情况
                        $state.go('login.index');
                    }
                });
            }
            function isHasPower(page){
                 var aMenus = share.CMS_GLOBAL.user_power.menus || {};
                 var hasPower = false;
                 angular.forEach(aMenus, function(oMenu, index){
                    if(page == oMenu.id){
                        hasPower = true;
                    }
                 });
                 return hasPower;
            }
            function getIdByPage(page){
                var nPage  = null;
                angular.forEach(O_POWER_INDEX, function(value, key){
                    if(page == value){
                        nPage = key;
                    }
                });
                return nPage;
            }
            function getMenuByPage(page){
                var oResult = null;
                var aMenuTree = share.CMS_GLOBAL.user_power.menuTree || {};
                var nPage = getIdByPage(page);
                angular.forEach(aMenuTree, function(oTree, index){
                    if(oTree.value == nPage){
                        oResult = oTree;
                    }
                });
                return oResult;
            }
            function getStatePage (menu, i) {
                i = i || 0;
                oFirst = menu[i];
                if (i > menu.length-1) {
                    oFirst = false;
                }
                if (O_POWER_INDEX[oFirst.value]) {
                    
                } else {
                    i++;
                    getStatePage(menu, i);
                }
            }
        });
    }]);
