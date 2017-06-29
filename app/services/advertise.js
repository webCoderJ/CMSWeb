export default class Advertise {
    constructor(share) {
        Object.assign(this, {
            share
        });
        this.settings = {
            urls: {
                advertiseList: '/api/entry/list',
                updateAdvertise: '/api/entry/update',
                addAdvertise: '/api/entry/add',
                uploadFile: '/api/upload/image',
                deleteAdvertise: '/api/entry/del',
                getSettingList: '/api/entry/eList',
                getSettingTagList: '/api/entry/tList',
                addSettingEle: '/api/entry/addE',
                updateSettingEle: '/api/entry/updateE',
                deleteSettingEle: '/api/entry/delE',
                addSettingTag: '/api/entry/addT',
                updateSettingTag: '/api/entry/updateT',
                deleteSettingTag: '/api/entry/delT'
            }
        }
    }
    /**
     * 
     *
     * @method getAdvertiseList
     * @param {json} params 
     *      type  广告类型 弹窗广告, 焦点图
     */
    getAdvertiseList(type) {
        return this.share.publicRequest(this.settings.urls.advertiseList, 'GET', {
            identifier: type
        });
    }

    /**
     * 
     * @method updateAdvertise  修改广告信息
     * 
     * @param {json} params 
     *      id
     *      name        活动名称
     *      backImgUrl  背景图片
     *      imgUrl      广告图片
     *      targetUrl   链接地址
     *      startTime
     *      endTime
     */
    updateAdvertise(params) {
        return this.share.publicRequest(this.settings.urls.updateAdvertise, 'POST', params);
    }

    /**
     * 
     * @method updateAdvertise  修改广告信息
     * 
     * @param {json} params 
     *      id
     *      name        活动名称
     *      backImgUrl  背景图片
     *      imgUrl      广告图片
     *      targetUrl   链接地址
     *      startTime
     *      endTime
     */
    addAdvertise(params) {
        return this.share.publicRequest(this.settings.urls.addAdvertise, 'POST', params);
    }

    /**
     * 
     * @method updateAdvertise  修改广告信息
     * 
     * @param {json} params 
     *      type        上传类型 file正常上传 base64图片文件转成base64字符串上传
     *      file        文件
     */
    uploadFile(type, file) {
        return this.share.publicRequest(this.settings.urls.uploadFile, 'POST', {
            type: type,
            file: file
        });
    }

    /**
     * 
     * @method deleteAdvertise  删除广告
     * 
     * @param {json} params 
     *      recId        广告id
     */
    deleteAdvertise(recId) {
        return this.share.publicRequest(this.settings.urls.deleteAdvertise, 'DELETE', {
            recId: recId
        });
    }

    /**
     * 
     *
     * @method getSettingList 获取条目列表
     * @param {json} params 
     *      
     */
    getSettingList() {
        return this.share.publicRequest(this.settings.urls.getSettingList, 'GET');
    }

    /**
     * 
     *
     * @method getSettingTagList 获取条目内标签列表
     * @param {json} params 
     *      entryId     条目id
     */
    getSettingTagList(entryId) {
        return this.share.publicRequest(this.settings.urls.getSettingTagList, 'GET', {
            entryId: entryId
        });
    }
    /**
     * 
     * @method addSettingEle  新增条目
     * 
     * @param {json} params 
     *      name        条目名称
     *      desc        条目描述
     *      identifier  条目的区分标识
     *      
     */
    addSettingEle(params) {
        return this.share.publicRequest(this.settings.urls.addSettingEle, 'POST', params);
    }
    /**
     * 
     * @method updateSettingEle  修改条目
     * 
     * @param {json} params 
     *      entryId     条目id
     *      name        条目名称
     *      desc        条目描述
     *      identifier  条目的区分标识
     *      
     */
    updateSettingEle(params) {
        return this.share.publicRequest(this.settings.urls.updateSettingEle, 'POST', params);
    }
    /**
     * 
     * @method deleteSettingEle  删除广告
     * 
     * @param {json} params 
     *      entryId        条目id
     */
    deleteSettingEle(entryId) {
        return this.share.publicRequest(this.settings.urls.deleteSettingEle, 'DELETE', {
            entryId: entryId
        });
    }
    /**
     * 
     * @method addSettingTag  新增标签
     * 
     * @param {json} params 
     *      entryId     条目id
     *      desc        标签描述
     *      
     */
    addSettingTag(entryId, desc) {
        return this.share.publicRequest(this.settings.urls.addSettingTag, 'POST', {
            entryId: entryId,
            desc: desc
        });
    }
    /**
     * 
     * @method updateSettingTag  修改标签
     * 
     * @param {json} params 
     *      tabId       标签id
     *      desc        标签描述
     *      
     */
    updateSettingTag(tabId, desc) {
        return this.share.publicRequest(this.settings.urls.updateSettingTag, 'POST', {
            tabId: tabId,
            desc: desc
        });
    }
    /**
     * 
     * @method deleteSettingTag  删除标签
     * 
     * @param {json} params 
     *      tabId        标签id
     */
    deleteSettingTag(tabId) {
        return this.share.publicRequest(this.settings.urls.deleteSettingTag, 'DELETE', {
            tabId: tabId
        });
    }
}

Advertise.$inject = ['share'];