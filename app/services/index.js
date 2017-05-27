import angular from 'angular';
import share from './share';
import transition from './transition';
import account from './account';
import master from './master';
import './modal';
import './newModal';

export default angular.module('app.service', ['app.modal', 'app.new_modal'])
    .service('share', share)
    .service('account', account)
    .service('master', master)
