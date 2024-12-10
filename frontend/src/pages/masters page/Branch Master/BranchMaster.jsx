import React from 'react';
import './BranchMaster.css'; // Import CSS for styling
import { Routes,Route, useParams } from 'react-router-dom';
import BranchList from './BranchList';
import BranchDetails from './BranchDetails';
import AddBranch from './AddBranch';
import BranchEdit from './BranchEdit';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

export default function BranchMaster() {
  const param = useParams()
  
console.log("branch master param",param)
  return (
    <div className='shadow page'>
      <div className="heading m-2 d-flex justify-content-around align-items-center">
      <h2 className="text-center">Branch Master</h2>
     {(param['*'] =="") && <Link to="/masters/branch-master/add-branch">
       <Button text="Add Branch" variant="secondary" />
      </Link>}
      </div>
    <Routes>
      <Route path="/" element={<BranchList />} />
      <Route path="/:roleCode" element={<BranchDetails />} />
      <Route path="/edit/:roleCode" element={<BranchEdit />} />
      <Route path="/add-branch" element={<AddBranch />} />
    </Routes>
    </div>
  );
}
