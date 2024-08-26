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
import { DataType } from "../../../redux/transactionListState";

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
  value: DataType;
  children: string;
}) {
  return (
    <Link
      to={"/admin/orders/" + value._id}
      state={value}
      target="_blank"
      style={{ color: "gray", fontWeight: "bold", textDecoration: "underline" }}
    >
      {children}
    </Link>
  );
}

const columns: Column<DataType>[] = [
  {
    Header: "Transaction ID",
    accessor: "_id",
  },
  {
    Header: "Customer",
    accessor: "userId",
  },
  {
    Header: "Product",
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

      return (
        <div
          onClick={async () => {
            if (
              row.original.paymentStatus === PaymentStatus.Pending ||
              row.original.paymentStatus === PaymentStatus.Success
            )
              return;
            setIsDeleting(true);
            await deleteOrder(value);
            const data = await getTransactionsData();
            dispatch(updateTransactionsData(data));

            setIsDeleting(false);
          }}
        >
          {isDeleting ? <Spinner /> : <DeleteIcon cursor={"pointer"} />}
        </div>
      );
    },
  },
];

function Transactions() {
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

export default Transactions;
