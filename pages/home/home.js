Page({
  data: {},

  watch: {},

  /* 生命周期 */
  // 页面创建时执行
  // onLoad(options) {},

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

  // 页面滚动时执行
  // onPageScroll() {},

  // 页面尺寸变化时执行
  // onResize() {},

  // tab 点击时执行
  // onTabItemTap(item) {},

  /* 事件响应函数 */
  handleCover(evt) {
    const { menuIdx } = evt.currentTarget.dataset;

    switch (menuIdx) {
      // 族谱
      case 1:
        wx.navigateTo({
          url: '/pages/genealogy/genealogy',
        });
        break;
      // 简介
      case 2:
        wx.navigateTo({
          url: '/pages/synopsis/synopsis',
        });
        break;
      // 历程
      case 3:
        wx.navigateTo({
          url: '/pages/course/course',
        });
        break;
    }
  },
});
