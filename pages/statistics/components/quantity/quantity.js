/*
 * @Author: shenxh
 * @Date: 2021-09-01 09:04:30
 * @LastEditors: shenxh
 * @LastEditTime: 2021-09-01 16:16:33
 * @Description: 人员数量统计
 */
Component({
  data: {
    text: 'This is page data.'
  },
  // 页面创建时执行
  onLoad(options) {},
  // 页面出现在前台时执行
  onShow() {},
  // 页面首次渲染完毕时执行
  onReady() {},
  // 页面从前台变为后台时执行
  onHide() {},
  // 页面销毁时执行
  onUnload() {},
  // 触发下拉刷新时执行
  onPullDownRefresh() {},
  // 页面触底时执行
  onReachBottom() {},
  // 页面被用户分享时执行
  onShareAppMessage() {},
  // 页面滚动时执行
  onPageScroll() {},
  // 页面尺寸变化时执行
  onResize() {},
  // tab 点击时执行
  onTabItemTap(item) {
    console.log(item.index);
    console.log(item.pagePath);
    console.log(item.text);
  }
});
