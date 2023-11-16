export default {
  color: ["#1C63FF", '#FFC354', '#00A8FF'],
  dataset: {
    dimentsions: ['date', "流入", "流出", "当前资产"],
    source: []
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false,

    }
  },
  yAxis: {
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  legend: {
    bottom: 0,
    left: 'center',
    icon: 'rect',
    itemHeight: 12,
    itemWidth: 12
  },
  grid: {
    top: 28,
    bottom: 50,
    left:0,
    right:0,
    containLabel: true
  },
  series: [
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        borderRadius: [3, 3, 0, 0]
      }
    },
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        borderRadius: [3, 3, 0, 0]
      }
    },
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        borderRadius: [3, 3, 0, 0]
      }
    }
  ]
}