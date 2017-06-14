/*
 *  table 样式
 */

import $ from 'jquery';
export default function ($rootScope, $timeout) {
    var service = {
        setTableStyleBase: setTableStyleBase,
        setTableStyle: setTableStyle
    };

    return service;

    function setTableStyleBase () {
        var fixedPx = 70;
        // console.log($(".table-header-wrapper").width(), $(".table-body-wrapper").width());
        $(".table-header-wrapper").width($(".table-header-wrapper").width());

        $(".table-content-wrapper").on('scroll', function (event){
            // console.log($(event.target).scrollLeft());
            $rootScope.$apply(function () {
                $rootScope.tableScrollLeft = -$(event.target).scrollLeft()+'px';
            });
        });

        $(window).on('scroll', function (event) {
            if (!$(".table-content-wrapper").length) return;
            
            $rootScope.$apply(function () {
                $rootScope.tableFix = $(".table-content-wrapper").offset().top-$("body").scrollTop() <= fixedPx ? true : false;
                $rootScope.tableHeaderHeight = $rootScope.tableFix ? $(".table-header-wrapper").height()+'px' : '0px';
            });
        });
    }


    /*
        刷新table时（获取新数据）需要调用，重新匹配header和body的width
    */ 
    function setTableStyle () {
        $timeout(function () {
            angular.forEach($(".table.table-header thead tr th"), function (el, index) {
                // console.log($(el).width(), index);
                $($(".table.table-body tbody tr td").eq(index)).width($(el).width());
            });
        });
    }

    
}