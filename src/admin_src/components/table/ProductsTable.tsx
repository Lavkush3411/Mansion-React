import { Column } from "react-table";
import TableHOC from "./Table";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const env = import.meta.env;

interface Stock {
  id: string;
  quantity: number;
  size: string;
}

interface DataType {
  _id: string;
  image: string[];
  productName: string;
  productPrice: string;
  manage?: string;
  type: string;
  stock: Stock[];
}

const columns: Column<DataType>[] = [
  { Header: "Type", accessor: "type" },
  {
    Header: "Sr. No.",
    accessor: "_id",
    Cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ value }) =>
      value ? (
        <img
          src={value[0]}
          alt="Product Image"
          style={{ width: 20, height: 20 }}
        />
      ) : null,
  },
  { Header: "Name", accessor: "productName" },
  { Header: "Price", accessor: "productPrice" },
  {
    Header: "Manage",
    accessor: "manage",
    Cell: ({ row }) => (
      <Link
        to={`/admin/products/manage/${row.original.type}_${row.original._id}`}
        state={{
          name: row.original.productName,
          type: row.original.type,
          image: row.original.image,
          stock: row.original.stock,
          _id: row.original._id,
          price: row.original.productPrice,
        }}
      >
        <CiSettings />
      </Link>
    ),
  },
];

const filteredColumns: Column<DataType>[] = columns.filter(
  (column) => column.accessor !== "type"
);

async function fetchData(item: string) {
  const token = localStorage.getItem("Token");
  if (!token) return [];
  try {
    const res = await axios.post(env.VITE_BASE_URL + "admin/post/" + item, {
      Token: token,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function Cargo() {
  const [resdata, setresData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData("cargo")
      .then((data: DataType[]) => {
        setresData(data);
      })
      .catch(() => setresData([]));
  }, []);

  return (
    <div className="cargos">
      {TableHOC<DataType>(filteredColumns, resdata, "cargos", "Cargos", true)()}
    </div>
  );
}

function Sweatpant() {
  const [resdata, setresData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData("sweatpant")
      .then((data: DataType[]) => {
        setresData(data);
      })
      .catch(() => setresData([]));
  }, []);

  return (
    <div className="sweatpants">
      {TableHOC<DataType>(
        filteredColumns,
        resdata,
        "sweatpants",
        "SweatPants",
        true
      )()}
    </div>
  );
}

function Shirts() {
  const [resdata, setresData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData("shirt")
      .then((data: DataType[]) => {
        setresData(data);
      })
      .catch(() => setresData([]));
  }, []);
  return (
    <div className="shirts">
      {TableHOC<DataType>(filteredColumns, resdata, "shirts", "Shirts", true)()}
    </div>
  );
}

function Tshirts() {
  const [resdata, setresData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData("tshirt")
      .then((data: DataType[]) => {
        setresData(data);
      })
      .catch(() => setresData([]));
  }, []);
  return (
    <div className="tshirts">
      {TableHOC<DataType>(
        filteredColumns,
        resdata,
        "tshirts",
        "TShirts",
        true
      )()}
    </div>
  );
}

function Hoodie() {
  const [resdata, setresData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData("hoodie")
      .then((data: DataType[]) => {
        setresData(data);
      })
      .catch(() => setresData([]));
  }, []);
  return (
    <div className="hoodies">
      {TableHOC<DataType>(
        filteredColumns,
        resdata,
        "hoodies",
        "Hoodies",
        true
      )()}
    </div>
  );
}

export { Cargo, Sweatpant, Shirts, Tshirts, Hoodie };
