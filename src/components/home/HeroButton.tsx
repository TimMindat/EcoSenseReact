import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../Button';

export function HeroButton() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/signup');
    }
  };

  return (
    <Button onClick={handleClick}>
      {user ? 'Go to Profile' : 'Get Started'}
    </Button>
  );
}