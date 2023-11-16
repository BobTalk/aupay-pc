import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
const Title = ({title}) => {
  return (
    <p
      className={mergeClassName(
        styleScope["title"],
        styleScope["blue-line"],
        "mb-[.24rem]"
      )}
    >
      {title}
    </p>
  );
};
export default Title;
