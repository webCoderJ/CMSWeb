import layer from '../libs/layer.js';
export default function () {

    /**
     * 创建一个layer 弹窗
     * 
     */
    function createLayer(params) {
        var type = params.type || 'msg';
        var message = params.message || 'load Err';

        if (type === 'close') {
            layer.closeAll();
        }
        
        if (type === 'msg') {
            //提示层
            layer.msg(message);
        }

        if (type === 'confirm') {
            //询问框
            layer.confirm(message, {
                btn: params.btnArr,
                title: params.title
            }, params.func1, params.func2);
        }
    };

    return createLayer;
}