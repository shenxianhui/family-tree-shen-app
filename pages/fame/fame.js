Page({
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
  }
});
