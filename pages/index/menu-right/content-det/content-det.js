Page({
  data: {
    data: null,
  },

  watch: {},

  /* 生命周期 */
  // 页面创建时执行
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();

    eventChannel.on('data', data => {
      this.setData({
        data,
      });
    });
  },

  // 页面出现在前台时执行
  // onShow() {},

  // 页面首次渲染完毕时执行
  // onReady() {},

  // 页面从前台变为后台时执行
  // onHide() {},

  // 页面销毁时执行
  // onUnload() {},

  // 触发下拉刷新时执行
  // onPullDownRefresh() {},

  // 页面触底时执行
  // onReachBottom() {},

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

  // 页面滚动时执行
  // onPageScroll() {},

  // 页面尺寸变化时执行
  // onResize() {},

  // tab 点击时执行
  // onTabItemTap(item) {},

  /* 事件响应函数 */
  handlePreviewImage(evt) {
    const { data } = evt.currentTarget.dataset;

    wx.previewImage({
      urls: [data.image],
    });
  },
});
