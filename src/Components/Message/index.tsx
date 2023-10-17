import { Alert } from "antd";
import { ReactNode, memo } from "react";
import styleScope from "./index.module.less";
import { mergeClassName } from "@/utils/base";
type PropsType = {
  message: string;
  showIcon: true;
  type?: "success" | "info" | "warning" | "error";
  description?: string;
  onClose?: Function;
  icon?: ReactNode;
  showCloseIcon?: boolean;
  action?: ReactNode;
  className?: string;
  style?: Object;
};
const Message = (props: PropsType) => {
  return (
    <Alert
      className={mergeClassName(styleScope['_alert-box'], `${props.className}`)}
      style={props.style}
      action={props.action}
      closable={props.showCloseIcon}
      icon={props.icon}
      showIcon={props.showIcon}
      message={props.message}
      type={props.type}
      onClose={(e) => props?.onClose(e)}
      description={props.description}
    />
  );
};
Message.defaultProps = {
  message: "",
  action: <></>,
  showIcon: true,
  type: "",
  description: "",
  onClose: (e: MouseEvent): void => {},
  showCloseIcon: true,
  icon: <></>,
  className: "",
  style: {},
};
export default memo(
  Message,
  (prv: any, next: any) => prv.message == next.message
);
