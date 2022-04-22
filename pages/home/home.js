import F6 from '@antv/f6-wx';
import force from '@antv/f6-wx/extends/layout/forceLayout';

Page({
  canvas: null,
  ctx: null,
  renderer: '', // mini、mini-native等，F6需要，标记环境
  graph: null,

  data: {
    width: 375,
    height: 600,
    pixelRatio: 1,
    forceMini: false,
  },

  watch: {},

  /* 生命周期 */
  // 页面创建时执行
  onLoad() {
    F6.registerLayout('force', force);
    // 同步获取window的宽高
    const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();

    this.setData({
      canvasWidth: windowWidth,
      canvasHeight: windowHeight,
      pixelRatio,
    });
  },

  // 页面出现在前台时执行
  // onShow() {},

  // 页面首次渲染完毕时执行
  onReady() {
    wx.setNavigationBarTitle({
      title: '首页',
    });
  },

  // 页面从前台变为后台时执行
  // onHide() {},

  // 页面销毁时执行
  onUnload() {
    this.graph && this.graph.destroy();
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
  /**
   * 初始化cnavas回调，缓存获得的context
   * @param {*} ctx 绘图context
   * @param {*} rect 宽高信息
   * @param {*} canvas canvas对象，在render为mini时为null
   * @param {*} renderer 使用canvas 1.0还是canvas 2.0，mini | mini-native
   */
  handleCanvasInit(event) {
    const { ctx, canvas, renderer } = event.detail;
    this.isCanvasInit = true;
    this.ctx = ctx;
    this.renderer = renderer;
    this.canvas = canvas;
    this.updateChart();
  },

  /**
   * canvas派发的事件，转派给graph实例
   */
  handleTouch(e) {
    this.graph && this.graph.emitEvent(e.detail);
  },

  updateChart() {
    const { canvasWidth, canvasHeight, pixelRatio } = this.data;
    const data = {
      nodes: [
        { id: 'node0', size: 50 },
        { id: 'node1', size: 30 },
        { id: 'node2', size: 30 },
        { id: 'node3', size: 30 },
        { id: 'node4', size: 30, isLeaf: true },
        { id: 'node5', size: 30, isLeaf: true },
        { id: 'node6', size: 15, isLeaf: true },
        { id: 'node7', size: 15, isLeaf: true },
        { id: 'node8', size: 15, isLeaf: true },
        { id: 'node9', size: 15, isLeaf: true },
        { id: 'node10', size: 15, isLeaf: true },
        { id: 'node11', size: 15, isLeaf: true },
        { id: 'node12', size: 15, isLeaf: true },
        { id: 'node13', size: 15, isLeaf: true },
        { id: 'node14', size: 15, isLeaf: true },
        { id: 'node15', size: 15, isLeaf: true },
        { id: 'node16', size: 15, isLeaf: true },
      ],
      edges: [
        { source: 'node0', target: 'node1', id: 'edge0' },
        { source: 'node0', target: 'node2', id: 'edge1' },
        { source: 'node0', target: 'node3', id: 'edge2' },
        { source: 'node0', target: 'node4', id: 'edge3' },
        { source: 'node0', target: 'node5', id: 'edge4' },
        { source: 'node1', target: 'node6', id: 'edge5' },
        { source: 'node1', target: 'node7', id: 'edge6' },
        { source: 'node2', target: 'node8', id: 'edge7' },
        { source: 'node2', target: 'node9', id: 'edge8' },
        { source: 'node2', target: 'node10', id: 'edge9' },
        { source: 'node2', target: 'node11', id: 'edge10' },
        { source: 'node2', target: 'node12', id: 'edge11' },
        { source: 'node2', target: 'node13', id: 'edge12' },
        { source: 'node3', target: 'node14', id: 'edge13' },
        { source: 'node3', target: 'node15', id: 'edge14' },
        { source: 'node3', target: 'node16', id: 'edge15' },
      ],
    };

    // 创建F6实例
    this.graph = new F6.Graph({
      container: this.canvas,
      context: this.ctx,
      renderer: this.renderer,
      width: canvasWidth,
      height: canvasHeight,
      pixelRatio,
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
      },
      layout: {
        type: 'force',
      },
      defaultNode: {
        size: 15,
      },
    });

    // 注册数据
    this.graph.data(data);
    this.graph.render();
    this.graph.fitView();
  },
});
