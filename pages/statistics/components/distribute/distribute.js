/*
 * @Author: shenxh
 * @Date: 2021-09-01 09:04:30
 * @LastEditors: shenxh
 * @LastEditTime: 2021-09-02 11:01:10
 * @Description: 人员分布统计
 */
import * as echarts from '../../../../ec-canvas/echarts';
import ancestors from '../../../../data/ancestors';

const _ancestors = JSON.parse(JSON.stringify(ancestors));
let boy = 0;
let girl = 0;

getNum([_ancestors]);
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ['#50ccfb', '#fb7f50'],
    tooltip: {
      trigger: 'item'
    },

    series: [
      {
        name: '总数',
        type: 'pie',
        radius: [0, '40%'],
        center: ['50%', '30%'],
        itemStyle: {
          color: '#ffe45f'
        },
        label: {
          normal: {
            show: true,
            color: '#fff',
            position: 'center',
            fontSize: '20px Microsoft YaHei'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{ value: 1232, name: '总数' }]
      },
      {
        name: '性别占比',
        type: 'pie',
        center: ['50%', '30%'],
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 4
          }
        },
        label: {
          fontSize: '16px Microsoft YaHei'
        },
        labelLine: {
          show: true
        },
        data: [
          { value: boy, name: '男' },
          { value: girl, name: '女' }
        ]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

function getNum(list) {
  if (list && list.length) {
    list.forEach(item => {
      if (item.sex == 2) {
        girl++;
      } else {
        boy++;
      }

      getNum(item.children);
    });
  }
}

Component({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
});
