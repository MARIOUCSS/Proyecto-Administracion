//import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
//
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Categorydelete,
  CreateCategorys,
  Getcategories,
} from "../../Reducers/categoryslice";
import CategoryForm from "../../Components/Form/CategoryForm";
import EditCategory from "./EditCategory";
import EditUser from "./EditUser";
//https://mui.com/material-ui/react-modal/#basic-modal
function CreateCategory() {
  const [name, setName] = React.useState("");
  //const [updatedName, setUpdatedName] = React.useState("");
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows =
    category &&
    category.categories.map((item) => {
      return {
        id: item._id,
        name: item.name,
        slug: item.slug,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "name", headerName: "NAME", width: 110 },
    { field: "slug", headerName: "CODIGO", width: 110 },
    {
      field: "action",
      headerName: "ACTIONS",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <EditCategory
              Slug={params.row.slug}
              CatId={params.row.id}
              CatName={params.row.name}
            >
              Edit
            </EditCategory>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(Categorydelete(id)).then(() => {
      dispatch(Getcategories());
    });
  };

  const handlesumit = (e) => {
    e.preventDefault();
    const names = { name };
    dispatch(CreateCategorys(names)).then(() => {
      dispatch(Getcategories());
    });
    setName("");
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 ">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>CATEGORY</h1>
            <div className="form">
              <CategoryForm
                handlesumit={handlesumit}
                value={name}
                setValue={setName}
              />
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

export default CreateCategory;

// const StyledDashboard = styled.div`
//   display: flex;
//   height: 100vh;
// `;
//Tiene 170 de ancho y eso lo toma div >button
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
const Edit = styled.button`
  background-color: blue;
  width: 47px;
`;
