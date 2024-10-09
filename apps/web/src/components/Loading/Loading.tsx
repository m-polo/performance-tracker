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
        type={"spinningBubbles"}
        color={"gray"}
        height={"60%"}
        width={"60%"}
        className={css({
          display: "inline-block",
        })}
      />
    </div>
  );
}
