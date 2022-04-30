/*
 * @Author: shenxh
 * @Date: 2021-08-31 09:46:10
 * @LastEditors: shenxh
 * @LastEditTime: 2022-04-30 14:13:58
 * @Description: 树形图
 */
import * as echarts from '../../ec-canvas/echarts';
import ancestors from '../../assets/data/ancestors-tree';

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  });
  canvas.setChart(chart);

  chart.on('click', evt => {
    wx.navigateTo({
      url: '/pages/user-details/user-details',
      success: res => {
        res.eventChannel.emit('data', evt.data);
      },
    });
  });

  let ancestorsData = setAncestors([ancestors]);

  var option = {
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
    series: [
      {
        // zoom: 0.5,
        name: '族谱图',
        type: 'tree',
				left: '20%',
				right: '-300%',
				top: '-870%',
				bottom: '-1050%',
        orient: 'horizontal', // vertical horizontal
        rootLocation: {
          x: 'center',
          y: 'center',
        }, // 根节点位置  {x: 'center',y: 10}
        symbol: 'none',
        symbolSize: false,
        roam: 'move', // 是否开启鼠标缩放和平移漫游 可以设置成 'scale' 或者 'move'。设置成 true 为都开启
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
            fontSize: 18,
          },
          width: 70,
          height: 30,
          backgroundColor: '#3496eb',
        },
        labelLayout: {
          hideOverlap: true, // 隐藏重叠的标签
        },
        lineStyle: {
          color: '#3496eb',
          curveness: 0.5,
          width: 1,
          type: 'solid',
        },
        data: ancestorsData,
      },
    ],
    animation: false,
  };

  chart.setOption(option);
  return chart;
}

function setAncestors(list, parent = {}) {
  let tmp = [];

  if (list && list.length) {
    tmp = list.map(item => {
      let color = '#3496eb';

      if (item.sex == 1) {
        color = '#5fbcff';
        if (item.star) {
          color = '#527efb';
        }
      } else {
        color = '#fb7f50';
        if (item.star) {
          color = '#f35835';
        }
      }

      return Object.assign({}, item, {
        // name: item.name.split('').join('\n'),
        formatName: item.name,
        parent,
        label: {
          backgroundColor: color,
        },
        children: setAncestors(item.children, item),
      });
    });
  }

  return tmp;
}

Page({
  data: {
    ec: {
      onInit: initChart,
    },
  },

  onReady() {},

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

  handleBack() {
    wx.switchTab({
      url: '/pages/home/home',
    });
  },
});
