export default class Account {
    constructor(share) {
        Object.assign(this, {
            share
        });
        this.settings = {
            urls: {
                loginInUrl: '/api/auth/login',
                logOutUrl: '/api/auth/logout',
                userPowerUrl: '/api/manager/permission',
            }
        }
    }
    /**
     * login 登陆
     *
     * @method login
     * @param username  用户名
     * @param password  密码
     */
    login(username, password) {
        return this.share.publicRequest(this.settings.urls.loginInUrl, 'GET', {
            account: username,
            password: password
        });
    }
    /**
     * getUserPower 获取用户菜单权限
     * 
     * @method getUserPower
     */
    getUserPower(){
        return this.share.publicRequest(this.settings.urls.userPowerUrl, 'GET');
    }
    /**
     * logOut 退出登录
     *
     * @method logOut
     */
    logOut() {
        return this.share.publicRequest(this.settings.urls.logOutUrl, 'GET');
    }
}

Account.$inject = ['share'];