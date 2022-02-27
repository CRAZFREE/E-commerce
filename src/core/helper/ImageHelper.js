import React from 'react'
import { API } from '../../backend';

const ImageHelper= ({product
})=> {
    const imageURL =product
        ?`${API}/product/photo/${product._id}`
        :"https://images.pexels.com/photos/906892/pexels-photo-906892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ;



    return (
        <div>
            <div className="rounded border border-success p-2">
                <img
                  src={imageURL}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
            </div>
        </div>
    )
}

export default ImageHelper;