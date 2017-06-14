/**
 * README
 * 
 * 此服务用于封装散落于各个控制器中与指令交互数据的代码片段
 * 对于复杂度高的指令数据推荐使用
 */

export default function () {
    var service = {
        createPageFiled: createPageFiled
    };

    return service;

    /**
     * 创建一个用于与生成页码的
     * scope 该控制器的$scope对象
     */
    function createPageFiled(scope, pageName, pullFunc) {
        scope[pageName] = {
            needPrevAndNext: 1,
            needFirstAndLast: 1,
            needDotsLinks: 1,
            needLimit: 1,
            selectPage: function () {
                pullFunc(this.currentPage);
            }
        };
    };
}