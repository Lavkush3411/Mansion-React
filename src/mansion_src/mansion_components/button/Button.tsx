import "./button.scss";

function Button({
  onClick,
  type = "button",
  children,
  bgCol = "",
  className = "",
  disabledState = false,
}: {
  onClick?: any;
  type?: "button" | "submit";
  children?: any;
  bgCol?: string;
  className?: string;
  disabledState?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ backgroundColor: bgCol }}
      className={`button ${className}`}
      disabled={disabledState}
    >
      {children}
    </button>
  );
}

export default Button;
