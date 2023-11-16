export default {
  color: ["#1C63FF", '#00A8FF'],
  dataset: {
    dimentsions: ['date', "趋势"],
    source: []
  },
  xAxis: {
    type: 'category',
    data:[],
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
      data:[],
      type: 'bar',
      silent: true,
      barWidth: 24,
      itemStyle: {
        borderRadius: 6
      }
    },
  ]
}