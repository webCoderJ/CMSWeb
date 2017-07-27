export default class Master {
    constructor(share) {
        Object.assign(this, {
            share
        });
        this.settings = {
            urls: {
                traderList: '/api/customer/list',
                ranklistList: '/api/master/list',
                getRankHistory: '/api/master/history',
                deleteTraderRanklist: '/api/master/delete',
                addTraderRanklist: '/api/master/add',
                getMasterTagList: '/api/masterTag/list',
                setMasterTagStatus: '/api/masterTag/changeStatus',
                addMasterTag: '/api/masterTag/add',
                recommendMaster: '/api/master/recommend',
                cancelRecommendMaster: '/api/master/cancelRecommend'
            }
        }
    }
    /**
     * 
     *
     * @method getTraderList
     * @param {json} params 
     *      anyway  关键词：昵称/姓名/邮箱/电话
     *      sort    排序字段，默认值profit_rate
     *      order   排序方式，默认值desc
     *      offset  offset，默认值0
     *      limit   每页条数，默认值20
     *      type    列表类型，1：所有自主交易客户，2：过滤掉已推荐高手榜的自主交易客户，默认值为1
     */
    getTraderList(params) {
        return this.share.publicRequest(this.settings.urls.traderList, 'GET', params);
    }

    /**
     * 
     *
     * @method getTraderList
     * @param {json} params 
     *      anyway  关键词：昵称/姓名/邮箱/电话
     *      status  
     *      balance 
     *      offset  offset，默认值0
     *      limit   每页条数，默认值20
     *      sum_rate    
     */
    getRanklistList(params) {
        return this.share.publicRequest(this.settings.urls.ranklistList, 'GET', params);
    }
    /**
     * 查看客户榜单历史
     *
     * @method getRankHistory
     *
     * @param {string}
     *      
     */
    getRankHistory (oParams) {
        return this.share.publicRequest(this.settings.urls.getRankHistory, 'GET', oParams);
    }

    /**
     * 从高手榜删除客户
     *
     * @method deleteTraderRanklist
     *
     * @param {string} mt4_ids  客户MT4 ID，多个值使用英文逗号分隔
     * @param {string} content  下榜原因
     *      
     */
    deleteTraderRanklist (ids, content) {
        return this.share.publicRequest(this.settings.urls.deleteTraderRanklist, 'DELETE', {
            mt4Id: ids,
            reason: content
        });
    }
    /**
     * 添加客户到推荐高手榜
     *
     * @method addTraderRanklist
     *
     * @param {string} mt4_ids  客户MT4 ID，多个值使用英文逗号分隔
     * @param {string} status   1=>默认,既在前台显示也在后台显示,2=>只在后台显示
     *      
     */
    addTraderRanklist (ids, status) {
        return this.share.publicRequest(this.settings.urls.addTraderRanklist, 'POST', {
            mt4Id: ids,
            status: status
        });
    }

    /**
     * 获取高手标签列表
     *
     * @method getMasterTagList
     *
     * @param {string} name  高手标签名称
     * @param {string} status   高手标签状态 0为正常 1为停用
     *      
     */
    getMasterTagList (params) {
        return this.share.publicRequest(this.settings.urls.getMasterTagList, 'GET', params);
    }

    /**
     * 改变高手标签状态
     *
     * @method setMasterTagStatus
     *
     * @param {string} id  高手标签id
     * @param {string} status   高手标签状态 0为正常 1为停用
     *      
     */
    setMasterTagStatus (params) {
        return this.share.publicRequest(this.settings.urls.setMasterTagStatus, 'GET', params);
    }

    /**
     * 添加高手标签
     *
     * @method addMasterTag
     *
     * @param {string} tagName  高手标签名称
     *      
     */
    addMasterTag (tagName) {
        return this.share.publicRequest(this.settings.urls.addMasterTag, 'POST', {
            name: tagName
        });
    }

    /**
     * 为前台高手推荐高手类型
     *
     * @method recommendMaster
     *
     * @param {string} masterId  高手id
     * @param {string} masterType  前台高手类型 1收益高手 2稳健高手 3常胜高手
     *      
     */
    recommendMaster (masterId, masterType) {
        return this.share.publicRequest(this.settings.urls.recommendMaster, 'GET', {
            masterId: masterId,
            masterType: masterType
        });
    }

    /**
     * 取消推荐高手类型
     *
     * @method cancelRecommendMaster
     *
     * @param {string} masterId  高手id
     *      
     */
    cancelRecommendMaster (masterId) {
        return this.share.publicRequest(this.settings.urls.cancelRecommendMaster, 'GET', {
            masterId: masterId
        });
    }
}

Master.$inject = ['share'];