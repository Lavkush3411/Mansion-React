import "./transactions.scss";
import TableHOC from "../../components/table/Table";
import { Column } from "react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const env = import.meta.env;

interface DataType {
  productId: string;
  image: string;
  productName: string;
  productPrice: string;
  type: string;
  qty: number;
  size: string;
}
interface DataType {
  _id: string;
  userId: string;
  products: string;
  totalAmount: string;
  createdAt: string;
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
];

function Transactions() {
  const [transactions, setTransactions] = useState<DataType[] | []>([]);
  useEffect(() => {
    axios
      .get(env.VITE_BASE_URL + "admin/orders", { withCredentials: true })
      .then((res) => {
        setTransactions(res.data);
      });
  }, []);
  return (
    <div className="transactions">
      {TableHOC(columns, transactions, "transaction", "Transactions", true)()}
    </div>
  );
}

export default Transactions;
