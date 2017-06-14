export default class Operation {
    constructor(share) {
        Object.assign(this, {
            share
        });
        this.settings = {
            urls: {
                getRedbagList: '/api/bonus/list',                //get
                getRedagSelections: '/api/bonus/condition', //get
                createRedbag: '/api/bonus/addBonus',          //post
                updataRedbag: '/api/bonus/updateBonus',          //post
                getRedbagDetail: '/api/bonus/details',       //get
                modRedbagStatus: '/api/bonus/changeStatus',     //post
                checkOpName: '/api/bonus/checkOperation',       //get
                redbagUpdata_num: '/api/bonus/updateNum', //put
                getReceiveList: '/api/bonus/eList',          //get
            }
        }
    }
    
    getRedbagList(oParams) {
        return this.share.publicRequest(this.settings.urls.getRedbagList, 'GET', oParams);
    }

    getReceiveList(oParams) {
        return this.share.publicRequest(this.settings.urls.getReceiveList, 'GET', oParams);
    }

    //获取红包下拉选项
    getRedagSelections() {
        return this.share.publicRequest(this.settings.urls.getRedagSelections, 'GET');
    }

    //创建红包
    createRedbag(oParams) {
        return this.share.publicRequest(this.settings.urls.createRedbag, 'POST', oParams);
    }

    //修改红包信息
    updataRedbag(oParams) {
        return this.share.publicRequest(this.settings.urls.updataRedbag, 'POST', oParams);
    }

    //获取红包详细信息
    getRedbagDetail(id) {
        return this.share.publicRequest(this.settings.urls.getRedbagDetail, 'GET', {
            bonusId: id
        });
    }

    //生效，失效
    modRedbagStatus(id, status) {
        return this.share.publicRequest(this.settings.urls.modRedbagStatus, 'POST', {
            bonusId: id,
            status: status
        });
    }

    // 红包数量修改
    redbagUpdata_num(id, num) {
        return this.share.publicRequest(this.settings.urls.redbagUpdata_num, 'PUT', {
            bonusId: id,
            num: num
        });
    }

    //检测运营名称是否重复
    checkOpName(opName) {
        return this.share.publicRequest(this.settings.urls.checkOpName, 'GET', {
            operationName: opName
        });
    }
}

Operation.$inject = ['share'];