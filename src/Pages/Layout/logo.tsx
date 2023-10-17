import React from "react";
import logo from "@/assets/images/logo.svg";
import styleScope from "./logo.module.less";
import { mergeClassName } from "@/utils/base";
const LayoutLogo = ({ collapsed }:any) => {
  return (
    <div
      className={mergeClassName(
        styleScope["logo-box"],
        "flex items-end justify-center py-[.15rem]"
      )}
    >
      <img src={logo} className="w-[.35rem] aspect-square" alt="logo" />
      {!collapsed ? (
        <p className={mergeClassName(styleScope["text"])}>auPay</p>
      ) : null}
    </div>
  );
};

export default LayoutLogo;
