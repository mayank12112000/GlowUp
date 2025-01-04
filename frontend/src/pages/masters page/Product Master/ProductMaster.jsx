import React from 'react'
import Button from '../../../components/Button'
import { Route, Routes, useParams } from 'react-router-dom'
import ProductList from "./ProductList.jsx"
import ProductDetails from "./ProductDetails.jsx"
import ProductEdit from "./ProductEdit.jsx"
import AddProduct  from "./AddProduct.jsx"
import { Link } from 'react-router-dom';
export default function ProductMaster() {
  const param = useParams()
      return (
        <div className='shadow page'>
              <div className="heading m-2 d-flex justify-content-around align-items-center">
              <h2 className="text-center">Products Master</h2>
             {(param['*'] =="") && <Link to="/masters/product-master/add-proudct">
               <Button text="Add Products" variant="secondary" />
              </Link>}
              </div>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/:EmployeeSeq" element={<ProductDetails />} />
              <Route path="/edit/:EmployeeSeq" element={<ProductEdit />} />
              <Route path="/add-proudct" element={<AddProduct/>} />
            </Routes>
            </div>
  )
}
