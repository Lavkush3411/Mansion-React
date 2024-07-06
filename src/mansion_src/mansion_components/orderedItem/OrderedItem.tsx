import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import "./ordereditem.scss";
import { NavLink } from "react-router-dom";

interface productType {
  productId: string;
  productName: string;
  productPrice: number;
  size: string;
  qty: number;
  image: string;
}

interface orderType {
  _id: string;
  userId: string;
  products: productType[];
  totalAmount: number;
  orderStatus: string;
  updatedAt: string;
}

function OrderedItem({ orderItem }: { orderItem: orderType }) {
  const orders = orderItem.products;
  const firstProduct = orders[0].productName;
  const totalProducts = orders.length;

  return (
    <div className="order-item-wrapper">
      <Accordion m={"1% 5%"} defaultIndex={[1]} allowMultiple>
        <AccordionItem border={"none"} m={" auto"}>
          <h2>
            <AccordionButton
              _expanded={{
                bg: "rgba(159, 157, 157, 0.521)",
                color: "black",
                m: "auto ",
              }}
            >
              <Box
                as="span"
                display={"flex"}
                justifyContent={"space-between"}
                flex="1"
                textAlign="left"
              >
                <h2>
                  {firstProduct +
                    (totalProducts - 1 > 0
                      ? ` and ${totalProducts - 1} more `
                      : " ")}
                </h2>
                <div className="status">
                  Payment Status : {orderItem.orderStatus}
                </div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {orders.map((item) => (
            <AccordionPanel pb={4}>
              <div className="order-item">
                <img className="image" src={`${item.image}`} alt="" />

                <section className="details">
                  <NavLink to={`/product/${item.productId}`} className="name">
                    {item.productName.toLocaleUpperCase()}
                  </NavLink>
                  <div className="quantity">QTY : {item.qty}</div>
                </section>

                <div className="price-size">
                  <div className="status">{orderItem.orderStatus}</div>
                  <div className="price">₹{item.productPrice}</div>
                  <div className="size">SIZE : {item.size}</div>
                </div>
              </div>
            </AccordionPanel>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default OrderedItem;
