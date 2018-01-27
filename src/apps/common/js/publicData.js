import publicData from './publicDataJson.js';
const pageSizes = publicData.page.pageSizes;
const pageSize = (() => {
        let pubScrHeight = window.screen.height;
        let pubSize;
        let storedSize = localStorage.getItem('yls-default-page-size');
        if (storedSize != null && pageSizes.includes(Number(storedSize))) { //查找到存储的页显示条数且验证该页面存在页码数组中
                pubSize = Number(storedSize);
        } else {
                if (pubScrHeight < 900) { //通过浏览器可视高度判断页页面显示条数
                        pubSize = publicData.page.pageSet.lowSet;
                } else if (pubScrHeight >= 900 && pubScrHeight < 1000) {
                        pubSize = publicData.page.pageSet.midSet;
                } else {
                        pubSize = publicData.page.pageSet.highSet;
                }
        }
        return pubSize;
})();
function pubPageMethods(requestName = 'request') {
        let mixin = {
                data() {
                        return {
                                pageSize,
                                pageSizes,
                                currentPage: 1,
                                totalElements: 0
                        }
                },
                methods: {
                        handleSizeChange(val) {
                                this.pageSize = val
                                localStorage.setItem('yls-default-page-size', this.pageSize)
                                this.currentPage = 1;
                                this[requestName](this.currentPage - 1, this.pageSize)
                        },
                        handleCurrentChange(val) {
                                this.currentPage = val;
                                this[requestName](this.currentPage - 1, this.pageSize)
                        },
                        changePage(pageIndex) {
                                this.currentPage = pageIndex;
                                this[requestName](this.currentPage - 1, this.pageSize)
                        }
                }
        };
        return mixin;
}
function pubSizes() {
        return pageSize
}
const pagination = pubPageMethods
const pubPageSizes = pageSizes
const { ylsBase, ylsBusi, ylsSale } = publicData.baseUrl;
export { pubPageSizes, pubSizes, pubPageMethods, pagination };
export { ylsBase, ylsBusi, ylsSale };