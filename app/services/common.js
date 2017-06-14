export default class Common {
    constructor(share) {
        Object.assign(this, {
            share
        });
        this.settings = {
            urls: {
                getUserOfNum: '/api/customer/keyword',
            }
        }
    }
    /**
     * getUserOfNum 登陆
     *
     * @method getUserOfNum
     * @param keywords  手机号或者mt4用;隔开
     * 
     */
    getUserOfNum(keywords) {
        return this.share.publicRequest(this.settings.urls.getUserOfNum, 'GET', {
            keywords: keywords
        });
    }
}

Common.$inject = ['share'];