import { Column } from "react-table";
import TableHOC from "./Table";
import { CiSettings } from "react-icons/ci";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProductListContext } from "../../../ProductListContextProvider";
import { Spinner } from "@chakra-ui/react";

const env = import.meta.env;

interface Stock {
  _id: string;
  quantity: number;
  size: string;
}

interface DataType {
  _id: string;
  image: string[];
  productName: string;
  productPrice: string;
  manage?: string;
  delete?: string;
  type: string;
  stock: Stock[];
}

const deleteProduct = async (type: string, id: string) => {
  const token = localStorage.getItem("Token");
  if (!token) return;
  await axios.delete(env.VITE_BASE_URL + "admin/delete/" + type, {
    data: { id: id, Token: token },
  });
  return;
};

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
  {
    Header: "Delete",
    accessor: "delete",
    Cell: ({ row }) => {
      const { productListDispatch } = useContext(ProductListContext);
      const [isDeleting, setIsDeleting] = useState<boolean>(false);
      return (
        <div
          onClick={async () => {
            setIsDeleting(true);
            await deleteProduct(row.original.type, row.original._id);

            const data = await fetchData(row.original.type.slice(0, -1));
            setIsDeleting(false);
            productListDispatch({ type: row.original.type, payload: data });
          }}
        >
          {isDeleting ? <Spinner /> : <DeleteIcon />}
        </div>
      );
    },
  },
];

const filteredColumns: Column<DataType>[] = columns.filter(
  (column) => column.accessor !== "type"
);

async function fetchData(item: string) {
  const token = localStorage.getItem("Token");
  if (!token) return [];
  try {
    const res = await axios.get(env.VITE_BASE_URL + "admin/" + item, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function Cargo() {
  const {
    productListState: { cargos },
    productListDispatch,
  } = useContext(ProductListContext);

  useEffect(() => {
    fetchData("cargos")
      .then((data: DataType[]) => {
        productListDispatch({ type: "cargos", payload: data });
      })
      .catch(() => {
        console.log("error");
      });
  }, [productListDispatch]);

  return (
    <div className="cargos">
      {TableHOC<DataType>(filteredColumns, cargos, "cargos", "Cargos", true)()}
    </div>
  );
}

function Bottom() {
  const {
    productListState: { sweatpants },
    productListDispatch,
  } = useContext(ProductListContext);

  useEffect(() => {
    fetchData("bottoms")
      .then((data: DataType[]) => {
        productListDispatch({ type: "bottoms", payload: data });
      })
      .catch(() => {
        console.log("error");
      });
  }, [productListDispatch]);

  return (
    <div className="sweatpants">
      {TableHOC<DataType>(
        filteredColumns,
        sweatpants,
        "bottoms",
        "Bottoms",
        true
      )()}
    </div>
  );
}

function All() {
  const {
    productListState: { all },
    productListDispatch,
  } = useContext(ProductListContext);

  useEffect(() => {
    fetchData("all")
      .then((data: DataType[]) => {
        productListDispatch({ type: "all", payload: data });
      })
      .catch(() => {
        console.log("error");
      });
  }, [productListDispatch]);

  return (
    <div className="products-list-class">
      {TableHOC<DataType>(filteredColumns, all, "All", "All", true)()}
    </div>
  );
}

function Shirts() {
  const {
    productListState: { shirts },
    productListDispatch,
  } = useContext(ProductListContext);

  useEffect(() => {
    fetchData("shirts")
      .then((data: DataType[]) => {
        productListDispatch({ type: "shirts", payload: data });
      })
      .catch(() => {
        console.log("error");
      });
  }, [productListDispatch]);
  return (
    <div className="shirts">
      {TableHOC<DataType>(filteredColumns, shirts, "shirts", "Shirts", true)()}
    </div>
  );
}

function Tshirts() {
  const {
    productListState: { tshirts },
    productListDispatch,
  } = useContext(ProductListContext);

  useEffect(() => {
    fetchData("tshirts")
      .then((data: DataType[]) => {
        productListDispatch({ type: "tshirts", payload: data });
      })
      .catch(() => {
        console.log("error");
      });
  }, [productListDispatch]);
  return (
    <div className="tshirts">
      {TableHOC<DataType>(
        filteredColumns,
        tshirts,
        "tshirts",
        "TShirts",
        true
      )()}
    </div>
  );
}

function Hoodie() {
  const {
    productListState: { hoodies },
    productListDispatch,
  } = useContext(ProductListContext);

  useEffect(() => {
    fetchData("hoodies")
      .then((data: DataType[]) => {
        productListDispatch({ type: "hoodies", payload: data });
      })
      .catch(() => {
        console.log("error");
      });
  }, [productListDispatch]);
  return (
    <div className="hoodies">
      {TableHOC<DataType>(
        filteredColumns,
        hoodies,
        "hoodies",
        "Hoodies",
        true
      )()}
    </div>
  );
}

export { Cargo, Bottom, Shirts, Tshirts, Hoodie, All };
