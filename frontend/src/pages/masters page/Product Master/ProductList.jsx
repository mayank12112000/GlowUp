import React, { useContext, useEffect } from 'react'
import useQuery from '../../../utils/useQuery';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeProvider';
import Alert from '../../../components/Alert';
import Skeleton from './../../../components/Skeleton';

export default function ProductList() {
  const [loading, error, products, runQuery, success, message] = useQuery("/api/v1/product", "GET", null);
  
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      runQuery();
    }, []);
  
    const handleEdit = (productSeq) => {
      navigate(`/product/product-master/edit/${productSeq}`);
    };
  
    return (
      <>
        {error && (
          <p className="my-5 error-text">
            Failed to load products. Please try again later.
          </p>
        )}
        
        {loading && <Skeleton number={5}  />}
        {products?.length >0 ? (
          <div className="table-responsive">
            <table className={`table table-striped table-hover table-${ theme === "light" ? "danger" : "dark" }`}>
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Is active</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => {
                  return (
                    <tr key={product.product_seq}>
                      <td > {product.product_name}</td>
                      <td>{product.isActive?"Active":"Inactvie"}</td>
                      <td onClick={() => handleEdit(product.product_seq)} className="edit-master text-center">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ):
        <Alert message="No data found"/>}
      </>
  )
}
