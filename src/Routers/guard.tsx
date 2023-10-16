import { getSession } from "@/utils/base";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
export function Guard(element: any) {
  let { route } = element.props.match;
  let token = getSession("token");
  let location = useLocation();
  if (route.isAuth) {
    return token ? (
      element
    ) : (
      <Navigate replace to="login" state={{ from: location }} />
    );
  }
  return element;
}
