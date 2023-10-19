import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);
type LinePropsType = {
  option: {};
  className?: "";
  style?: {};
};
const Line = (props: LinePropsType) => {
  let { option, className, style } = props;
  let echartViews = useRef<any>();
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
    echarts.init(echartViews.current).dispose();
    echartViews.current.addEventListener("resize", resize);
    initChart();
    return () => echartViews.current.removeEventListener("resize", resize);
  }, []);
  return <div ref={echartViews} className={className} style={style}></div>;
};
export default Line;
