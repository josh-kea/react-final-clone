import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { ReactComponent as PlaceholderProductImg } from './PlaceholderProductImg.svg';
import './DeleteProductButton.css'

const DeleteProductButton = (props) => {
    const [state, setState] = useState({

    });

    console.log(props.productId)


    const handleDeleteProduct = async (file) => {

        // replace cloudname with your Cloudinary cloud_name
        return await fetch(`http://localhost:4000/products/${props.productId}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {

            if(data.error) {
                console.log(data)
            } else {
                props.fetchProductsHandler()
            }

        })
        .catch(err => console.log(err));
    }

    return (
        <div id="DeleteProductButton" onClick={handleDeleteProduct}>Delete</div>
    )
}

export default withRouter(DeleteProductButton);