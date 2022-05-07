import ancestors from '../../../../assets/data/ancestors-tree';
import { formatTreeData } from '../../../../utils/util';

let ancestorsData = {};

Page({
  data: {
    searchLabel: '',
    searchVal: '',
    currentSideItem: 0,
    sidebarItemList: [],
    sideContentList: [],
  },

  watch: {},

  /* 生命周期 */
  // 页面创建时执行
  onLoad(options) {
    this.setTreeData(formatTreeData([ancestors]));

    this.setData({
      searchLabel: this.data.currentSideItem + 1 + '世',
      sideContentList: ancestorsData[this.data.currentSideItem + 1],
      sidebarItemList: Object.keys(ancestorsData).map(item => {
        return {
					title: item + '世',
					total: ancestorsData[item].length
				};
      }),
    });
  },

  // 页面出现在前台时执行
  // onShow() {},

  // 页面首次渲染完毕时执行
  // onReady() {},

  // 页面从前台变为后台时执行
  // onHide() {},

  // 页面销毁时执行
  onUnload() {
    ancestorsData = {};
  },

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
  // 搜索框输入事件
  changeSearch(e) {
    this.setData({
      searchVal: e.detail,
    });
    this.filterUser();
  },

  // 侧边栏选择事件
  changeSidebar(evt) {
    const { detail } = evt;

    this.setData({
      searchLabel: detail + 1 + '世',
      currentSideItem: detail,
      // sideContentList: ancestorsData[detail + 1],
    });
    this.filterUser();
  },

  // 搜索过滤
  filterUser() {
    let arr = [];

    ancestorsData[this.data.currentSideItem + 1].forEach(item => {
      if (item.name.includes(this.data.searchVal)) {
        arr.push(item);
      }
    });

    this.setData({
      sideContentList: arr,
    });
  },

  // 设置数据
  setTreeData(list) {
    if (!list || !list.length) return;

    list.forEach(item => {
      if (!ancestorsData[item.level]) {
        ancestorsData[item.level] = [];
      }
      ancestorsData[item.level].push(item);

      this.setTreeData(item.children);
    });
  },

	// 点击头像卡片
	handleCard(evt) {
    const { data } = evt.currentTarget.dataset;

		wx.navigateTo({
			url: '/pages/index/user-details/user-details',
			success: res => {
				res.eventChannel.emit('data', data);
			},
		});
	}
});
