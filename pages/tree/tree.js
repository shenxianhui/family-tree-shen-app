import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var data1 = {
    name: 'root',
    children: [
      {
        name: '申贤慧',
        children: [
          {
            name: '申贤慧1'
          },
          {
            name: '申贤慧2'
          },
          {
            name: '申贤慧3'
          },
          {
            name: '申贤慧4'
          },
          {
            name: '申贤慧5'
          },
          {
            name: '申贤慧6'
          },
          {
            name: '申贤慧7'
          },
          {
            name: '申贤慧8'
          },
          {
            name: '申贤慧9'
          },
          {
            name: '申贤慧10'
          },
          {
            name: '申贤慧11'
          },
          {
            name: '申贤慧12'
          },
          {
            name: '申贤慧13'
          },
          {
            name: '申贤慧14'
          },
          {
            name: '申贤慧15'
          },
          {
            name: '申贤慧16'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          },
          {
            name: '申贤慧'
          }
        ]
      },
      {
        name: 'b',
        children: [
          {
            name: 'b1'
          },
          {
            name: 'b2'
          },
          {
            name: 'b3'
          },
          {
            name: 'b4'
          }
        ]
      },
      {
        name: 'c',
        children: [
          {
            name: 'c1'
          }
        ]
      },
      {
        name: 'd',
        children: [
          {
            name: 'd1'
          }
        ]
      }
    ]
  };

  var option = {
    calculable: false,
    series: [
      {
        name: '族谱图',
        type: 'tree',
        orient: 'horizontal', // vertical horizontal
        rootLocation: {
          x: '50%',
          y: '15%'
        }, // 根节点位置  {x: 'center',y: 10}
        nodePadding: 20,
        layerPadding: 40,
        symbol: 'rect',
        symbolSize: [50, 20],
        roam: true,
        initialTreeDepth: -1, // 展开层级
        itemStyle: {
          normal: {
            color: '#3496eb', //节点背景色
            borderColor: '#3496eb',
            borderWidth: 0.5,
            label: {
              show: true,
              position: 'inside',
              textStyle: {
                color: '#ffffff',
                fontSize: 13
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
        data: [data1]
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
