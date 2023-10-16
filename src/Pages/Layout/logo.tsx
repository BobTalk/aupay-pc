import React from "react";
import logo from "@/assets/images/logo.svg";
import styleScope from "./logo.module.less";
import { mergeClassName } from "@/utils/base";
const LayoutLogo = () => {
  return (
    <div
      className={mergeClassName(
        styleScope["logo-box"],
        "flex items-end justify-center py-[.15rem]"
      )}
    >
      <img src={logo} className="w-[.35rem] aspect-square" alt="logo" />
      <p className={mergeClassName(styleScope["text"])}>auPay</p>
    </div>
  );
};

export default LayoutLogo;
