import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CreateProducts from "./CreateProducts";
import { Productdelete, GetProducts } from "../../Reducers/productslice";
function CreateProd() {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    console.log(id);
    dispatch(Productdelete(id)).then(() => {
      dispatch(GetProducts());
    });
  };
  const rows =
    product &&
    product.Products.map((x) => {
      return {
        id: x._id,
        name: x.name,
        slug: x.slug,
        description: x.description,
        price: x.price,
        categoryId: x.category,
        quantity: x.quantity,
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "NAME", width: 170 },
    { field: "slug", headerName: "SLUG", width: 80 },
    { field: "description", headerName: "DESCRIPTION", width: 130 },
    { field: "price", headerName: "PRICE", width: 100 },
    { field: "categoryId", headerName: "IDCATEGORY", width: 140 },
    { field: "quantity", headerName: "QUANTITY", width: 90 },

    {
      field: "action",
      headerName: "ACTIONS",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            {/* <EditUser
              Username={params.row.name}
              Useremail={params.row.email}
              Userphone={params.row.phone}
              Useraddress={params.row.address}
              Useranswer={params.row.answer}
              role={params.row.role === "Administrador" ? 1 : 0}
              passw={params.row.password}
              id={params.row.id}
            >
              Edit
            </EditUser> */}
          </Actions>
        );
      },
    },
  ];

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Products</h1>
            <div className="form">
              <CreateProducts>Create Product</CreateProducts>
            </div>
            <div style={{ height: 400, width: "90%" }}>
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
        </div>
      </div>
    </Layout>
  );
}

export default CreateProd;

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
