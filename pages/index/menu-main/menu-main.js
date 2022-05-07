/*
 * @Author: shenxh
 * @Date: 2021-08-31 09:46:10
 * @LastEditors: shenxh
 * @LastEditTime: 2022-05-07 12:06:10
 * @Description: 树形图
 */
import * as echarts from '../../../ec-canvas/echarts';
import ancestors from '../../../assets/data/ancestors-tree';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import { formatTreeData } from '../../../utils/util';

let myChart = null;
let option = {
  // backgroundColor: new echarts.graphic.RadialGradient(0.4, 0.4, 0.8, [
  //   {
  //     offset: 0,
  //     color: '#f7f8fa',
  //   },
  //   {
  //     offset: 1,
  //     color: '#cdd0d5',
  //   },
  // ]),
  toolbox: {},
  series: [
    {
      name: '族谱图',
      type: 'tree',
      // zoom: 1,
      left: '20%',
      // right: '-300%',
      // top: '-870%',
      // bottom: '-1050%',
      orient: 'horizontal', // vertical horizontal
      symbol: 'none',
      symbolSize: false,
      roam: true, // 是否开启鼠标缩放和平移漫游 可以设置成 'scale' 或者 'move'。设置成 true 为都开启
      expandAndCollapse: false,
      initialTreeDepth: -1, // 展开层级
      edgeShape: 'polyline', // curve polyline
      label: {
        show: true,
        position: 'inside',
        // fontWeight: 'bold',
        // fontFamily: 'STLiti', // 华文隶书: STLiti; 楷体: KaiTi
        textStyle: {
          color: '#fff',
          fontSize: 24,
        },
        width: 110,
        height: 30,
        borderRadius: 4,
        backgroundColor: '#3496eb',
      },
      labelLayout: {
        // hideOverlap: true, // 隐藏重叠的标签
      },
      lineStyle: {
        color: '#3496eb',
        curveness: 0.5,
        width: 1,
        type: 'solid',
      },
      data: formatTreeData([ancestors], 1, null, initTreeData),
    },
  ],
  animation: false,
};

// 数据格式化
function initTreeData(data) {
  let color = '#3496eb';

  if (data.sex == 1) {
    color = '#5fbcff';
    if (data.star) {
      color = '#527efb';
    }
  } else {
    color = '#fb7f50';
    if (data.star) {
      color = '#f35835';
    }
  }

  return {
    label: {
      backgroundColor: color,
    },
  };
}

Page({
  data: {
    loading: false,
    showChartTree: false,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true,
    },
  },

  /* 生命周期 */
  // 页面创建时执行
  // onLoad(options) {},

  // 页面首次渲染完毕时执行
  onReady() {
    const _this = this;

    wx.getStorage({
      key: 'treeDlg',
      success() {
        _this.initChart();
      },
      fail() {
        Dialog.alert().then(() => {
          wx.setStorage({
            key: 'treeDlg',
            data: '1',
          });

          _this.initChart();
        });
      },
    });
  },

  // 页面销毁时执行
  onUnload() {
    this.dispose();
  },

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

  // 返回按钮
  handleBack() {
    wx.navigateBack();
  },

  // 图表初始化
  initChart() {
    this.setData({
      showChartTree: true,
      loading: true,
    });

    this.dispose();
    // 获取组件
    const ecComponent = this.selectComponent('#chart-tree');

    ecComponent.init((canvas, width, height, devicePixelRatio) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      myChart = echarts.init(canvas, null, {
        width,
        height,
        devicePixelRatio, // new
      });

      myChart.on('click', evt => {
        wx.navigateTo({
          url: '/pages/index/user-details/user-details',
          success: res => {
            res.eventChannel.emit('data', evt.data);
          },
        });
      });
      myChart.on('finished', () => {
        this.setData({
          loading: false,
        });
      });

      myChart.setOption(option);

      // 注意这里一定要返回 myChart 实例，否则会影响事件处理等
      return myChart;
    });
  },

  // 销毁实例
  dispose() {
    if (myChart) {
      myChart.dispose();
      myChart = null;
    }
  },
});
