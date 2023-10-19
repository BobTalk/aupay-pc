import ReactECharts from 'echarts-for-react';
import CommonChart from '../common';
type BarPropsType = {
  option: {};
  className?: "";
  style?: {};
};
const Bar = (props: BarPropsType) => {
  let { option, className, style } = props;
  function onChartReadyCallback(chart) {
    setTimeout(() => {
      chart.resize()
    }, 100)
  }
  return <div className={className} style={style}>
    <CommonChart option={option} />
  </div>;
};
Bar.defaultProps = {
  option: {},
};
export default Bar;
