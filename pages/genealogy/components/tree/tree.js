/*
 * @Author: shenxh
 * @Date: 2021-08-31 09:46:10
 * @LastEditors: shenxh
 * @LastEditTime: 2021-09-02 15:47:12
 * @Description: 树形图
 */
import * as echarts from '../../../../ec-canvas/echarts';
import ancestors from '../../../../data/ancestors';

const _ancestors = JSON.parse(JSON.stringify(ancestors));

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  chart.on('click', evt => {
    wx.navigateTo({
      url: '/pages/user-details/user-details',
      success: res => {
        res.eventChannel.emit('data', evt.data);
      }
    });
  });

  let ancestorsData = setAncestors([_ancestors]);

  var option = {
    calculable: false,
    // tooltip: {
    //   show: true,
    //   confine: true,
    //   formatter: data => {
    //     return data.data.info || '';
    //   }
    // },

    backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#e6e9f0'
      },
      {
        offset: 1,
        color: '#eef1f5'
      }
    ]),
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
        right: '-300%',
        top: '-1000%',
        bottom: '-1300%',
        // orient: 'vertical', // vertical horizontal
        // left: '-1600%',
        // right: '-2200%',
        // top: '10%',
        // bottom: '-200%',
        rootLocation: {
          x: 'center',
          y: 'center'
        }, // 根节点位置  {x: 'center',y: 10}
        symbol: 'rect',
        symbolSize: [60, 25],
        // symbolSize: [25, 60],
        roam: true,
        expandAndCollapse: false,
        initialTreeDepth: -1, // 展开层级
        edgeShape: 'polyline',
        label: {
          show: true,
          position: 'inside',
          rotate: 90,
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
        name: item.name.split('').join('\n'),
        formatName: item.name,
        parent,
        itemStyle: {
          // color: item.star ? '#f56949' : '#3496eb'
          color
        },
        children: setAncestors(
          item.children,
          item
          // Object.assign({}, item, {
          //   formatName: item.name,
          //   parent
          // })
        )
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
