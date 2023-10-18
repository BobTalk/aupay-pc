import { mergeClassName } from "@/utils/base";
import { ReactNode } from "react";

export type ImageType = {
  src: string;
  top?: ReactNode | null;
  children?: ReactNode | null;
  className?: string;
  style?: Object;
  imgClassName?: string;
  imgStyle?: Object;
};
const Image = (props: ImageType) => {
  return (
    <figure
      className={mergeClassName(
        "grid place-content-center",
        `${props.className}`
      )}
      style={props.style}
    >
      {props.top ? <figcaption>{props.top}</figcaption> : null}
      <img src={props.src} className={props.imgClassName} style={props.imgStyle} />
      {props.children ? <figcaption>{props.children}</figcaption> : null}
    </figure>
  );
};
Image.defaultProps = {
  src: "",
  top: null,
  children: null,
  className: "",
  style: {},
  imgClassName: "",
  imgStyle: {},
};
export default Image;
