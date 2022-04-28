/*
 * @Author: shenxh
 * @Date: 2021-09-01 09:04:30
 * @LastEditors: shenxh
 * @LastEditTime: 2021-09-03 08:56:03
 * @Description: 统计
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

  // 转发
  onShareAppMessage() {
    return {
      title: '申氏族谱可视化小程序',
      path: '/page/genealogy/genealogy'
    };
  },
  // 分享朋友圈
  onShareTimeline() {
    return {
      title: '申氏族谱可视化小程序'
    };
  },

  changeTab(evt) {
    this.setData({
      active: evt.detail.name
    });
  }
});
