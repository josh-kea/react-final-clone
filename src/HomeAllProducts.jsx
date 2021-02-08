import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ViewProductButton from './ViewProductButton'
import './HomeAllProducts.css'

const HomeAllProducts = (props) => {
    const [products, setProducts] = useState([]);
    const [sortMethod, setSortMethod] = useState("desc");

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
            // Sort users before displaying them
            setProducts(data)
            //const sortedUsers = sortUsers(data, sortByQuery);
            //setUsers(...users, sortedUsers);
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

    // Below useEffect runs once when the component updates.
    useEffect(() => {
        console.log("UseEffect Update")        
        
    });

    function handleSortMethodChange(event) {
        // Setting the sort method state
        setSortMethod(event.target.value);

        sortProducts(sortMethod);
    }

    return(
    <div id="HomeAllProducts">
        <h1>Products</h1>
        <div className="user-rows">
            <div className="total-users-row">
                <div>{products.length} Total Products</div>
                <div><span>Sort By </span>
                    <select className="sort" value={sortMethod} name="sortBy" onChange={(e) => handleSortMethodChange(e)}>
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>
            </div>
            </div>

            <div className="all-products-grid">
            {
                products.map((product, i) => {
                    return (
                        <div className="product-grid-item" key={i}>
                            <img src="https://ae01.alicdn.com/kf/Hecc63e829b5a498fb16257485d35293cP/U-Shape-Trigger-Point-Massage-Roller-for-Arm-Leg-Neck-Muscle-Tissue-for-Fitness-Gym-Yoga.jpg_50x50.jpg_.webp"></img>
                            <div className="product-grid-details">
                                <p className="product-grid-title">{product.title}</p>
                                <p className="product-grid-profit">Potential Profit: ${product.profit_margin.toFixed(2)}</p>
                            </div>
                            <ViewProductButton slug={product.slug}></ViewProductButton>
                        </div>
                    )
                })
            }
            </div>

    </div>
    )
}


export default withRouter(HomeAllProducts);