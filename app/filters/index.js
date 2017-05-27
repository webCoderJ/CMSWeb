import angular from 'angular';
import bankName from './bank';
import bindHtml from './bindHtml';

//filter 主文件入口
export default angular.module('app.filter', [])
    .filter('bankName', bankName)
    .filter('bindHtml', bindHtml)