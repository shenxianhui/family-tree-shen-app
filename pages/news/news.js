import ancestors from '../../data/ancestors';

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
  // 触发下拉刷新时执行
  onPullDownRefresh() {},
  // 页面触底时执行
  onReachBottom() {},
  // 页面被用户分享时执行
  onShareAppMessage() {},
  // 页面滚动时执行
  onPageScroll() {},
  // 页面尺寸变化时执行
  onResize() {},
  // tab 点击时执行
  onTabItemTap(item) {
    let obj = Object.assign(ancestors, {
      generation: '一世',
      class: 1,
      children: this.setList(ancestors.children, 2)
    });

    // console.log(JSON.stringify(obj));
  },

  setList(arr, num) {
    let tmp = [];
    let generation = '';

    if (num == 1) {
      generation = '一世';
    }
    if (num == 2) {
      generation = '二世';
    }
    if (num == 3) {
      generation = '三世';
    }
    if (num == 4) {
      generation = '四世';
    }
    if (num == 5) {
      generation = '五世';
    }
    if (num == 6) {
      generation = '六世';
    }
    if (num == 7) {
      generation = '七世';
    }
    if (num == 8) {
      generation = '八世';
    }
    if (num == 9) {
      generation = '九世';
    }
    if (num == 10) {
      generation = '十世';
    }
    if (num == 11) {
      generation = '十一世';
    }
    if (num == 12) {
      generation = '十二世';
    }
    if (num == 13) {
      generation = '十三世';
    }
    if (num == 14) {
      generation = '十四世';
    }
    if (num == 15) {
      generation = '十五世';
    }
    if (num == 16) {
      generation = '十六世';
    }
    if (num == 17) {
      generation = '十七世';
    }
    if (num == 18) {
      generation = '十八世';
    }
    if (num == 19) {
      generation = '十九世';
    }
    if (num == 20) {
      generation = '二十世';
    }

    if (arr && arr.length) {
      tmp = arr.map(item => {
        return Object.assign(item, {
          generation,
          class: num,
          children: this.setList(item.children, num + 1)
        });
      });
    }

    return tmp;
  }
});
