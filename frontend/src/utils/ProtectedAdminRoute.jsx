import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiRequest } from './apiRequest';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

export default function ProtectedAdminRoute({ children }) {
  const { roleCode, setRoleCode } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Default to loading state
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveRole = async () => {
      try {
        if(roleCode){ // if we are not reloading the masters page then no need to call api
            return
        }
        const { data } = await apiRequest('/api/v1/user/currentRole', 'GET', null, token);

        if (!data) {
          toast.warn('You are not authenticated', {
            onClose: () => navigate('/'),
          });
          return;
        }

        if (data.roleCode !== 'ADM') {
          toast.warn('Access denied. Admins only.', {
            onClose: () => navigate('/login'),
          });
          return;
        }

        setRoleCode(data.roleCode);
      } catch (error) {
        toast.error('Error retrieving role. Please log in again.', {
          onClose: () => navigate('/login'),
        });
      } finally {
        setLoading(false);
      }
    };

    retrieveRole();
  }, [setRoleCode, token, navigate]);

  // Show loading spinner or fallback UI while verifying role
  if (loading) {
    return <Spinner/>;
  }

  // If not an admin, navigate to login
  if (roleCode !== 'ADM') {
    return <Navigate to="/login" />;
  }

  // Render children for authorized admins
  return children;
}
