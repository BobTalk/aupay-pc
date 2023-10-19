export default {
  color: ["#1C63FF", '#FFC354', '#00A8FF'],
  dataset: {
    dimentsions: ['date', "流入", "流出"],
    source: [
      { date: '7-10', "流入": 99, "流出": '-' },
      { date: '7-11', "流入": '-', "流出": -25 },
      { date: '7-12', "流入": '-', "流出": -50 },
      { date: '7-13', "流入": 45, "流出": '-' },
      { date: '7-14', "流入": 75, "流出": '-' },
      { date: '7-15', "流入": '-', "流出": -87 },
      { date: '7-16', "流入": 89, "流出": '-' },
      { date: '7-17', "流入": '-', "流出": -68 },
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
    show: false,
    bottom: 0,
    left: 'center',
    icon: 'rect',
    itemHeight: 12,
    itemWidth: 12
  },
  grid: {
    top: 28,
    bottom: 50,
    left: 0,
    right: 0,
    containLabel: true
  },
  series: [
    {
      stack: 'Total',
      type: 'bar',
      silent: true,
      barWidth: 24,
      itemStyle: {
        barBorderRadius: 6
      }
    },
    {
      stack: 'Total',
      type: 'bar',
      barWidth: 24,
      itemStyle: {
        barBorderRadius: 6
      }
    },
  ]
}