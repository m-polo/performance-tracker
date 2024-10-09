import ReactLoading from "react-loading";
import { css } from "../../../styled-system/css";

export default function Loading() {
  return (
    <div
      className={css({
        w: "100%",
        h: "100%",
        alignContent: "center",
        textAlign: "center",
      })}
    >
      <ReactLoading
        type={"spin"}
        color={"gray"}
        height={"20%"}
        width={"20%"}
        className={css({
          display: "inline-block",
        })}
      />
    </div>
  );
}
