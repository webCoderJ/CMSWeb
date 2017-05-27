import $ from 'jquery';
import highcharts from 'highstock-release';
import loading from '../images/loading.gif';
export default () => {
    var options = {
        chart: {
            type: 'line',
            // spacing: 10,
            backgroundColor: 'rgba(0,0,0,0)'
        },

        title: {
            text: ''
        },

        legend: {
            enabled: false
        },

        xAxis: {
            lineColor: '#777',
            tickColor: '#777',
            labels: {
                style: {
                    color: '#999'
                }
            },
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
                month: '%y/%m/%d',
                year: '%y/%m',
                week: '%m/%d'
            }
        },

        yAxis: {
            title: {
                enabled: false
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0
        },


        credits: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        plotOptions: {
            series: {
                lineWidth: 2,
                marker: {
                    lineColor: null,
                    radius: 0,
                    states: {
                        hover: {
                            radiusPlus: 0,
                            lineWidthPlus: 0
                        }
                    }
                },
                states: {
                    hover: {
                        lineWidthPlus: 0
                    }
                }
            }
        },
        series: [{
            color: '#5d9cec',
            data: []
        }]
    };

    return {
        restrict: 'A',
        replace: true,
        template: '<div class="line_chart"><img ng-src="'+ loading +'"></div>',
        // template: '<div class="line_chart">加载中...</div>',
        link: function (scope, element, attrs) {
            var type = attrs.type;
            var refresh = attrs.refresh;

            if (type === 'dashboard') {
                angular.extend(options, {
                    xAxis: {
                        title: {
                            text: '',
                            style: {
                                color: '#699'
                            }
                        },
                        // type: 'datetime',
                        // dateTimeLabelFormats: {
                        //     day: '%Y/%m/%d'
                        // }
                    },
                    yAxis: {
                        title: {
                            text: '',
                            style: {
                                color: '#699'
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    // tooltip: {
                    //     useHTML: true,
                    //     backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    //     formatter: function () {
                    //         return '<p style="color:' + this.series.color +
                    //                 ';">收益率：</br>' +  this.y + '%</p>';
                    //     }
                    // },
                    series: [{
                        name: '',
                        data: []
                    }]
                });
            
                switch (refresh) {
                    case 'user': 
                        scope.$on('refreshUserLines', function (e, data) {
                            setLines($(element), data, '新增的用户（个）', '新增用户');
                        });
                        break;
                    case 'paymentNum': 
                        scope.$on('refreshPaymentNumLines', function (e, data) {
                            setLines($(element), data, '客户入金的个数（个）', '客户入金数');
                        });
                        break;
                    case 'paymentAmount': 
                        scope.$on('refreshPaymentAmountLines', function (e, data) {
                            setLines($(element), data, '客户入金的金额（美元）', '客户入金金额');
                        });
                        break;
                    case 'trade': 
                        scope.$on('refreshTradeLines', function (e, data) {
                            setLines($(element), data, '交易手数（手）', '交易手数');
                        });
                        break;
                    default: 
                        break;
                }

                function setLines (element, data, yText, toolName) {
                    options.yAxis.title.text = yText;
                    options.series[0].name = toolName;
                    options.xAxis.categories = data.x;
                    options.series[0].data = data.y;
                    element.highcharts(options);
                }
            }

        }
    }
}
