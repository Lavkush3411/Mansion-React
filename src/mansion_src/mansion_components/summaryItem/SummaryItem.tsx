import "./summaryitem.scss"

function SummaryItem() {
  return (
    <div className="cart-item">
      <img className="image" src={`${cartItem.image[0]}`} alt="" />
      <section className="details">
        <div className="name">{cartItem.productName.toLocaleUpperCase()}</div>
      </section>
      <div className="price-size">
        <div className="price">₹{cartItem.productPrice}</div>
        <div className="size">SIZE : {cartItem.size}</div>
      </div>
    </div>
  )
}

export default SummaryItem