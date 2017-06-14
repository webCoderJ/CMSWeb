/*
建立一个公共的share service 专门提供数据
*/
export default class Share {
    constructor($http) {
        Object.assign(this, {
            $http
        });
        this.CMS_GLOBAL = {};
    }
    clear(){
    	this.CMS_GLOBAL = {};
    }
    publicRequest($url, $method, $params){
        const self = this;
        $params = $params ? $params : {};
        
        if ($method.toUpperCase() === 'GET') {
            return self.$http.get($url, {
                params: $params
            }).then(function (data) {
                // console.log(data);
                if (data.data.err_code === 10000) {

                    window.location.href = '/#/login/index';
                } else {
                    return data.data;
                }
            }, function (error) {
                self.errFunc(error);
            });
        }

        if ($method.toUpperCase() === 'POST') {
            // console.log($params);
            return self.$http.post($url, $params).then(function (data) {
                // console.log(data);
                if (data.data.err_code === 10000) {
                    window.location.href = '/#/login/index';
                } else {
                    return data.data;
                }
            }, function (error) {
                self.errFunc(error);
            });
        }

        if ($method.toUpperCase() === 'PUT') {
            // console.log($params);
            return self.$http.put($url, $params).then(function (data) {
                // console.log(data);
                if (data.data.err_code === 10000) {
                    window.location.href = '/#/login/index';
                } else {
                    return data.data;
                }
            }, function (error) {
                self.errFunc(error);
            });
        }

        if ($method.toUpperCase() === 'DELETE') {
            // console.log($params);
            return self.$http.delete($url, {
                params: $params
            }).then(function (data) {
                // console.log(data);
                if (data.data.err_code === 10000) {
                    window.location.href = '/#/login/index';
                } else {
                    return data.data;
                }
            }, function (error) {
                self.errFunc(error);
            });
        }
    }
    errFunc (error) {
        console.log(error);
        console.log("服务器异常");
    }
}
Share.$inject = ['$http'];
/*
CMS_GLOBAL.user_power :  当前登录用户所有的菜单权限 操作权限 等 -->用于显示
CMS_GLOBAL.all_power :  所有的权限列表  -->用于系统设置－用户设置－设置权限
*/
