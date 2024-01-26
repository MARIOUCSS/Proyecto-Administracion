import React from "react";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Homepages() {
  //const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product);
  const navigate = useNavigate();
  return (
    <Layout>
      <h1>About Page</h1>
      {/* <pre>{JSON.stringify(auth._id, null, 4)}</pre>
      <pre>{auth.role}</pre> */}
      <div className="col-md-9">
        <h1 className="text-center">All Products</h1>
        <div className="d-flex flex-wrap">
          {products.Products.length > 0 &&
            products.Products.map((x, i) => (
              <div className="card m-3" key={i} style={{ width: "18rem" }}>
                {x && x.photo && x.photo.contentType && x.photo.data && (
                  <img
                    src={`data:${x.photo.contentType};base64,${btoa(
                      String.fromCharCode(...new Uint8Array(x.photo.data.data))
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
                    // onClick={() => AddCart(product)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default Homepages;
