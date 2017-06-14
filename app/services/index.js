import angular from 'angular';
import share from './share';
import transition from './transition';
import $$localStorage from './localStorage';
import tableRedraw from './tableRedraw';
import common from './common';
import account from './account';
import master from './master';
import advertise from './advertise';
import operation from './operation';
import filedForDirective from './filed_for_directive';
import './modal';
import './newModal';

export default angular.module('app.service', ['app.modal', 'app.new_modal'])
    .service('share', share)
    .service('common', common)
    .service('account', account)
    .service('master', master)
    .service('advertise', advertise)
    .service('operation', operation)
    .service('filedForDirective', filedForDirective)
    .factory('$transition', ['$q', '$timeout', '$rootScope', transition])
    .factory('$$localStorage', $$localStorage)
    .factory('tableRedraw', ['$rootScope', '$timeout', tableRedraw])
