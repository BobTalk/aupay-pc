import React from "react";
import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import styleComp from "styled-components";
type IconProps = {
  name: string;
  className?: string;
  style?: StyleSheet;
  size?: "small" | "middle" | "large";
};
const IComp = styleComp.i`
  width: ${(props) => props?.style?.fontSize ?? "16px"};
  color: ${(props) => props?.style?.color ?? "currentColor !important"};
`;
const Icon = (props) => {
  let { name, className, style, size } = props;
  return (
    <IComp
      className={mergeClassName(
        "iconfont",
        `${name} ${className} ${styleScope[size]} ${styleScope["font-box"]}`
      )}
      style={style}
    >
      <svg aria-hidden="true" width="100%" height="100%">
        <use xlinkHref={"#" + name} />
      </svg>
    </IComp>
  );
};
Icon.defaultProps = {
  name: "",
  className: "",
  style: {},
  size: "small",
};
export default Icon;
