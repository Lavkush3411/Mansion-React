import "./button.scss";

function Button({
  onClick,
  type = "button",
  children,
  bgCol = "",
  col = "",
  className = "",
  disabledState = false,
}: {
  onClick?: any;
  type?: "button" | "submit";
  children?: any;
  col?: string;
  bgCol?: string;
  className?: string;
  disabledState?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ backgroundColor: bgCol, color: col }}
      className={`button ${className}`}
      disabled={disabledState}
    >
      {children}
    </button>
  );
}

export default Button;
