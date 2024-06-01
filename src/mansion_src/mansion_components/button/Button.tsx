import "./button.scss";

function Button({
  onClick,
  type = "button",
  children,
}: {
  onClick: any;
  type: "button" | "submit";
  children: any;
}) {
  return (
    <button type={type} onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default Button;
