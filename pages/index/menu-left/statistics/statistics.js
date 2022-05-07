/*
 * @Author: shenxh
 * @Date: 2021-08-31 09:46:10
 * @LastEditors: shenxh
 * @LastEditTime: 2022-05-07 09:31:49
 * @Description: 柱状统计图
 */
import * as echarts from '../../../../ec-canvas/echarts';
import ancestors from '../../../../assets/data/ancestors-tree';
import { formatTreeData } from '../../../../utils/util';

let chartData = {
  total: 0,
  manList: [],
  womanList: [],
};

getQua(formatTreeData([ancestors]));
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  });
  canvas.setChart(chart);

  const option = {
    title: {
      text: '总计: ' + chartData.total + ' 人',
      textStyle: {
        color: '#fff',
        fontSize: 20,
      },
      bottom: '8%',
      right: '6%',
    },
    // backgroundColor: '#323a5e',
    grid: {
      top: '20%',
      left: '5%',
      right: '15%',
      bottom: '15%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      top: '10%',
      data: ['男', '女'],
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: [
      {
        name: '代数',
        type: 'category',
        boundaryGap: true,
        axisLine: {
          // 坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#fff',
          },
        },
        nameTextStyle: {
          color: '#fff',
        },
        axisLabel: {
          // 坐标轴刻度标签的相关设置
          textStyle: {
            color: '#d1e6eb',
            margin: 15,
          },
        },
        axisTick: {
          show: false,
        },
        data: chartData.manList.map(item => {
          return item.name;
        }),
      },
    ],
    yAxis: [
      {
        name: '数量',
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#848be233',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#848be233',
          },
        },
        nameTextStyle: {
          color: '#fff',
        },
        axisLabel: {
          // margin: 20,
          textStyle: {
            color: '#d1e6eb',
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '男',
        type: 'bar',
        stack: 'total',
        // barWidth: 20,
        tooltip: {
          show: true,
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff',
          },
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#00feff',
              },
              {
                offset: 1,
                color: '#027eff',
              },
            ]),
            // barBorderRadius: 100,
          },
        },
        data: chartData.manList,
      },
      {
        name: '女',
        type: 'bar',
        stack: 'total',
        // barWidth: 20,
        tooltip: {
          show: true,
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff',
          },
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#ffcaca',
              },
              {
                offset: 1,
                color: '#ff7070',
              },
            ]),
            // barBorderRadius: 100,
          },
        },
        data: chartData.womanList,
      },
    ],
  };

  chart.setOption(option);
  return chart;
}

function getQua(list) {
  if (list && list.length) {
    list.forEach(item => {
      const level = item.level;

      chartData.total++;

      if (item.sex === 1) {
        if (!chartData.manList[level - 1]) {
          chartData.manList[level - 1] = {
            value: 0,
          };
        }
        chartData.manList[level - 1].value++;
        chartData.manList[level - 1].name = level + '世';
      } else {
        if (!chartData.womanList[level - 1]) {
          chartData.womanList[level - 1] = {
            value: 0,
          };
        }
        chartData.womanList[level - 1].value++;
        chartData.womanList[level - 1].name = level + '世';
      }

      getQua(item.children);
    });
  }
}

Page({
  data: {
    ec: {
      onInit: initChart,
    },
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
});
