export default class Common {
    constructor(share) {
        Object.assign(this, {
            share
        });
        this.settings = {
            urls: {
                getUserOfNum: '/api/customer/keyword',
                getCustomerDetails: '/api/customer/details',
                getCustomerRealtimeDetails: '/api/customer/realtimeData',
                getMt4TradeList: '/api/mt4Trade/tlist',
                getCustomerCallback: '/api/customer/callback',
                getFollowMasterCurrent: '/api/copy/followMaster',
                getFollowMasterHistory: '/api/copy/followMasterHistory',
                getFollowCurrent: '/api/copy/follow',
                getFollowHistory: '/api/copy/followHistory',
                getCopyAmountChangeHis: '/api/copy/changeCopyAmount',
                getRedbagList: '/api/customer/bonus'
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
    /**
     * getCustomerDetails 获取客户详情
     *
     * @method getCustomerDetails
     * @param mt4Id
     * 
     */
    getCustomerDetails(mt4Id) {
        return this.share.publicRequest(this.settings.urls.getCustomerDetails, 'GET', {
            mt4Id: mt4Id
        });
    }
    /**
     * getCustomerRealtimeDetails 获取客户实时数据
     *
     * @method getCustomerRealtimeDetails
     * @param mt4Id
     * 
     */
    getCustomerRealtimeDetails(mt4Id) {
        return this.share.publicRequest(this.settings.urls.getCustomerRealtimeDetails, 'GET', {
            mt4Id: mt4Id
        });
    }
    /**
     * getMt4TradeList 获取客户交易历史/当前持仓
     *
     * @method getMt4TradeList
     * @param customerId    id
     * @param type          1当前持仓 -1交易历史
     * @param offset
     * @param limit
     * 
     */
    getMt4TradeList(id, type, offset, limit) {
        return this.share.publicRequest(this.settings.urls.getMt4TradeList, 'GET', {
            customerId: id,
            type: type,
            offset: offset,
            limit: limit
        });
    }
    /**
     * getCustomerCallback 获取客户回访记录列表
     *
     * @method getCustomerCallback
     * 
     * @param userCode      user code
     * @param offset
     * @param limit
     * 
     */
    getCustomerCallback(userCode, offset, limit) {
        return this.share.publicRequest(this.settings.urls.getCustomerCallback, 'GET', {
            userCode: userCode,
            offset: offset,
            limit: limit
        });
    }
    /**
     * getFollowMasterCurrent 当前跟随高手列表
     *
     * @method getFollowMasterCurrent
     * @param mt4Id    mt4Id
     * @param offset
     * @param limit
     * 
     */
    getFollowMasterCurrent(mt4Id, offset, limit) {
        return this.share.publicRequest(this.settings.urls.getFollowMasterCurrent, 'GET', {
            mt4Id: mt4Id,
            offset: offset,
            limit: limit
        });
    }
    /**
     * getFollowMasterHistory 历史跟随高手列表
     *
     * @method getFollowMasterHistory
     * @param mt4Id    mt4Id
     * @param offset
     * @param limit
     * 
     */
    getFollowMasterHistory(mt4Id, offset, limit) {
        return this.share.publicRequest(this.settings.urls.getFollowMasterHistory, 'GET', {
            mt4Id: mt4Id,
            offset: offset,
            limit: limit
        });
    }
    /**
     * getFollowCurrent 当前跟随者列表
     *
     * @method getFollowCurrent
     * @param mt4Id    mt4Id
     * @param offset
     * @param limit
     * 
     */
    getFollowCurrent(mt4Id, offset, limit) {
        return this.share.publicRequest(this.settings.urls.getFollowCurrent, 'GET', {
            mt4Id: mt4Id,
            offset: offset,
            limit: limit
        });
    }
    /**
     * getFollowHistory 历史跟随者列表
     *
     * @method getFollowHistory
     * @param mt4Id    mt4Id
     * @param offset
     * @param limit
     * 
     */
    getFollowHistory(mt4Id, offset, limit) {
        return this.share.publicRequest(this.settings.urls.getFollowHistory, 'GET', {
            mt4Id: mt4Id,
            offset: offset,
            limit: limit
        });
    }
    /**
     * getCopyAmountChangeHis 跟单金额变动历史
     *
     * @method getCopyAmountChangeHis
     * @param mt4From    高手mt4Id
     * @param mt4To     跟随者mt4Id
     * @param startDate 开始时间
     * @param endDate   结束时间
     */
    getCopyAmountChangeHis(params) {
        return this.share.publicRequest(this.settings.urls.getCopyAmountChangeHis, 'GET', params);
    }
    /**
     * getRedbagList 获取用户的红包列表
     *
     * @method getRedbagList
     * @param mt4Id    mt4Id
     * @param offset
     * @param limit
     * 
     */
    getRedbagList(mt4Id, offset, limit) {
        return this.share.publicRequest(this.settings.urls.getRedbagList, 'GET', {
            mt4Id: mt4Id,
            offset: offset,
            limit: limit
        });
    }
}

Common.$inject = ['share'];