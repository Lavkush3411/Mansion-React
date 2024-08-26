import { NavLink, useParams } from "react-router-dom";
import "./singleorder.scss";
import { Accordion, AccordionItem, Spinner } from "@chakra-ui/react";
import {
  Box,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  Stepper,
  Text,
} from "@chakra-ui/react";
import Button from "../../../mansion_src/mansion_components/button/Button";
import { steps } from "../../../mansion_src/mansion_components/horizontalSteper/HorizontalStepper";
import { OrderType } from "../../../redux/transactionListState";
import axios from "axios";
import { useEffect, useState } from "react";
const env = import.meta.env;
function SingleOrder() {
  const { orderId } = useParams();
  const [orderItem, setOrderItem] = useState<OrderType | null>();
  const [disableButtons, setDisabledButtons] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [reverSpinner, setreverseSpinner] = useState(false);
  const [processSpinner, setProcessSpinner] = useState(false);

  useEffect(() => {
    axios
      .get(env.VITE_BASE_URL + "admin/order/by-id/" + orderId, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setOrderItem(data);
        setreverseSpinner(false);
        setProcessSpinner(false);
      });
  }, [refetch]);
  if (!orderItem) return null;
  const orders = orderItem.products;

  async function process(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!orderItem) return;
    const currentOrderStatus = orderItem.orderStatus;
    const currentIndex = steps.indexOf(currentOrderStatus);
    if (currentIndex >= steps.length - 1) return;
    setDisabledButtons(true);
    setProcessSpinner(true);
    await axios.patch(
      env.VITE_BASE_URL + "admin/update-order-status",
      {
        status: steps[currentIndex + 1],
        id: orderItem._id,
      },
      { withCredentials: true }
    );
    setRefetch((prev) => !prev);
    setDisabledButtons(false);
  }

  async function reverse(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!orderItem) return;
    const currentOrderStatus = orderItem.orderStatus; //finding current status
    const currentIndex = steps.indexOf(currentOrderStatus); // finding index of current status
    if (currentIndex <= 0) return; // if already at start returning at 0
    setDisabledButtons(true);
    setreverseSpinner(true);
    await axios.patch(
      env.VITE_BASE_URL + "admin/update-order-status",
      {
        status: steps[currentIndex - 1],
        id: orderItem._id,
      },
      { withCredentials: true }
    );
    setRefetch((prev) => !prev); // so that useEffect runs again
    setDisabledButtons(false);
  }

  return (
    <div className="single-order">
      <Accordion m={"1% 5%"} allowMultiple>
        <AccordionItem border={"none"} m={" auto"} key={orderItem._id}>
          {orders.map((item: any) => (
            <div key={item.productId}>
              <div className="single-order-item">
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
            </div>
          ))}
        </AccordionItem>
      </Accordion>
      <h2 className="payment-status">
        Payment Status : {orderItem.paymentStatus}
      </h2>
      <HorizontalStepper state={steps.indexOf(orderItem.orderStatus) + 1} />

      <div className="processing-btns">
        <Button
          disabledState={disableButtons}
          bgCol="black"
          col="white"
          onClick={reverse}
        >
          {reverSpinner ? <Spinner size={"sm"} /> : "Reverse"}
        </Button>
        <Button disabledState={disableButtons} onClick={process}>
          {processSpinner ? <Spinner size={"sm"} /> : "Process"}
        </Button>
      </div>
    </div>
  );
}

function HorizontalStepper({ state }: { state: number }) {
  return (
    <Stack>
      <Stepper size="md" index={state} colorScheme="gray" gap="0">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator borderColor={"gray"}>
              <StepStatus complete={<StepIcon borderColor={"gray"} />} />
            </StepIndicator>
            <Text color={"black"} fontWeight={"600"} fontSize={"x-small"}>
              {step}
            </Text>
            <Box width={"100%"} borderBottom={"1px solid gray"}></Box>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

export default SingleOrder;
