import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import { ReactNode } from "react";
import logo from "@/assets/images/logo.svg";
import styleComp from "styled-components";
interface CardType {
  className?: string;
  style?: Object;
  bgImg?: string;
  children?: ReactNode;
}
const CardComp = styleComp.div`
  background-image:url(${(props: CardType) => props.bgImg})
`;
const Card = (props: CardType): ReactNode => {
  return (
    <CardComp
      {...props}
      className={mergeClassName(styleScope["_card-box"], `${props.className}`)}
      style={props.style}
    >
      {props.children}
    </CardComp>
  );
};
Card.defaultProps = {
  bgImg: logo,
};
export default Card;
