export default {
  color: ["#1C63FF", '#009864'],
  dataset: {
    dimentsions: ['date', "快捷支付数量", "快捷支付笔数"],
    source: [
      { date: '7-10', "快捷支付数量": 50, "快捷支付笔数": 10 },
      { date: '7-11', "快捷支付数量": 45, "快捷支付笔数": 23 },
      { date: '7-12', "快捷支付数量": 35, "快捷支付笔数": 31 },
      { date: '7-13', "快捷支付数量": 42, "快捷支付笔数": 40 },
      { date: '7-14', "快捷支付数量": 41, "快捷支付笔数": 22 },
      { date: '7-15', "快捷支付数量": 35, "快捷支付笔数": 48 },
      { date: '7-16', "快捷支付数量": 30, "快捷支付笔数": 51 },
      { date: '7-17', "快捷支付数量": 38, "快捷支付笔数": 78 },
    ]
  },
  tooltip: {
    show: true,
    trigger: 'axis'
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
    icon: 'circle',
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
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        width: 4
      }
    },
    {
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        width: 4
      }
    },

  ]
}