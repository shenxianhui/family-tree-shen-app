/*
 * @Author: shenxh
 * @Date: 2021-09-02 14:05:52
 * @LastEditors: shenxh
 * @LastEditTime: 2022-05-03 23:43:06
 * @Description: 用户详情
 */

Page({
  data: {
    userinfo: {},
  },
  // 页面创建时执行
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();

    eventChannel.on('data', data => {
      wx.setNavigationBarTitle({
        title: data.name + '个人资料',
      });

      this.setData({
        userinfo: data,
      });
    });
  },
  // 页面出现在前台时执行
  onShow() {},
  // 页面首次渲染完毕时执行
  onReady() {},
  // 页面从前台变为后台时执行
  onHide() {},
  // 页面销毁时执行
  onUnload() {},

  // 页面被用户分享时执行
  onShareAppMessage() {
    return {
      title: '申氏族谱',
      path: '/pages/index/index',
    };
  },

  // 分享朋友圈
  onShareTimeline() {
    return {
      title: '申氏族谱',
      query: '/pages/index/index',
    };
  },
});
