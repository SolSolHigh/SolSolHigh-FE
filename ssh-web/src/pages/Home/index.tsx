import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const nav = useNavigate();

  return (
    <div className="flex flex-wrap p-4 w-96">
      <button
        className="px-4 py-2 text-white rounded-md bg-primary-500"
        onClick={() => nav('/login')}
      >
        Login
      </button>
    </div>
  );
};
