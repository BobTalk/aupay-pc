import React from "react";
import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
type IconProps = {
  name: string;
  className?: string;
  style?: StyleSheet;
  size?: "small" | "middle" | "large";
};
const Icon = (props) => {
  let { name, className, style, size } = props;
  return (
    <i
      className={mergeClassName(
        "iconfont",
        `${styleScope["font-box"]} ${styleScope[size]} ${name} ${className} `
      )}
      style={style}
    ></i>
    // <IComp
    //   className={mergeClassName(
    //     "iconfont",
    //     `${styleScope["font-box"]} ${name} ${className} ${styleScope[size]}`
    //   )}
    //   style={style}
    // >
    //   <svg aria-hidden="true" width="100%" height="100%">
    //     <use xlinkHref={"#" + name} />
    //   </svg>
    // </IComp>
  );
};
Icon.defaultProps = {
  name: "",
  className: "",
  style: {},
  size: "small",
};
export default Icon;
