/*
 * @Author: shenxh
 * @Date: 2021-08-31 10:00:18
 * @LastEditors: shenxh
 * @LastEditTime: 2021-09-01 14:21:51
 * @Description: 族谱
 */
Page({
  data: {
    active: '1'
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

  changeTab(evt) {
    this.setData({
      active: evt.detail.name
    });
  }
});
