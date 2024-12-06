import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function useAuthRedirect(redirectTo: string = '/profile') {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);
}