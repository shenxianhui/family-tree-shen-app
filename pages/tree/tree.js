import * as echarts from '../../ec-canvas/echarts';
import ancestors from '../../data/ancestors';

// const app = getApp();
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

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
        right: '-150%',
        top: '-120%',
        bottom: '-200%',
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
        itemStyle: {
          normal: {
            color: '#3496eb', //节点背景色
            // borderColor: '#3496eb',
            // borderWidth: 0.5,
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
              type: 'solid' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
            }
          }
        },
        data: [ancestors]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
});
