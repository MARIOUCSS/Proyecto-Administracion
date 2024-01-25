import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { CreateProduct, GetProducts } from "../../Reducers/productslice";

//import { useNavigate } from "react-router-dom";
function CreateProducts() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [shipping, setShipping] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlesubmitpro = (e) => {
    e.preventDefault();
    const Pro = {
      name,
      description,
      price,
      categoryId,
      quantity,
      shipping: shipping === 0 ? true : false,
      photo,
    };

    dispatch(CreateProduct(Pro))
      .then(() => {
        setOpen(false);
        dispatch(GetProducts());
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error);
        // Puedes mostrar un mensaje de error al usuario si es necesario
      });
    setName("");
    setDescription("");
    setPrice("");
    setPhoto("");
    setCategoryId("");
    setShipping("");
    setQuantity("");
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
            onSubmit={handlesubmitpro}
            className="row g-3"
            style={{ width: "100%" }}
          >
            <div class="col-md-6">
              <label class="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {category.categories.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Quantity</label>
              <input
                type="text"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Shipping</label>
              <select
                className="form-select"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <option selected>Tipo...</option>
                <option value="1">No</option>
                <option value="0"> Yes</option>
              </select>
            </div>
            <div className="col-md-12">
              <label for="inputState" className="form-label">
                Image :
              </label>
              {/* // {photo ? photo.name : "Upload Photo"} */}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                  console.log("Estado de photo:", e.target.files[0]);
                }}
              />
            </div>
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
