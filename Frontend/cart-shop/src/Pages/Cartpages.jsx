import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { url } from "../Reducers/authapi";
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  RemoveCart,
  Increment,
  Decrement,
  TotalCart,
  ClearCart,
} from "../Reducers/cartShopping";
import Paybotton from "./Paybotton";
function Cartpages() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cartshop = useSelector((state) => state.cartShop);
  const navigate = useNavigate();
  const location = useLocation();
  const Cantidadshop = () => {
    const Cartshop = [...cartshop.cartItems];
    const total = Cartshop.reduce((ac, x) => {
      return ac + x.cuantity;
    }, 0);
    return total;
  };
  const handleDelete = (id, name) => {
    //e.preventDefault();
    console.log(id);
    dispatch(RemoveCart({ id, name }));
  };
  const handleMasChange = (id) => {
    console.log(id);
    dispatch(Increment({ id }));
  };
  const handleMenChange = (id) => {
    console.log(id);
    dispatch(Decrement({ id }));
  };
  //
  useEffect(() => {
    dispatch(TotalCart());
  }, [cartshop]);
  const rows =
    cartshop &&
    cartshop.cartItems.map((item) => {
      //const idl = item._id.substring(0, 3);
      return {
        id: item._id,
        name: item.name,
        photo: item.photo,
        description: item.description,
        price: item.price.toFixed(2),
        quantity: item.cuantity,
        total: (item.price * item.cuantity).toFixed(2),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "photo",
      headerName: "PHOTO",
      width: 130,
      renderCell: (params) => (
        <img
          // params.value=photo
          src={`data:${params.value.contentType};base64,${btoa(
            String.fromCharCode(...new Uint8Array(params.value.data.data))
          )}`}
          className="card-img-top"
          alt={params.row.name}
        />
      ),
    },
    { field: "name", headerName: "NAME", width: 120 },
    { field: "description", headerName: "DESCRIPTION", width: 130 },
    { field: "price", headerName: "PRICE", width: 110 },
    // { field: "quantity", headerName: "QUANTITY", width: 110 },
    {
      field: "quantity",
      headerName: "QUANTITY",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => handleMenChange(params.row.id)}
            style={{ width: "29px" }}
          >
            -
          </button>
          <span style={{ margin: "0 8px" }}>{params.row.quantity}</span>
          <button
            onClick={() => handleMasChange(params.row.id)}
            style={{ width: "29px" }}
          >
            +
          </button>
        </div>
      ),
    },

    { field: "total", headerName: "TOTAL", width: 110 },
    {
      field: "action",
      headerName: "ACTIONS",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete
              onClick={() => handleDelete(params.row.id, params.row.name)}
            >
              Delete
            </Delete>
            {/* <EditCategory
              Slug={params.row.slug}
              CatId={params.row.id}
              CatName={params.row.name}
            >
              Edit
            </EditCategory> */}
          </Actions>
        );
      },
    },
  ];

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">{`Hola ${
              auth.name ? `${auth.name} ` : "...Logueate"
            } `}</h1>
            <h4 className="text-center">
              {cartshop?.cartItems.length > 1
                ? `You have ${Cantidadshop()} items
              in your Cart ${auth?.token ? "" : "please login to checkout"}`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        {/* ///// */}
        <div className="row">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="subtotal">
              <h3>Cart Sumary</h3>
              <div className="d-flex">
                <span>SUBTOTAL :</span>
                <span className="amount">
                  $/.{cartshop.carttotalmonto.toFixed(2)}
                </span>
              </div>
              <div className="d-flex">
                <span>IGV (18%) :</span>
                <span className="amount">
                  $/.{((18 / 100) * cartshop.carttotalmonto).toFixed(2)}
                </span>
              </div>
              <div className="d-flex">
                <span>TOTAL :</span>
                <span className="amount">
                  $/.
                  {(18 / 100) * cartshop.carttotalmonto +
                    cartshop.carttotalmonto}
                </span>
              </div>
            </div>

            {auth._id ? (
              <Paybotton cartItems={cartshop.cartItems} />
            ) : (
              <button
                className="cart-login"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Login to Check out
              </button>
            )}

            <div className="continue-shopping">
              <Link to="/">
                <AiOutlineArrowLeft />
                <span>Seguir Comprando</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cartpages;
const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;
const Delete = styled.button`
  background-color: rgb(255, 77, 73);
  width: 50px;
`;
