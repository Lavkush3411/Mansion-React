import TableHOC from "./Table";
import { Column } from "react-table";
import data from "../../../assets/admin/data.json";

interface DataType {
  id: string | number;
  first_name: string;
  last_name: string;
  email?: string;
  contact: string;
}

const columns: Column<DataType>[] = [
  { Header: "ID", accessor: "id" },
  { Header: "First Name", accessor: "first_name" },
  { Header: "Last Name", accessor: "last_name" },
  { Header: "Email", accessor: "email" },
  { Header: "Contact", accessor: "contact" },
];

function UsersTable() {
  return TableHOC<DataType>(
    columns,
    data.Users,
    "users-table",
    "Users",
    true
  )();
}

export default UsersTable;
