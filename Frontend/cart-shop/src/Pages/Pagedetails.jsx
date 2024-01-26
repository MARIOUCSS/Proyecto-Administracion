import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { SingleProduc } from "../Reducers/productslice";
import { useSelector, useDispatch } from "react-redux";
import { url } from "../Reducers/authapi";
function Pagedetails() {
  const params = useParams();
  //const navigate = useNavigate();
  const Sproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (params?.slug) GetProducts();
  }, [params?.slug]);

  const GetProducts = () => {
    dispatch(SingleProduc(params?.slug));
  };
  return (
    <Layout>
      <h1>{Sproduct.SingleProduct.name}</h1>
      <div className="col-md-9">
        <h1 className="text-center">Product</h1>
        <div className="d-flex flex-wrap">
          <div className="card m-3" style={{ width: "18rem" }}>
            <img
              // src={`${url}/api/v1/product/product-photo/${product._id}`}
              src={`${url}/product/product-photo/${Sproduct.SingleProduct._id}`}
              className="card-img-top"
              alt={Sproduct.SingleProduct.name}
              height="390"
              width={"350px"}
              loading="lazy"
            />

            <div className="card-body">
              <h5 className="card-title">Name:{Sproduct.SingleProduct.name}</h5>
              <p className="card-text">
                Description:{Sproduct.SingleProduct.description}
              </p>
              <p className="card-text">
                Price:$/.{Sproduct.SingleProduct.price}
              </p>
              <p className="card-text">
                Cantidad:{Sproduct.SingleProduct.quantity}
              </p>
              <p className="card-text">
                Category:{Sproduct.SingleProduct.category.name}
              </p>
              <button
                className="btn btn-primary ms-1"
                //  onClick={() => navigate(`/product/${x.slug}`)}
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
        </div>
      </div>
    </Layout>
  );
}

export default Pagedetails;
