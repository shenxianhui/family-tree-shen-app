/*
 * @Author: shenxh
 * @Date: 2021-08-31 09:46:10
 * @LastEditors: shenxh
 * @LastEditTime: 2021-09-01 15:31:36
 * @Description: 散射图
 */
import * as echarts from '../../../../ec-canvas/echarts';
import ancestors from '../../../../data/ancestors';

// var colors = [
//   '#00ADD0',
//   '#FFA12F',
//   '#B62AFF',
//   '#604BFF',
//   '#6E35FF',
//   '#002AFF',
//   '#20C0F4',
//   '#95F300',
//   '#04FDB8',
//   '#AF5AFF'
// ];
var colors = [
  '#f34646',
  '#ef9629',
  '#efcd29',
  '#a3e422',
  '#24e6b0',
  '#24cbe6',
  '#2484e6',
  '#2457e6',
  '#5424e6',
  '#c824e6',
  '#da35be',
  '#da3572',
  '#da3553'
];

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  let obj = { ...ancestors };
  let ancestorsData = setSymbol([obj], 0);

  let option = {
    type: 'tree',
    backgroundColor: '#000',
    tooltip: {
      //提示框
      trigger: 'item',
      confine: true,
      triggerOn: 'mousemove',
      backgroundColor: 'rgba(1,70,86,1)',
      borderColor: 'rgba(0,246,255,1)',
      borderWidth: 0.5,
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      formatter: data => {
        return data.data.info || '';
      }
    },
    series: [
      {
        type: 'tree',
        hoverAnimation: true, //hover样式
        // data: getdata(),
        data: ancestorsData,
        left: '-300%',
        right: '-300%',
        top: '-300%',
        bottom: '-300%',
        rootLocation: {
          x: 'center',
          y: 'center'
        }, // 根节点位置  {x: 'center',y: 10}
        layout: 'radial',
        symbol: 'circle',
        symbolSize: 10,
        nodePadding: 20,
        expandAndCollapse: false,
        animationDurationUpdate: 750,
        initialTreeDepth: -1,
        roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
        focusNodeAdjacency: true,
        itemStyle: {
          borderWidth: 1
        },
        label: {
          //标签样式
          color: '#fff',
          fontSize: 14,
          fontFamily: 'SourceHanSansCN',
          position: 'inside',
          rotate: 0
        },
        lineStyle: {
          width: 1,
          curveness: 0.5
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

// index 标识第几层
function setSymbol(data, index = 0) {
  let arr = JSON.parse(JSON.stringify(data));

  arr = arr.map(item => {
    // 计算出颜色
    let color = colors[(item.class - 1) % 12];
    // 设置节点大小
    if (index === 0 || index === 1) {
      item.label = {
        position: 'inside'
        //   rotate: 0,
        //   borderRadius: "50%",
      };
    }
    // 设置label大小
    switch (index) {
      case 0:
        item.symbolSize = 100;
        break;
      case 1:
        item.symbolSize = 90;
        break;
      case 2:
        item.symbolSize = 80;
        break;
      case 3:
        item.symbolSize = 70;
        break;
      case 4:
        item.symbolSize = 60;
        break;
      case 5:
        item.symbolSize = 50;
        break;
      case 6:
        item.symbolSize = 40;
        break;
      case 7:
        item.symbolSize = 30;
        break;
      case 8:
        item.symbolSize = 20;
        break;
      default:
        item.symbolSize = 10;
    }
    // 设置线条颜色
    item.lineStyle = { color };

    // 存在子节点
    if (item.children) {
      item.itemStyle = {
        borderColor: color,
        color
      };
      item.children = setSymbol(item.children, index + 1);
    } else {
      item.itemStyle = {
        color: 'transparent',
        borderColor: color
      };
    }
    return item;
  });

  return arr;
}

Component({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
});
