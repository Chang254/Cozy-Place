import React from 'react';
import { Outlet } from 'react-router';

const WithoutNav = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default WithoutNav;