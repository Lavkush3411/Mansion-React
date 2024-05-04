import "./loader.scss";

type Position = "static" | "relative" | "absolute" | "fixed";
function Loader({
  bgc = "transparent",
  pos = "static",
}: {
  bgc?: string;
  pos?: Position;
}) {
  return (
    <div
      className="loader"
      style={{
        backgroundColor: bgc,
        position: pos,
      }}
    >
      <div className="outer-circle">
        <div className="inner-circle"></div>
      </div>
    </div>
  );
}

export default Loader;
