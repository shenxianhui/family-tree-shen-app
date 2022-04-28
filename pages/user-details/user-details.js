/*
 * @Author: shenxh
 * @Date: 2021-09-02 14:05:52
 * @LastEditors: shenxh
 * @LastEditTime: 2021-09-02 15:55:08
 * @Description: 用户详情
 */

Page({
  data: {
    userinfo: {}
  },
  // 页面创建时执行
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();

    eventChannel.on('data', data => {
      console.log(data);
      let userinfo = { ...data };

      wx.setNavigationBarTitle({
        title: data.formatName + '个人资料'
      });
      userinfo.children = userinfo.children.map(item => {
        return Object.assign(item, {
          children: []
          // children: item.children.map(item1 => {
          //   return Object.assign(item1, {
          //     children: []
          //   });
          // })
        });
      });

      this.setData({
        userinfo
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
  onUnload() {}
});
