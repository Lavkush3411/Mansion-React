import "./button.scss";

function Button({
  onClick,
  type = "button",
  children,
  bgCol = "",
}: {
  onClick?: any;
  type?: "button" | "submit";
  children?: any;
  bgCol?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ backgroundColor: bgCol }}
      className="button"
    >
      {children}
    </button>
  );
}

export default Button;
