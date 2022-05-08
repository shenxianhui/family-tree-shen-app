import ancestors from '../../../../assets/data/ancestors-tree';
import { formatTreeData } from '../../../../utils/util';

let ancestorsData = {};

Page({
  data: {
    loading: false,
    searchVal: '',
    currentSideItem: 0,
    sidebarItemList: [],
    sideContentList: [],
    pageNo: 1,
    pageSize: 40,
  },

  watch: {},

  /* 生命周期 */
  // 页面创建时执行
  onLoad(options) {
    this.setTreeData(formatTreeData([ancestors]));

    let arr = [
      ...Object.keys(ancestorsData).map(item => {
        // 获取全部数据
        if (!ancestorsData[0]) {
          ancestorsData[0] = [];
        }
        ancestorsData[0].push(...ancestorsData[+item]);

        return item + '世';
      }),
    ];

    this.setData({
      sidebarItemList: ['全部', ...arr],
    });
    this.loadMore();
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
      pageNo: 1,
      searchVal: e.detail,
      currentSideItem: 0,
      sideContentList: [],
    });
    this.loadMore();
  },

  // 侧边栏选择事件
  changeSidebar(evt) {
    const { detail } = evt;

    this.setData({
      pageNo: 1,
      currentSideItem: detail,
      sideContentList: [],
    });
    this.loadMore();
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
  },

  // 滚动到底部
  scrolLower(evt) {
    const { sideContentList, pageNo } = this.data;
    const filterArr = this.filterUser();

    if (sideContentList.length >= filterArr.length) return;

    this.setData({
      loading: true,
      pageNo: pageNo + 1,
    });
    this.loadMore();
  },

  // 加载更多
  loadMore() {
    const { sideContentList, pageNo, pageSize } = this.data;
    const filterArr = this.filterUser();

    if (sideContentList.length < filterArr.length) {
      let oldArr = sideContentList;
      const sliceArr = filterArr.slice((pageNo - 1) * pageSize, pageNo * pageSize);

      if (!sliceArr.length) return;

      oldArr.push(...sliceArr);

      this.setData({
        loading: false,
        sideContentList: oldArr,
      });
    } else {
      this.setData({
        loading: false,
      });
    }
  },

  // 搜索过滤
  filterUser() {
    const { currentSideItem, searchVal } = this.data;

    if (!ancestorsData[currentSideItem]) return [];

    return ancestorsData[currentSideItem].filter(item => {
      return item.name.includes(searchVal);
    });
  },
});
