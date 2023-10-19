export default {
  color: ["#1C63FF", '#FFC354', '#00A8FF'],
  dataset: {
    dimentsions: ['date', "流入", "流出", "当前资产"],
    source: [
      { date: '7-10', "流入": 1000, "流出": 10000, "当前资产": 5000 },
      { date: '7-11', "流入": 1000, "流出": 10000, "当前资产": 5000 },
      { date: '7-12', "流入": 1000, "流出": 10000, "当前资产": 5000 },
      { date: '7-13', "流入": 1000, "流出": 10000, "当前资产": 5000 },
      { date: '7-14', "流入": 1000, "流出": 10000, "当前资产": 5000 },
      { date: '7-15', "流入": 1000, "流出": 10000, "当前资产": 5000 },
      { date: '7-16', "流入": 1000, "流出": 10000, "当前资产": 5000 },
      { date: '7-17', "流入": 1000, "流出": 10000, "当前资产": 5000 },
    ]
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
        barBorderRadius: [3, 3, 0, 0]
      }
    },
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0]
      }
    },
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0]
      }
    }
  ]
}