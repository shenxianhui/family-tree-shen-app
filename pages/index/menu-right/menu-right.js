import courseData from '../../../assets/data/course';

Page({
  data: {
    courseData,
  },

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
  // onShareAppMessage() {},

  // 页面滚动时执行
  // onPageScroll() {},

  // 页面尺寸变化时执行
  // onResize() {},

  // tab 点击时执行
  // onTabItemTap(item) {},

  /* 事件响应函数 */
  handleCard(evt) {
    const { data } = evt.currentTarget.dataset;

    wx.navigateTo({
      url: '/pages/index/menu-right/content-det/content-det',
      success: res => {
        res.eventChannel.emit('data', data);
      },
    });
  },
});
