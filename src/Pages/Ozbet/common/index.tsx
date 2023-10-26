import Image from "@/Components/Image";
import { ReactNode } from "react";
type PropsType = {
  src: string;
  top?: ReactNode | null;
  bottom?: ReactNode | null;
  imgClassName?: string;
  className?: string;
  imgStyle?: Object;
  style?: Object;
  children?: Array<ReactNode> | ReactNode | null;
};
const CommonEl = (props: PropsType) => {
  return (
    <div className={props.className} style={props.style}>
      <Image
        src={props.src}
        top={props.top}
        bottom={props.bottom}
        className={props.imgClassName}
        style={props.imgStyle}
      />
      {props.children}
    </div>
  );
};
CommonEl.defaultProps = {
  src: "",
};
export default CommonEl;
