/*
 * @Author: shenxh
 * @Date: 2021-08-31 09:46:10
 * @LastEditors: shenxh
 * @LastEditTime: 2022-04-30 22:09:19
 * @Description: 树形图
 */
import * as echarts from '../../ec-canvas/echarts';
import ancestors from '../../assets/data/ancestors-tree';

let peopleNumList = [];
let peopleQua = 0;

getQua([ancestors]);
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  });
  canvas.setChart(chart);

  const option = {
    title: {
      text: '总计: ' + peopleQua + ' 人',
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
      right: '5%',
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
      data: ['数量(人)', '增长率(%)'],
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: [
      {
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
        data: peopleNumList.map(item => {
          return item.name;
        }),
      },
    ],
    yAxis: [
      {
        name: '数量(人)',
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
      {
        name: '增长率(%)',
        type: 'value',
        splitLine: {
          show: false,
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
        name: '数量(人)',
        type: 'bar',
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
            barBorderRadius: 100,
          },
        },
        data: peopleNumList,
      },
      {
        name: '增长率(%)',
        type: 'line',
        yAxisIndex: 1,
        // smooth: true, //是否平滑曲线显示
        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          normal: {
            color: '#f5804d', // 线条颜色
          },
          borderColor: '#f0f',
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
            color: '#f5804d',
          },
        },
        tooltip: {
          show: false,
        },
        areaStyle: {
          //区域填充样式
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#fccb05',
              },
              {
                offset: 1,
                color: '#fccb0500',
              },
            ]),
          },
        },
        data: peopleNumList.map(item => {
          return item.increase;
        }),
      },
    ],
  };

  chart.setOption(option);
  return chart;
}

function getQua(list) {
  if (list && list.length) {
    peopleQua += list.length;
    list.forEach(item => {
      if (!peopleNumList[item.class - 1]) {
        peopleNumList[item.class - 1] = {
          name: '',
          value: 0,
          increase: 0,
        };
      }
      peopleNumList[item.class - 1].name = item.generation;
      peopleNumList[item.class - 1].value++;
      if (item.class > 1) {
        peopleNumList[item.class - 1].increase = Number(
          (
            ((peopleNumList[item.class - 1].value - peopleNumList[item.class - 2].value) /
              peopleNumList[item.class - 2].value) *
            100
          ).toFixed(2),
        );
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

  // 返回按钮
  handleBack() {
    wx.switchTab({
      url: '/pages/home/home',
    });
  },
});
