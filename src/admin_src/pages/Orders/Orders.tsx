import "./transactions.scss";
import TableHOC from "../../components/table/Table";
import { Column } from "react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  PaymentStatus,
  updateTransactionsData,
} from "../../../redux/transactionListState";
import { OrderType } from "../../../redux/transactionListState";

const env = import.meta.env;

const deleteOrder = async (id: string) => {
  await axios.delete(env.VITE_BASE_URL + "admin/order/" + id, {
    data: { id: id },
    withCredentials: true,
  });
  return;
};

function getTransactionsData() {
  const data = axios
    .get(env.VITE_BASE_URL + "admin/orders", { withCredentials: true })
    .then((res) => {
      return res.data;
    });

  return data;
}

function OrderComponent({
  value,
  children,
}: {
  value: OrderType;
  children: string;
}) {
  return (
    <Link
      to={"/admin/orders/" + value._id}
      state={value}
      style={{ color: "gray", fontWeight: "bold", textDecoration: "underline" }}
    >
      {children}
    </Link>
  );
}

const columns: Column<OrderType>[] = [
  {
    Header: "Transaction ID",
    accessor: "_id",
  },
  {
    Header: "Customer",
    accessor: "userId",
  },
  {
    Header: "Products",
    accessor: "products",
    Cell: ({ row }) => {
      return <OrderComponent value={row.original}>goTo</OrderComponent>;
    },
  },
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return value.split(" ")[0];
    },
  },
  {
    Header: "Amount",
    accessor: "totalAmount",
    Cell: ({ value }) => "₹" + value,
  },
  {
    Header: "Order Status",
    accessor: "orderStatus",
  },
  {
    Header: "Payment Status",
    accessor: "paymentStatus",
    Cell: ({ value }) => {
      console.log(value);
      return value;
    },
  },
  {
    Header: "Delete",
    accessor: "_id",
    id: "Delete",
    Cell: ({ value, row }) => {
      const [isDeleting, setIsDeleting] = useState<boolean>(false);
      const dispatch = useDispatch();
      const shouldBeDisabled =
        row.original.paymentStatus === PaymentStatus.Pending ||
        row.original.paymentStatus === PaymentStatus.Success;
      return (
        <div
          onClick={async () => {
            if (shouldBeDisabled) return;
            setIsDeleting(true);
            await deleteOrder(value);
            const data = await getTransactionsData();
            dispatch(updateTransactionsData(data));

            setIsDeleting(false);
          }}
        >
          {isDeleting ? (
            <Spinner />
          ) : (
            <DeleteIcon
              className={`${shouldBeDisabled ? "disabled-btn" : ""}`}
              color="disabled"
              cursor={"pointer"}
            />
          )}
        </div>
      );
    },
  },
];

function Orders() {
  const transactions = useSelector((state: RootState) => state.transaction);
  const dispatch = useDispatch();
  useEffect(() => {
    getTransactionsData().then((data) => {
      dispatch(updateTransactionsData(data));
    });
  }, []);
  return (
    <div className="transactions">
      {TableHOC(columns, transactions, "transaction", "Transactions", true)()}
    </div>
  );
}

export default Orders;
