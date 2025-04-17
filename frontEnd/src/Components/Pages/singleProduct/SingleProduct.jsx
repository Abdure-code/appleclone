import { data } from "jquery";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FO4 from "../FuorOFuor/FO4";

const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const { productID } = useParams();
 // console.log(productID);
  useEffect(() => {
    fetch("http://localhost:3000/iphone")
      .then((response) => response.json())
      .then((data) => {
        const singleProduct =data.filter(
          (product) => product.product_url == productID
        );
        setProduct(singleProduct);
      })
      .catch(() => console.log("error"));
  }, [productID]);
  //console.log(product.length)
if(product.length ){
  return (
    <div>
      <section className="internal-page-wrapper">
        <div className="container">
          {product?.map((product) => {
            return (
              <div key={product.product_id}>
                <div className="row justify-content-center text-center ">
                  <div className="col-12 mt-5 pt-5">
                    <div className="title-wraper font-weight-bold">
                      {product.product_name}
                    </div>
                    <div className="brief-description mb-5">
                      {product.Product_brief_description}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center text-center product-hoder h-100 m-5">
                  <div className={`col-sm-12 col-md-6 my-auto`}>
                    <div className="startin-price">
                      {`Starting at ${product.Starting_price}`}
                    </div>
                    <div className="monthly-price">{product.price_range}</div>
                    <div className="product-datails">
                      {product.Product_description}
                    </div>
                  </div>
                  <div className={`col-sm-12 col-md-6 `}>
                   <div className="product-image">
                      <img src={product.Product_img} alt="product image"/>
                   </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );}
  else{
    return <FO4/>
  }
};

export default SingleProduct;
