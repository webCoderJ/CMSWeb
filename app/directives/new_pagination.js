export default () => {
    class Page {
        constructor(conf) {
            Object.assign(this, {
                currentPage: conf.currentPage || 1,
                totalPage: conf.totalPage || 0,
                totalCount: conf.totalCount || 1,
                needLimit: conf.needLimit || null,
                limit: conf.limit || 20,
                jumpPage: conf.jumpPage || 1,
                showPage: conf.showPage || 5,
                needPrevAndNext: conf.needPrevAndNext || null,
                prevText: conf.prevText || '上一页',
                nextText: conf.nextText || '下一页',
                needFirstAndLast: conf.needFirstAndLast || null,
                firstText: conf.firstText || '首页',
                lastText: conf.lastText || '末页',
                jumpBtn: conf.jumpBtn || '跳转',
                needDotsLinks: conf.needDotsLinks || null,
                prevDotsText: conf.prevDotsText || '...',
                nextDotsText: conf.nextDotsText || '...',
                selectPage: conf.selectPage || null
            })
            this.getPages();
        }
        getPages() {
            if (this.totalPage <= 1) {
                return;
            }
            this.pageArray = [];
            let mid = Math.floor(this.showPage / 2),
                p = {
                    start: 0,
                    end: 0
                };
            p.start = this.currentPage - mid > 0 ? (this.totalPage - this.currentPage <=
                mid && this.totalPage > this.showPage ? this.totalPage - this.showPage + 1 : this.currentPage -
                mid) : 1;
            p.end = p.start + this.showPage - 1 > this.totalPage ? this.totalPage :
                p.start + this.showPage - 1;
            for (let i = p.start; i <= p.end; i++) {
                this.pageArray.push({
                    active: i == this.currentPage,
                    text: i
                });
            }
        }
        changeLimit(num) {
            if (window.localStorage) {

                localStorage["pagesize_limit"] = num;
                this.getPages();
                this.selectPage && this.selectPage();
            }
        }
        changePage(num) {
            num = Number(num);
            
            if (isNaN(num)) {
                return;
            }
            if (num < 1 || num > this.totalPage || num == this.currentPage) {
                return;
            }
            this.currentPage = parseInt(num);
            this.getPages();
            this.selectPage && this.selectPage();
        }
        hasNext() {
            return this.currentPage != this.totalPage;
        }
        hasPrev() {
            return this.currentPage != 1;
        }
        updateConfig(conf) {
            Object.assign(this, conf);
            this.getPages();
        }
    }
    return {
        restrict: 'EA',
        scope: {
            pageconf: '='
        },
        template: 
            '<div class="pagination-wrapper clearfix" ng-if="page.totalPage > 0">' +
                '<div ng-if="page.needLimit" class="pagination-info">' +
                    '显示第 {{(page.currentPage - 1)*page.limit+1}} 到第 {{page.currentPage*page.limit>page.totalCount ? page.totalCount : page.currentPage*page.limit}} 条记录，共 {{page.totalCount}} 条，每页显示' +
                    '<div class="pagination-limit">' +
                        '{{page.limit}}' +
                        '<ul>' +
                            '<li ng-click="page.changeLimit(20)">20</li>' +
                            '<li ng-click="page.changeLimit(50)">50</li>' +
                        '</ul>' +
                    '</div>' +
                    '条记录' +
                '</div>' +
                '<div class="pagination-jump" ng-if="page.totalPage > 1">' +
                    '<input class="jump-page" ng-model="page.jumpPage">' +
                    '<span class="total-page">/{{page.totalPage}}</span>' +
                    '<button class="btn btn-primary" ng-click="page.changePage(page.jumpPage)">{{page.jumpBtn}}</button>' +
                '</div>' +
                '<ul class="pagination" ng-if="page.totalPage > 1">' +
                    '<li ng-if="page.needFirstAndLast" class="start-end-page" ng-class="{disabled: !page.hasPrev()}"><a href="" ng-click="page.changePage(1)">{{page.firstText}}</a></li>' +
                    '<li ng-if="page.needPrevAndNext" class="start-end-page" ng-class="{disabled: !page.hasPrev()}"><a href="" ng-click="page.changePage(page.currentPage - 1)">{{page.prevText}}</a></li>' +
                    '<li ng-repeat="p in page.pageArray" ng-class="{active: p.active,disabled: p.active}"><a href="" ng-click="page.changePage(p.text)">{{p.text}}</a></li>' +
                    '<li ng-if="page.needPrevAndNext" class="start-end-page" ng-class="{disabled: !page.hasNext()}"><a href="" ng-click="page.changePage(page.currentPage + 1)">{{page.nextText}}</a></li>' +
                    '<li ng-if="page.needFirstAndLast" class="start-end-page" ng-class="{disabled: !page.hasNext()}"><a href="" ng-click="page.changePage(page.totalPage)">{{page.lastText}}</a></li>' +
                '</ul>' +
            '</div>',
        link: function(scope, element, attrs, controller) {
            scope.page = new Page(scope.pageconf);
            scope.$watch('pageconf', function(newVal) {
                scope.page.updateConfig(newVal)
            }, true);
        }
    }
}
