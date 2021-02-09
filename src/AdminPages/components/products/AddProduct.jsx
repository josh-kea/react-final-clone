import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './AddProduct.css'
import { ReactComponent as PlaceholderProductImg } from './PlaceholderProductImg.svg';

const AddProductModal = () => {
    const [state, setState] = useState({
        selectedFile: null,
        secureCloudinaryUrl: '',
        title: '',
        content:'',
        product_cost:'',
        selling_price:'',
        aliexpress_link: ''
    });

     const fileSelectedHandler = (e) => {
        setState({
            selectedFile: e.target.files[0]
        })

        handleImageUpload(e.target.files[0])

    }

    // Using Layout Effect to avoid rendering the UseEffect at first load of webpage
    // const firstUpdate = useRef(true);
    // useLayoutEffect(() => {
    //     if (firstUpdate.current) {
    //       firstUpdate.current = false;
    //     } else {
    //         handleImageUpload()
    //     }
    //   }, [state.selectedFile]);

    //   useEffect(() => {
    //     // This effect uses the `selectedFile` variable,
    //     // so it "depends on" `selectedFile`.
    //         if (firstUpdate.current) {
    //             handleImageUpload();
    //             console.log(state.secureCloudnaryUrl)
    //         }
    //     }, [state.selectedFile])  // pass `selectedFile` as a dependency



    const handleImageUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        // replace this with your upload preset name
        formData.append('upload_preset', 'q49a7qsp');

        const options = {
            method: 'POST',
            body: formData,
        };

        // replace cloudname with your Cloudinary cloud_name
        return fetch('https://api.Cloudinary.com/v1_1/drbgecrkt/image/upload', options)
        .then(res => res.json())
        .then(res => {
            console.log(res)

            if (res.secure_url){
                setState({
                    secureCloudnaryUrl: res.secure_url
                })
            }
        })
        .catch(err => console.log(err));
    }

    const handleFormCreateProduct = (event) => {
            const { title, content, product_cost, selling_price, aliexpress_link, secureCloudinaryUrl } = state

            // /POST IF STATES ARE VALID
            
            fetch(`http://localhost:4000/products/add`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    product_cost: product_cost,
                    selling_price: selling_price,
                    aliexpress_link: aliexpress_link,
                    productImg: secureCloudinaryUrl
                })
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                // if (data.authToken) {
                //     sessionStorage.setItem('token', JSON.stringify(data.authToken))
                //     this.props.history.push('/')
                // } else {
                //     this.setState({ message: data.message})
                // }
    
            })
            .catch(error => console.log('ERROR'))
    
            event.preventDefault();
        
    }

    function handleChange(name) {
        return function(event) {
            setState({ ...state, [name]: event.target.value })
        };
      };

    return (
        
        <div className="edit-user-modal">
            <div className="modal-form-wrapper">
                <div className="modal-form-header">
                    <p>Create Product</p>
                     </div>
                        <div className="product-image-container">
                            {state.secureCloudinaryUrl === '' ?
                            (<PlaceholderProductImg></PlaceholderProductImg>) : 
                            (<img src={state.secureCloudnaryUrl}></img>)}
                            
                            
                        </div>
                        <div className="product-image-input-row"><input type="file" onChange={fileSelectedHandler} /></div>

                <form className="modal-form" onSubmit={handleFormCreateProduct}>
                    
                    <div className="form-row">
                        <div className="row-wrapper">
                            <p>Product Title</p>
                            <input type="text" value={state.title} onChange={handleChange('title')} required/>
                        </div >
                        </div>
                        <div className="form-row">
                        <div className="row-wrapper">
                            <p>Description</p>
                            <input type="text" value={state.content} onChange={handleChange('content')} required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="row-wrapper">
                            <p>Cost Price</p>
                            <input type="text" value={state.product_cost} onChange={handleChange('product_cost')} required/>
                        </div>

                        <div className="row-wrapper">
                            <p>Selling Price</p>
                            <input type="text" value={state.selling_price} onChange={handleChange('selling_price')} required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="row-wrapper">
                            <p>Alexpress Link</p>
                            <input type="text" value={state.aliexpress_link} onChange={handleChange('aliexpress_link')} required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="row-wrapper  row-end">
                            <div className="form-btn">Cancel</div>
                            <button className="form-btn">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(AddProductModal);