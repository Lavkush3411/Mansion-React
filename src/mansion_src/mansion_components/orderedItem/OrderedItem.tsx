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
import HorizontalStepper, {
  steps,
} from "../horizontalSteper/HorizontalStepper";
import { OrderType } from "../../../redux/transactionListState";

function OrderedItem({ orderItem }: { orderItem: OrderType }) {
  const orders = orderItem.products;
  const firstProduct = orders[0].productName;
  const totalProducts = orders.length;

  return (
    <div className="order-item-wrapper">
      <Accordion m={"1% 5%"} defaultIndex={[1]} allowMultiple>
        <AccordionItem border={"none"} m={" auto"} key={orderItem._id}>
          <h2>
            <AccordionButton
              _expanded={{
                bg: "rgba(159, 157, 157, 0.350)",
                color: "black",
                m: "auto ",
              }}
              bg={"rgba(159, 157, 157, 0.200)"}
              _hover={{
                bg: "rgba(159, 157, 157, 0.300)",
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
                  Payment Status : {orderItem.paymentStatus}
                </div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {orders.map((item) => (
            <AccordionPanel pb={4} key={item.productId}>
              <div className="order-item">
                <img className="image" src={`${item.image}`} alt="" />

                <section className="details">
                  <NavLink to={`/product/${item.productId}`} className="name">
                    {item.productName.toLocaleUpperCase()}
                  </NavLink>
                  <div className="quantity">QTY : {item.qty}</div>
                </section>

                <section className="stepper-wrapper">
                  <div className="stepper">
                    <HorizontalStepper
                      state={steps.indexOf(orderItem.orderStatus) + 1}
                    />
                  </div>
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
