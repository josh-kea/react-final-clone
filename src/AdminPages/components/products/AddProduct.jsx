import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './AddProduct.css'

const AddProductModal = () => {
    const [state, setState] = useState({
        selectedFile: null
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
        })
    }

    const fileUploadHandler = () => {
        
    }

    const handleFormCreateProduct = () => {
        
    }

    // const handleFormCreateProduct = (event) => {
    //     const { firstName, lastName, email, password } = this.state

    //     if (this.validEmail(email) && this.validPassword(password) && this.validNames(firstName, lastName)) {
    //         // /POST IF STATES ARE VALID
            
    //         fetch(`http://localhost:4000/users`, {
    //             method:'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 firstName: firstName,
    //                 lastName: lastName,
    //                 email: email,
    //                 password: password
    //             })
    //         })
    //         .then(response => {
    //             if(response.ok) {
    //                 alert('User created successfully')
    //             } else {
    //                 // alert('User already exists')
    //             }
    //             return response.json()
    //         })
    //         .then(data => {
    //             if (data.authToken) {
    //                 sessionStorage.setItem('token', JSON.stringify(data.authToken))
    //                 this.props.history.push('/')
    //             } else {
    //                 this.setState({ message: data.message})
    //             }
    
    //         })
    //         .catch(error => console.log('ERROR'))

    //         // END /POST IF STATE ARE VALID
    //     }
    //     event.preventDefault();
        
    // }

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
                

                <form className="modal-form" onSubmit={handleFormCreateProduct}>
                    <input type="file" onChange={fileSelectedHandler} />
                    <div class="form-row">
                        <div class="row-wrapper">
                            <p>Product Title</p>
                            <input type="text" value={modalContent.title} onChange={handleChange('title')}/>
                        </div >
                        </div>
                        <div class="form-row">
                        <div class="row-wrapper">
                            <p>Description</p>
                            <input type="text" value={modalContent.content} onChange={handleChange('content')}/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="row-wrapper">
                            <p>Cost Price</p>
                            <input type="text" value={modalContent.cost_price} onChange={handleChange('cost_price')}/>
                        </div>

                        <div class="row-wrapper">
                            <p>Selling Price</p>
                            <input type="text" value={modalContent.selling_price} onChange={handleChange('selling_price')}/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="row-wrapper">
                            <p>Alexpress Link</p>
                            <input type="text" value={modalContent.aliexpress_link} onChange={handleChange('aliexpress_link')}/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="row-wrapper  row-end">
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