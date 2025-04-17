import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Iphone() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/iphone");
    const product = await response.json();
    //console.log(users);
    setData(product);
  };

  useEffect(() => {
    fetchData();
  }, []);
  //const flip = true;
  return (
    <div>
      <section className="internal-page-wrapper">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12 mt-5 pt-5">
              <h1 className="font-weight-bold">Iphones</h1>
              <div className="brief-description mb-5">
                The Best for the brighters
              </div>
            </div>
          </div>
          {data?.map((product, index) => {
            let order1 = 1;
            let order2 = 2;
            if (index % 2 === 0) {
              order1 = 2;
              order2 = 1;
            }

            let result = (
              <div
                key={product.product_url}
                className="row justify-content-center text-center product-holder h-100"
              >
                <div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
                  <div className="product-title">{product.product_name}</div>
                  <div className="brief-description">
                    {product.Product_brief_description}
                  </div>
                  <div className="starting-price">{product.Starting_price}</div>
                  <div className=" monthly-price">{product.price_range}</div>
                  <div className="links-wrpper">
                    <ul>
                      <li style={{ listStyle: "none" }}>
                        <Link to={`/iphone/${product.product_url}`}>
                          Learn More
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={`col-sm-12 col-md-6 order-${order2}`}>
                  <div className="product-image">
                    <img src={product.Product_img} alt={product.product_name} />
                  </div>
                </div>
              </div>
            );
            return result;
          })}
        </div>
      </section>
    </div>
  );
}

export default Iphone;
