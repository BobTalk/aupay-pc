import * as echarts from "echarts/core";
// import { ScatterChart } from 'echarts/charts';
// import ChartCore, { use } from 'react-echarts-core';
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
// use([ScatterChart]);
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
    window.addEventListener("resize", resize);
    initChart();
    return () => window.removeEventListener("resize", resize);
  }, []);
  return <div ref={echartViews} className={className} style={style}></div>;
};
export default Line;
