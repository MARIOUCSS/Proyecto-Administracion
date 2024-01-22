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
function CreateProducts() {
  const [open, setOpen] = React.useState(false);
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
        <DialogTitle>CREATE PRODUCT</DialogTitle>
        <DialogContent>
          <form
            //onSubmit={handlesubmit}
            className="row g-3"
            style={{ width: "100%" }}
          >
            {/* <div class="col-md-6">
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
            </div> */}

            <button type="submit" class="btn btn-primary">
              Registrar Producto
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateProducts;
