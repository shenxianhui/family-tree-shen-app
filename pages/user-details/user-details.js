/*
 * @Author: shenxh
 * @Date: 2021-09-02 14:05:52
 * @LastEditors: shenxh
 * @LastEditTime: 2022-04-29 17:17:31
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
      console.log(data);
      let userinfo = { ...data };

      wx.setNavigationBarTitle({
        title: data.formatName + '个人资料',
      });
      userinfo.children = userinfo.children.map(item => {
        return Object.assign(item, {
          children: [],
          // children: item.children.map(item1 => {
          //   return Object.assign(item1, {
          //     children: []
          //   });
          // })
        });
      });

      this.setData({
        userinfo,
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
      path: '/pages/home/home',
    };
  },

  // 分享朋友圈
  onShareTimeline() {
    return {
      title: '申氏族谱',
      query: '/pages/home/home',
    };
  },
});
