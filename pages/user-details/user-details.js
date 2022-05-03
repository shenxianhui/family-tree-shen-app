/*
 * @Author: shenxh
 * @Date: 2021-09-02 14:05:52
 * @LastEditors: shenxh
 * @LastEditTime: 2022-05-03 20:22:45
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
      this.setData({
        userinfo: data,
      });
      // const { name, children = [] } = data;

      // wx.setNavigationBarTitle({
      //   title: name + '个人资料',
      // });
      // this.data.userinfo.children = children.map(item => {
      //   return {
      //     ...item,
      //     children: null,
      //   };
      // });
			// console.log(this.data.userinfo);

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
