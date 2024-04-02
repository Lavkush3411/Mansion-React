import "./productcomponent.scss";

interface ProductProps {
  name: string;
  percent: number;
}

function ProductComponent({ name, percent }: ProductProps) {
  return (
    <div className="productcomponent">
      <p>{name}</p>
      <div className="outer-layer">
        <div
          className="inner-layer"
          style={{
            width: `${percent * 0.1}rem`,
            backgroundColor: `hsl(${percent},100%,${percent}%)`,
          }}
        ></div>
      </div>
      <h4>{percent}%</h4>
    </div>
  );
}

export default ProductComponent;
