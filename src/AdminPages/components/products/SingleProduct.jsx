import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { ReactComponent as PlaceholderProductImg } from './PlaceholderProductImg.svg';
import "./SingleProduct.css";

const SingleProduct = (props) => {
  const [product, setProduct] = useState({
    secureCloudinaryUrl: "",
    title: "",
    content: "",
    product_cost: "",
    selling_price: "",
    aliexpress_link: "",
  });

  // console.log(props)

  function fetchUser() {
    fetch(`http://localhost:4000/products/${props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProduct(data);
        setProduct({secureCloudinaryUrl: data.productImg, title: data.title})
      })
      .catch((error) => console.log(error));
  }

  // Everytime component mounts, useEffect hook will run.
  useEffect(() => {
    fetchUser();
  }, []);

  function showEditUserModal() {}

  // function handleChange(name) {
  //     return function(event) {
  //         setModalContent({ ...user, [name]: event.target.value })
  //     };
  //   };

  // const handleUserEditClick = () => {
  //     showEditUserModal();
  // }

  return (
    <div id="SingleUser">
      <div className="single-user-header">
        {" "}
        <Link to="/admin/products/">
          <img
            className="back-icon"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjYxMnB4IiBoZWlnaHQ9IjYxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9Il94MzdfXzQyXyI+DQoJCTxnPg0KCQkJPHBhdGggZD0iTTUzNS41LDBoLTQ1OUMzNC4yNTMsMCwwLDM0LjI1MywwLDc2LjV2NDU5QzAsNTc3Ljc0NywzNC4yNTMsNjEyLDc2LjUsNjEyaDQ1OWM0Mi4yNDcsMCw3Ni41LTM0LjI1Myw3Ni41LTc2LjV2LTQ1OQ0KCQkJCUM2MTIsMzQuMjUzLDU3Ny43NDcsMCw1MzUuNSwweiBNNTczLjc1LDUzNS41YzAsMjEuMTE0LTE3LjExNywzOC4yNS0zOC4yNSwzOC4yNWgtNDU5Yy0yMS4xMzMsMC0zOC4yNS0xNy4xMzYtMzguMjUtMzguMjV2LTQ1OQ0KCQkJCWMwLTIxLjEzMywxNy4xMTctMzguMjUsMzguMjUtMzguMjVoNDU5YzIxLjEzMywwLDM4LjI1LDE3LjExNywzOC4yNSwzOC4yNVY1MzUuNXogTTQyMC43NSwyODYuODc1SDIxOC4yOTNsNzguODE0LTc4LjgxNA0KCQkJCWM3LjQ3OC03LjQ3OCw3LjQ3OC0xOS41ODQsMC0yNy4wNDNjLTcuNDc4LTcuNDc4LTE5LjU4NC03LjQ3OC0yNy4wNDMsMGwtMTA4LjE5LDEwOC4xOWMtNC41NzEsNC41NzEtNi4wMDUsMTAuODYzLTQuOTU0LDE2Ljc5Mg0KCQkJCWMtMS4wNTIsNS45MjksMC4zODMsMTIuMjIxLDQuOTczLDE2LjgxMWwxMDguMTksMTA4LjE5YzcuNDc4LDcuNDc4LDE5LjU4NCw3LjQ3OCwyNy4wNDMsMHM3LjQ3OC0xOS41ODQsMC0yNy4wNDNsLTc4LjgzMy03OC44MzMNCgkJCQlINDIwLjc1YzEwLjU1NywwLDE5LjEyNS04LjU2OCwxOS4xMjUtMTkuMTI1QzQzOS44NzUsMjk1LjQ0Myw0MzEuMzA3LDI4Ni44NzUsNDIwLjc1LDI4Ni44NzV6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
          />
        </Link>
        <h2>{product.title}</h2>
      </div>
      <div className="card-two-column-grid">
        <div className="user-card">
          <div className="form-row">
            <div className="row-wrapper">
              <p>Title</p>
              <input type="text" value={product.title} required />
            </div>
          </div>
          <div className="form-row">
            <div className="row-wrapper">
              <p>Description</p>
              <input type="textarea" value={product.content} required />
            </div>
          </div>
        </div>

        <div className="user-card">
          <div className="user-card-header">
            <img src={product.productImg} alt="" />
            <div className="user-card-info">
              <p className="card-title">{}</p>
              {/* <p className="user-card-created-at-date">{createdAt(product)}</p> */}
            </div>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-card-header">
            <p className="card-title">Media</p>
            <div className="product-image-container">
              {product.secureCloudinaryUrl === "" ? (
                <PlaceholderProductImg></PlaceholderProductImg>
              ) : (
                <img src={product.secureCloudinaryUrl}></img>
              )}
            </div>
          </div>
          <div className="overview-card-info"></div>
          <div className="overview-email">{}</div>
        </div>
        <div className="timeline-card"></div>
      </div>
    </div>
  );
};

export default withRouter(SingleProduct);
