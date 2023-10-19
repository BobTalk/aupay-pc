import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);
type BarPropsType = {
  option: {};
  className?: "";
  style?: {};
};
const Bar = (props: BarPropsType) => {
  let { option, className, style } = props;
  let echartViews = useRef();
  function initChart() {
    if (echartViews.current && option) {
      let instance = echarts.init(echartViews.current);
      instance.setOption(option);
    }
  }
  function resize() {
    echarts.init(echartViews.current).resize();
  }
  useEffect(() => {
    echarts.init(echartViews.current).clear();
    initChart();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return <div ref={echartViews} className={className} style={style}></div>;
};
Bar.defaultProps = {
  option: {},
};
export default Bar;
