import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UpdateCategory, Getcategories } from "../../Reducers/categoryslice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function EditCategory({ CatId, CatName, Slug }) {
  const [open, setOpen] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState("");
  const [newid, setNewid] = React.useState(null);
  const [slug, setSlug] = React.useState(null);
  //const [slug, setSlug] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
    setNewCategoryName(CatName);
    setNewid(CatId);
    setSlug(Slug);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlesumitup = (e) => {
    e.preventDefault();
    const nuevoNombreCategoria = newCategoryName;
    const nuevoSlugCategoria = slug;
    console.log("Datos de actualización:", {
      names: nuevoNombreCategoria,
      slug: nuevoSlugCategoria,
    });
    dispatch(
      UpdateCategory({
        id: newid,
        names: nuevoNombreCategoria,
        slug: nuevoSlugCategoria,
      })
    )
      .then(() => {
        dispatch(Getcategories());
        setOpen(false);
        navigate("/dashboard/admin/create-category");
      })
      .catch((error) => {
        console.error("Error en el componente EditCategory:", error);
      });
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        style={{ background: "blue", padding: "3px 5px" }}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT CATEGORY</DialogTitle>
        <DialogContent>
          <form onSubmit={handlesumitup} className=" pb-2">
            <div className="mb-1 ">
              <input
                type="text"
                class="form-control"
                style={{ width: "400px" }}
                placeholder="Enter new Category"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Editar
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
