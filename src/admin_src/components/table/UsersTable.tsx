import TableHOC from "./Table";
import { Column } from "react-table";
import { useEffect, useState } from "react";
import axios from "axios";
const env = import.meta.env;

interface DataType {
  _id: string | number;
  name: string;
  email?: string;
  contact: string;
}

const columns: Column<DataType>[] = [
  { Header: "ID", accessor: "_id" },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Contact", accessor: "contact" },
];

function UsersTable() {
  const [users, setUsers] = useState<DataType[] | []>([]);
  useEffect(() => {
    axios
      .get(env.VITE_BASE_URL + "admin/users", { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  return TableHOC<DataType>(columns, users, "users-table", "Users", true)();
}

export default UsersTable;
