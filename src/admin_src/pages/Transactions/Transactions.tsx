import "./transactions.scss";

import transaction from "../../../assets/admin/transactiondata.json";
import TableHOC from "../../components/table/Table";
import { Column } from "react-table";

interface DataType {
  id: string;
  customer: string;
  product: string;
  amount: string;
  date: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Transaction ID",
    accessor: "id",
  },
  {
    Header: "Customer",
    accessor: "customer",
  },
  {
    Header: "Product",
    accessor: "product",
  },
  { Header: "Date", accessor: "date" },
  {
    Header: "Amount",
    accessor: "amount",
  },
];

function Transactions() {
  return (
    <div className="transactions">
      {TableHOC(
        columns,
        transaction.transactions,
        "transaction",
        "Transactions",
        true
      )()}
    </div>
  );
}

export default Transactions;
