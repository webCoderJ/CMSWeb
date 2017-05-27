export default class Master {
    constructor(share) {
        Object.assign(this, {
            share
        });
        this.settings = {
            urls: {
                testList: '/api/customer/list'
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
    getTestList() {
        return this.share.publicRequest(this.settings.urls.testList, 'GET');
    }
}

Master.$inject = ['share'];