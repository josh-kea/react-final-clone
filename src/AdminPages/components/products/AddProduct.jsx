import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './AddProduct.css'
import { ReactComponent as PlaceholderProductImg } from './PlaceholderProductImg.svg';

const AddProductModal = () => {
    const [state, setState] = useState({
        selectedFile: null,
        secureCloudinaryUrl: ''
    });

    const [modalContent, setModalContent] = useState({
        title: '',
        content:'',
        product_cost:'',
        selling_price:'',
        aliexpress_link: ''
    })

    const toggleModal = () => {
        console.log("hello")
    }

     const fileSelectedHandler = (e) => {
        setState({
            selectedFile: e.target.files[0]
        }, () => {
            handleImageUpload();
        });
        
        
        
    }

    const handleImageUpload = () => {
        const formData = new FormData();
        formData.append('file', state.selectedFile);
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

    const handleFormCreateProduct = async (event) => {
        // const { firstName, lastName, email, password } = this.state
        event.preventDefault();
            // /POST IF STATES ARE VALID
            
            fetch(`http://localhost:4000/products/add`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: modalContent.title,
                    content: modalContent.content,
                    product_cost: modalContent.product_cost,
                    aliexpress_link: modalContent.aliexpress_link,
                    productImg: state.secureCloudinaryUrl
                })
            })
            .then(response => {
                if(response.ok) {
                    alert('Product created successfully')
                } else {
                    // alert('User already exists')
                }
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
    

        
    }

    function handleChange(name) {
        return function(event) {
            setModalContent({ [name]: event.target.value })
        };
      };

    return (
        
        <div className="edit-user-modal">
            <div className="modal-form-wrapper">
                <div className="modal-form-header">
                    <p>Create Product</p>
                    {/* <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true" onClick={() => setModalState(false)}><path d="M11.414 10l6.293-6.293a1 1 0 1 0-1.414-1.414L10 8.586 3.707 2.293a1 1 0 0 0-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 1 0 1.414 1.414L10 11.414l6.293 6.293A.998.998 0 0 0 18 17a.999.999 0 0 0-.293-.707L11.414 10z"></path></svg> */}
                </div>
                        <div className="product-image-container"><PlaceholderProductImg></PlaceholderProductImg></div>
                        <div className="product-image-input-row"><input type="file" onChange={fileSelectedHandler} /></div>

                <form className="modal-form" onSubmit={handleFormCreateProduct}>
                    
                    <div className="form-row">
                        <div className="row-wrapper">
                            <p>Product Title</p>
                            <input type="text" value={modalContent.title} onChange={handleChange('title')}/>
                        </div >
                        </div>
                        <div className="form-row">
                        <div className="row-wrapper">
                            <p>Description</p>
                            <input type="text" value={modalContent.content} onChange={handleChange('content')}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="row-wrapper">
                            <p>Cost Price</p>
                            <input type="text" value={modalContent.cost_price} onChange={handleChange('cost_price')}/>
                        </div>

                        <div className="row-wrapper">
                            <p>Selling Price</p>
                            <input type="text" value={modalContent.selling_price} onChange={handleChange('selling_price')}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="row-wrapper">
                            <p>Alexpress Link</p>
                            <input type="text" value={modalContent.aliexpress_link} onChange={handleChange('aliexpress_link')}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="row-wrapper  row-end">
                            <div className="form-btn" onClick={() => toggleModal(false)}>Cancel</div>
                            <div className="form-btn">Save</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(AddProductModal);