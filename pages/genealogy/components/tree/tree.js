/*
 * @Author: shenxh
 * @Date: 2021-08-31 09:46:10
 * @LastEditors: shenxh
 * @LastEditTime: 2021-09-01 14:59:33
 * @Description: 树形图
 */
import * as echarts from '../../../../ec-canvas/echarts';
import ancestors from '../../../../data/ancestors';

// const app = getApp();
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  let ancestorsData = setAncestors([ancestors]);

  var option = {
    calculable: false,
    tooltip: {
      show: true,
      confine: true,
      formatter: data => {
        return data.data.info || '';
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        name: '族谱图',
        type: 'tree',
        orient: 'horizontal', // vertical horizontal
        left: '20%',
        right: '-200%',
        top: '-500%',
        bottom: '-700%',
        rootLocation: {
          x: 'center',
          y: '15%'
        }, // 根节点位置  {x: 'center',y: 10}
        symbol: 'rect',
        symbolSize: [60, 25],
        roam: true,
        expandAndCollapse: false,
        initialTreeDepth: -1, // 展开层级
        edgeShape: 'polyline',
        label: {
          show: true,
          position: 'inside',
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        lineStyle: {
          color: '#3496eb',
          curveness: 0.5,
          width: 0.5,
          type: 'solid'
        },
        itemStyle: {
          color: '#3496eb'
        },
        data: ancestorsData
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

function setAncestors(list) {
  let tmp = [];

  if (list && list.length) {
    tmp = list.map(item => {
      return Object.assign({}, item, {
        itemStyle: {
          color: item.star ? '#f56949' : '#3496eb'
        },
        children: setAncestors(item.children)
      });
    });
  }

  return tmp;
}

Component({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
});
