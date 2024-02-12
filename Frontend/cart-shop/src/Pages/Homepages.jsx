import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddToCart } from "../Reducers/cartShopping";
import { Checkbox, Radio } from "antd";
import { prices } from "../Reducers/prices";
import { GetProducts, Filterprueba } from "../Reducers/productslice";
function Homepages() {
  //const auth = useSelector((state) => state.auth);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const products = useSelector((state) => state.product);
  const categorys = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlefilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      //selecciona uno 2 o 3 pero al deselecionar quitas
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const GetProductsx = () => {
    dispatch(GetProducts());
  };
  // useEffect(() => {
  //   //si no hay ninguno marcado checked ni radio  marcar todas
  //   if (!checked.length || !radio.length) getAllProducts();
  //   //console.log(products);
  // }, [checked, radio]);
  // useEffect(() => {
  //   if (!checked.length || !radio.length) GetProductsx();
  //   // if (!radio.length) GetProductsx();
  //   //si hay un checked marcado y si se desmarca automaticamente cuando llegue a 0 se muestra Todos los productos
  // }, [checked, radio]);
  //En este useEffect si hay una modificacion en el checked se filtrar ,pero al momento de
  //quitarle el check deberia volver a mostrar todo los productos de nuevo por eso se usara
  //otro useeffect para que cuandoo este 0 se muestre todo
  const FIlterPruevax = () => {
    const ofx = { checked, radio };
    console.log(ofx);
    dispatch(Filterprueba(ofx));
  };
  useEffect(() => {
    FIlterPruevax();
  }, [checked, radio]);
  return (
    <Layout title={"All Products"}>
      <h1>About Page</h1>
      {/* <pre>{JSON.stringify(auth._id, null, 4)}</pre>
      <pre>{auth.role}</pre> */}
      <div className="row mt-3">
        <div className="col-md-3">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column p-4">
            {categorys.categories?.map((x) => (
              <Checkbox
                key={x._id}
                onChange={(e) => handlefilter(e.target.checked, x._id)}
              >
                {x.name}
              </Checkbox>
            ))}
          </div>
          <h6 className="text-center">Filter By Prices</h6>
          <div className="d-flex flex-column p-4">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices.map((x) => (
                <div key={x._id}>
                  <Radio value={x.array}>{x.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column p-4">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        {/* ////////////// */}
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.Products.length > 0 &&
              products.Products.map((x, i) => (
                <div className="card m-3" key={i} style={{ width: "18rem" }}>
                  {x && x.photo && x.photo.contentType && x.photo.data && (
                    <img
                      src={`data:${x.photo.contentType};base64,${btoa(
                        String.fromCharCode(
                          ...new Uint8Array(x.photo.data.data)
                        )
                      )}`}
                      className="card-img-top"
                      alt={x.name}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{x.name}</h5>
                    <p className="card-text">{x.description}</p>
                    <p className="card-text">$/.{x.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${x.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => dispatch(AddToCart(x))}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Homepages;
