import listSelect from './list_select';
import listSelectNew from './list_select_new';
import formSelect from './form_select';
import textEnter from './text_enter';
import newPagination from './new_pagination';
import tableSort from './table_sort';
import tableSelect from './table_select';
import loadingWrapper from './loading_wrapper';
import daterangepicker from './daterangepicker';
import trAnimate from './tr_animate';
import timeCounter from './time_counter';
import autoFocus from './auto_focus';
import customerCreator from './customer_creator';
import tableExByUrl from './tableExByUrl';

export default angular.module('app.directive', [])
    .directive('listSelect', ['$timeout', listSelect])
    .directive('listSelectNew', ['$timeout', listSelectNew])
    .directive('formSelect', ['$timeout', formSelect])
    .directive('textEnter', textEnter)
    .directive('newPagination', newPagination)
    .directive('tableSort', tableSort)
    .directive('tableSelect', ['tableRedraw', tableSelect])
    .directive('loadingWrapper', loadingWrapper)
    .directive('daterangepicker', ['$timeout', daterangepicker])
    .directive('trAnimate', ['$timeout', trAnimate])
    .directive('timeCounter', ['$timeout', '$interval', timeCounter])
    .directive('autoFocus', autoFocus)
    .directive('customerCreator', ['$timeout', 'common', customerCreator])
    .directive('tableExByUrl', ['$window', '$timeout', 'newModal', tableExByUrl])

    