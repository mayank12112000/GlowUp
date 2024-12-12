import React, { useContext, useEffect } from 'react'
import useQuery from '../../../utils/useQuery';
import Spinner from '../../../components/Spinner';
import Alert from '../../../components/Alert';
import { ThemeContext } from '../../../context/ThemeProvider';
import { Navigate, useNavigate } from 'react-router-dom';

export default function BranchList() {
    const [loading, error, data, runQuery] = useQuery("/api/v1/branch/getBranches", "GET", null);
    const {theme} = useContext(ThemeContext)
    const navigate = useNavigate()

  useEffect(() => {
    runQuery();
  }, []);
  
  const handleEdit = (branchSeq) => {
    navigate(`/masters/branch-master/edit/${branchSeq}`);
  };
  return (
    <>
    {loading && !error && <Spinner/>}
      {error && <p className="error-text">Failed to load roles. Please try again later.</p>}
      <div className="table-responsive">

      <table className={`table table-striped table-hover table-${theme==="light"?"danger":"dark"}`}>
      <thead>
    <tr >
      <th scope="col">No.</th>
      <th scope="col">Branch Name</th>
      <th scope="col">Address</th>
      <th scope="col" className="text-center">Actions</th>

    </tr>
  </thead>
  <tbody >
    {data?.map((branch,key)=>{
      return <tr key={key}>
        <td>{key + 1}</td>
        <td>{branch.branch_name}</td>
        <td>{branch.branch_address}</td>
        <td onClick={()=>handleEdit(branch.branch_seq)} className="edit-master text-center"><i className="fa fa-pencil" aria-hidden="true"></i></td>
      </tr>
    })}
  </tbody>
  </table>
        </div>
    </>
  );
}
