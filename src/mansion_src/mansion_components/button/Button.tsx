import "./button.scss";

function Button({
  onClick,
  type = "button",
  children,
  bgCol = "",
  className = "",
}: {
  onClick?: any;
  type?: "button" | "submit";
  children?: any;
  bgCol?: string;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ backgroundColor: bgCol }}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
