import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import { ReactNode } from "react";
import styleComp from "styled-components";
interface CardType {
  className?: string;
  style?: Object;
  bgImg?: string;
  children?: ReactNode;
  bgColor?: string;
}
const CardComp = styleComp.div`
  background-image:url(${(props: CardType) => props["bg-img"]});
  background-color: ${(props: CardType) => ColorFormat(props["bg-color"])};
`;
function ColorFormat(color: string) {
  if (!color) return "";
  if (color.startsWith("rgba")) return color;
  if (color.startsWith("rgb")) {
    return `rgba(${(color.slice(4, -1), 0.5)})`;
  }
  return hexToRgba(color, 0.5);
}
function hexToRgba(hex, opacity) {
  return (
    "rgba(" +
    parseInt("0x" + hex.slice(1, 3)) +
    "," +
    parseInt("0x" + hex.slice(3, 5)) +
    "," +
    parseInt("0x" + hex.slice(5, 7)) +
    "," +
    opacity +
    ")"
  );
}
const Card = (props: CardType): ReactNode => {
  return (
    <CardComp
      bg-img={props.bgImg}
      bg-color={props.bgColor}
      className={mergeClassName(styleScope["_card-box"], `${props.className}`)}
      style={props.style}
    >
      {props.children}
    </CardComp>
  );
};
Card.defaultProps = {
  className: "",
  style: {},
  bgImg: "",
  children: <></>,
  bgColor: "",
};
export default Card;
