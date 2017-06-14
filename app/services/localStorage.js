/*
 *  用来处理和 localStorage 相关的操作
 */
export default function () {
    var service = {
        setTableLocalStorage: setTableLocalStorage,
        setPagesizeLocalStorage: setPagesizeLocalStorage
    };

    return service;

    
    /*
     *  处理有些table 表格 显示项
     */
    function setTableLocalStorage (keyWord, options) {
        if (window.localStorage) {

            if (!localStorage.getItem(keyWord)) {
                localStorage.setItem(keyWord, "{}");
            } else {
                var storagePool = JSON.parse(localStorage[keyWord]);

                angular.forEach(options, function (value, index, item) {

                    if (storagePool[index] != null) {
                        item[index] = storagePool[index];
                    } else {
                        item[index] = true;
                    }
                });
                localStorage[keyWord] = JSON.stringify(storagePool);
            }
        }
    }

    /*
     *  处理 pagesize
     */
    function setPagesizeLocalStorage () {
        var pagesize;

        if (window.localStorage) {

            if (localStorage.pagesize_limit) {
                
                pagesize = Number(localStorage["pagesize_limit"]);

            } else {
                pagesize = 20;
                localStorage["pagesize_limit"] = pagesize;
            }
            
        } else {
            pagesize = 20;
        }
        return pagesize;
    }
}