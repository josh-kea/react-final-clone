import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './AllProducts.css'

import AddProductModal from './AddProductModal'

const AllProducts = (props) => {
    const [products, setProducts] = useState([]);
    const [sortMethod, setSortMethod] = useState("desc");
    const [isModalActive, setModalState] = useState(false);

    function fetchProducts(){
        fetch(`http://localhost:4000/products`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        }).then(data => {
            // Sort products before displaying them
            setProducts(data)
            //const sortedProducts = sortProducts(data, sortByQuery);
            //setProducts(...products, sortedProducts);
          // JSON.parse(sessionStorage.getItem('token'))
          
        })
        .catch(error => console.log(error))
    }
    function sortProducts(sortMethod) {
        let sortedProducts;

        switch(sortMethod){
            case "asc":
                sortedProducts = products.sort((a,b) => 
                    {
                        a.date = new Date(a.createdAt);
                        b.date = new Date(b.createdAt);
                        return b.date - a.date;
                    }
                )
                setProducts(sortedProducts)
                break;
            case "desc":
                sortedProducts = products.sort((a,b) => 
                    {
                        a.date = new Date(a.createdAt);
                        b.date = new Date(b.createdAt);
                        return a.date - b.date;
                    }
                )
                setProducts(sortedProducts)
                break;
            default:
                return products;
        }
    }

    // Below useEffect runs once when the component mounts.
    useEffect(() => {
        console.log("UseEffect Mounted")
        fetchProducts();        
    }, [])

    function handleSortMethodChange(event) {
        // Setting the sort method state
        setSortMethod(event.target.value);

        sortProducts(sortMethod);
    }

    const createdAt = (user) => {
        const createdAtDate = new Date(user.createdAt)
        let dateString = createdAtDate.toString()
        dateString = dateString.split(' ').slice(0, 5).join(' ');

        return (
            <div className="user-row-date-created"><p>{dateString}</p></div>
        )
    }

    function toggleCreateProductModal(bool) {
        setModalState(bool);
        console.log(isModalActive)
    }

    return(
    <div id="AllProducts">
        <div className="admin-right-header">
        <h1>Products</h1>
        <div className="admin-right-header-btn" onClick={()=>toggleCreateProductModal(true)}>Create New Product</div>
            {isModalActive && <AddProductModal toggleModal={toggleCreateProductModal}></AddProductModal>}
        </div>
        <div className="user-rows">
            <div className="total-users-row">
                <div>{products.length} Total products</div>
                <div><span>Sort By </span>
                    <select className="sort" value={sortMethod} name="sortBy" onChange={(e) => handleSortMethodChange(e)}>
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>
            </div>
            {
                products.map((product, i) => {
                    return (
                        <Link to={`/admin/products/${product._id}`} className="user-row" key={product._id}>
                            <div className="user-row-email"><img className="row-image" src={product.productImg} alt=""/></div>
                            <div className="user-row-email">{product.title}</div>
                           {createdAt(product)}
                        </Link>
                    )
                })
            }
        </div>



    </div>
    )
}


export default withRouter(AllProducts);