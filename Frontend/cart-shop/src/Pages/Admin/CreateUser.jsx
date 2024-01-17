import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUsers, CreateUsers } from "../../Reducers/userslice";
export default function CreateUser() {
  const [open, setOpen] = React.useState(false);
  //
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [rol, setRol] = React.useState("");
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  ////
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address, answer, rol);
    const user = { name, email, phone, address, password, answer, rol };
    dispatch(CreateUsers(user)).then(() => {
      setOpen(false);
      dispatch(GetUsers());
    });
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
    setAnswer("");
    setRol("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        style={{
          background: "blue",
          padding: "6px 6px",
          margin: "3px",
          background: "blue",
          color: "white",
        }}
      >
        CREAR
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "550px", // Puedes ajustar el valor según tus necesidades
          },
        }}
      >
        <DialogTitle>CREAR USUARIO</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handlesubmit}
            className="row g-3"
            style={{ width: "100%" }}
          >
            <div class="col-md-6">
              <label for="exampleInputPassword1" class="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputPassword1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="col-12">
              <label for="exampleInputPassword1" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div class="col-12">
              <label for="exampleInputPassword1" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div class="col-12">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div class="col-md-6">
              <label for="exampleInputPassword1" className="form-label">
                Answer
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label for="inputState" className="form-label">
                Rol
              </label>
              <select
                id="inputState"
                className="form-select"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option selected>Tipo...</option>
                <option value="1">Administrador</option>
                <option value="0"> Usuario</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              Registrar Usuario
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* //<Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
