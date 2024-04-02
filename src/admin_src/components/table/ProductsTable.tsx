import { Column } from "react-table";
import TableHOC from "./Table";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const env = import.meta.env;

interface DataType {
  _id?: number;
  image: string;
  productName: string;
  productPrice: string;
  manage?: string;
  type: string;
  stock: number;
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
          src={value}
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
      >
        <CiSettings />
      </Link>
    ),
  },
];

const filteredColumns: Column<DataType>[] = columns.filter(
  (column) => column.accessor !== "type"
);

function Cargo() {
  const [resdata, setresData] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(env.VITE_BASE_URL + "admin/get/cargos")
      .then((res) => res.json())
      .then((d) => {
        if (d) {
          let arryData: DataType[] = d.map((item: DataType) => {
            return { ...item, image: item.image[0] };
          });
          setresData(arryData);
        } else {
          setresData([]);
        }
      })
      .catch((e) => console.log(e));
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
    fetch(env.VITE_BASE_URL + "admin/get/sweatpants")
      .then((res) => res.json())
      .then((d) => {
        if (d) {
          let data: DataType[] = d.map((item: DataType) => {
            return { ...item, image: item.image[0] };
          });
          setresData(data);
        }
      })
      .catch((e) => console.log(e));
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
    fetch(env.VITE_BASE_URL + "admin/get/shirts")
      .then((res) => res.json())
      .then((d) => {
        if (d) {
          let data: DataType[] = d.map((item: DataType) => {
            return { ...item, image: item.image[0] };
          });
          setresData(data);
        }
      })
      .catch((e) => console.log(e));
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
    fetch(env.VITE_BASE_URL + "admin/get/tshirts")
      .then((res) => res.json())
      .then((d) => {
        if (d) {
          let data: DataType[] = d.map((item: DataType) => {
            return { ...item, image: item.image[0] };
          });
          setresData(data);
        }
      })
      .catch((e) => console.log(e));
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
    fetch(env.VITE_BASE_URL + "admin/get/hoodies")
      .then((res) => res.json())
      .then((d) => {
        if (d) {
          let data: DataType[] = d.map((item: DataType) => {
            return { ...item, image: item.image[0] };
          });
          setresData(data);
        }
      })
      .catch((e) => console.log(e));
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
