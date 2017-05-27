export default function ($stateProvider, $locationProvider, $urlRouterProvider, $location) {
    // $locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('*');
    $locationProvider.hashPrefix('');   // 解决router 大于1.6.0版本不能正常解析问题
    $urlRouterProvider.otherwise("/");

    $stateProvider

        .state('404', {
            url: '/404',
            views: {
                '@': {
                    templateUrl: require(
                        'file?name=views/common/[name].[hash].[ext]!./views/common/layout.html'
                    )
                },
                'hd@404': {
                    templateUrl: require(
                        'file?name=views/common/[name].[hash].[ext]!./views/common/header.html'
                    ),
                    controller: ''
                },
                'bd@404': {
                    templateUrl: require(
                        'file?name=views/dashboard/[name].[hash].[ext]!./views/common/404.html'
                    ),
                    controller: ''
                }
            }
        })
        .state('login', {
            views: {
                '@': {
                    templateUrl: require(
                        'file?name=views/common/[name].[hash].[ext]!./views/common/layout.html'
                    )
                }
            }
        })
        .state('login.index', {
            url: '/login/index',
            views: {
                'bd@login': {
                    templateUrl: require(
                        'file?name=views/account/[name].[hash].[ext]!./views/login/index.html'
                    ),
                    controller: 'LoginIndexController as scope'
                }
            }
        })
        // 高手管理
        .state('master', {
            views: {
                '@': {
                    templateUrl: require(
                        'file?name=views/common/[name].[hash].[ext]!./views/common/layout.html'
                    ),
                    controller: ''
                },
                'hd@master': {
                    templateUrl: require(
                        'file?name=views/common/[name].[hash].[ext]!./views/common/header.html'
                    ),
                    controller: ''
                },
                'bd@master': {
                    templateUrl: require(
                        'file?name=views/master/[name].[hash].[ext]!./views/master/index.html'
                    ),
                    controller: ''
                }
            }
        })
        .state('master.subpage', {
            url: '/master/:subpage',
            views: {
                'content@master': {
                    templateUrl: function ($stateParams) {
                        // $stateParams.subpage = $stateParams.subpage ||
                        //     'open';
                        return require(
                            'file?name=views/master/[name].[hash].[ext]!./views/master/' +
                            $stateParams.subpage + '.html');
                    },
                    controllerProvider: ['$stateParams', function ($stateParams) {
                        // $stateParams.subpage = $stateParams.subpage ||
                        //     'deposit';
                        var ctrlPrefix = 'Master';
                        var ctrlSuffix = 'Controller';
                        var ctrlRoot = modCtrlName($stateParams.subpage);
                        return ctrlPrefix + ctrlRoot + ctrlSuffix;
                    }]
                }
            }
        })

    function modCtrlName(name) {
        var strArray = name.split(/[-_]/g);
        var i,
            length = strArray.length,
            tmpStr = '',
            newName = '';

        for (i = 0; i < length; i++) {
            tmpStr = strArray[i].charAt(0).toUpperCase() + strArray[i].substring(
                1);
            newName += tmpStr;
        }

        return newName;
    }
}
