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
                deleteAdvertise: '/api/entry/del'
            }
        }
    }
    /**
     * 
     *
     * @method getTraderList
     * @param {json} params 
     *      type  广告类型 0弹窗广告 1焦点图
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
     * @method updateAdvertise  删除广告
     * 
     * @param {json} params 
     *      recId        广告id
     */
    deleteAdvertise(recId) {
        return this.share.publicRequest(this.settings.urls.deleteAdvertise, 'DELETE', {
            recId: recId
        });
    }
    
}

Advertise.$inject = ['share'];