import { useRoutes } from "react-router-dom";
import RouteList from "./config";
import { Guard } from "./guard";

function RouterConfigComp() {
  let el = useRoutes(RouteList)
  return Guard(el);
}
export default RouterConfigComp;
