import F6 from '@antv/f6-wx';
import TreeGraph from '@antv/f6-wx/extends/graph/treeGraph';

import treeData from '../../data/ancestors-tree';

Page({
  canvas: null,
  ctx: null, // 延迟获取的2d context
  renderer: '', // mini、mini-native等，F6需要，标记环境
  isCanvasInit: false, // canvas是否准备好了
  graph: null,

  data: {
    width: 375,
    height: 600,
    pixelRatio: 2,
    forceMini: false,
  },

  watch: {},

  /* 生命周期 */
  // 页面创建时执行
  onLoad() {
    // 注册自定义树，节点等
    F6.registerGraph('TreeGraph', TreeGraph);

    // 同步获取window的宽高
    const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();

    this.setData({
      width: windowWidth,
      height: windowHeight,
      pixelRatio,
    });
  },

  // 页面首次渲染完毕时执行
  onReady() {
    wx.setNavigationBarTitle({
      title: '首页',
    });
  },

  // 页面销毁时执行
  onUnload() {
    this.graph && this.graph.destroy();
  },

  /* 事件响应函数 */
  /**
   * 初始化cnavas回调，缓存获得的context
   * @param {*} ctx 绘图context
   * @param {*} rect 宽高信息
   * @param {*} canvas canvas对象，在render为mini时为null
   * @param {*} renderer 使用canvas 1.0还是canvas 2.0，mini | mini-native
   */
  handleInit(event) {
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
    const { width, height, pixelRatio } = this.data;

    // 创建F6实例
    this.graph = new F6.TreeGraph({
      context: this.ctx,
      renderer: this.renderer,
      width,
      height,
      pixelRatio,
      fitView: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const model = item.getModel();
              model.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
      },
      layout: {
        // 紧凑树: compactBox; 生态树: dendrogram; 脑图树: mindmap; 缩进树: indented; 辐射树: dendrogram
        type: 'compactBox',
        direction: 'LR',
        nodeSep: 30,
        rankSep: 100,
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    this.graph.node(function (node) {
      return {
        label: node.name,
        labelCfg: {
					position: 'right',
          // offset: 10,
          // position: node.children && node.children.length > 0 ? 'left' : 'right',
        },
      };
    });

    this.graph.data(treeData);
    this.graph.render();
  },

  getTreeData(list) {
    if (!list || !list.length) return [];

    let data = list.map(item => {
      return {
        ...item,
        id: item.name,
        children: this.getTreeData(item.children),
      };
    });

    return data;
  },
});
