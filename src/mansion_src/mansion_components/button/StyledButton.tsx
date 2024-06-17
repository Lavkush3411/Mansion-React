import "./button.scss";

function StyledButton({
  children,
  bgCol = "",
}: {
  children: any;
  bgCol?: string;
}) {
  return (
    <button
      style={{ backgroundColor: bgCol, color: bgCol.length > 0 ? "white" : "" }}
      className="button"
    >
      {children}
    </button>
  );
}

export default StyledButton;
