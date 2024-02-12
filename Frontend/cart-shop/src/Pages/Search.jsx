import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { AddToCart } from "../Reducers/cartShopping";
import { url } from "../Reducers/authapi";
function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ProductF = useSelector((state) => state.product);

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {/* {values?.results.length < 1
              ? "No products Found "
              : `Found ${values?.results.length}`} */}
            {ProductF.ProductFilter.length < 1
              ? "Not Products Found"
              : ` ${ProductF.ProductFilter.length} Products`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {ProductF.ProductFilter.length > 0 &&
              ProductF.ProductFilter.map((x, i) => (
                <div className="card m-3" key={i} style={{ width: "18rem" }}>
                  <img
                    src={`${url}/product/product-photo/${x._id}`}
                    className="card-img-top"
                    alt={x.name}
                    // router.get("/product-photo/:pid", GetsinglePhoto);
                  />
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
                    {/* <button
                      className="btn btn-secondary ms-1"
                      onClick={() => dispatch(AddToCart(x))}
                    >
                      ADD TO CART
                    </button> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
