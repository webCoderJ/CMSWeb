export default class Account {
    constructor(share) {
        Object.assign(this, {
            share
        });
        this.settings = {
            urls: {
                loginInUrl: '/api/auth/login'
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
        return this.share.publicRequest(this.settings.urls.loginInUrl, 'POST', {
            username: username,
            password: password
        });
    }
}

Account.$inject = ['share'];