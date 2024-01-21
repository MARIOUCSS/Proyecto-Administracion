import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
//
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";
import { GetUsers, Userdelete } from "../../Reducers/userslice";
import EditUser from "./EditUser";
//import UserForm from "../../Components/Form/UserForm";
function Userss() {
  // const [users,setUsers]=React.useState("")
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  ////////////////////////////////////
  // const Handlesubmit=(e)=>{
  //  e.preventDefault();
  //  const user={}
  // }
  const rows =
    user &&
    user.users.map((item) => {
      return {
        id: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        address: item.address,
        answer: item.answer,
        role: item.role === 1 ? "Administrador" : "Usuario",
        password: item.password,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "NAME", width: 120 },
    { field: "email", headerName: "EMAIL", width: 180 },
    { field: "phone", headerName: "PHONE", width: 100 },
    { field: "address", headerName: "ADDRESS", width: 110 },
    { field: "answer", headerName: "ANSWER", width: 90 },
    { field: "role", headerName: "ROLE", width: 110 },
    {
      field: "action",
      headerName: "ACTIONS",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <EditUser
              Username={params.row.name}
              Useremail={params.row.email}
              Userphone={params.row.phone}
              Useraddress={params.row.address}
              Useranswer={params.row.answer}
              role={params.row.role === "Administrador" ? 1 : 0}
              passw={params.row.password}
            >
              Edit
            </EditUser>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    // e.preventDefault();
    console.log(id);
    dispatch(Userdelete(id)).then(() => {
      dispatch(GetUsers());
    });
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Users</h1>
            <div className="form">
              <CreateUser>Crear Usuario</CreateUser>
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

export default Userss;

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
